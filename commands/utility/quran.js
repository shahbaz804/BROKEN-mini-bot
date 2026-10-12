const axios = require("axios");
const SURAHS = require("./surahs");

const API_BASE = "https://api.alquran.cloud/v1";
const AR_EDITION = "quran-uthmani";
const EN_EDITION = "en.sahih";
const REQUEST_TIMEOUT_MS = 12000;
const MAX_RANGE = 10; // cap how many ayahs can be requested at once to avoid spammy messages

// ---- In-memory response cache (reduces repeat API hits, resets on bot restart) ----
const cache = new Map();
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

function getCached(key) {
  const hit = cache.get(key);
  if (!hit) return null;
  if (Date.now() - hit.timestamp > CACHE_TTL_MS) {
    cache.delete(key);
    return null;
  }
  return hit.data;
}

function setCached(key, data) {
  cache.set(key, { data, timestamp: Date.now() });
}

// ---- Surah name normalization & lookup ----
function normalize(str) {
  return str
    .toLowerCase()
    .replace(/^al[\s-]?/i, "") // strip leading "al-" / "al "
    .replace(/['’`-]/g, "")
    .replace(/\s+/g, "")
    .trim();
}

function findSurahByName(input) {
  const target = normalize(input);
  if (!target) return null;

  for (const surah of SURAHS) {
    const candidates = [surah.en, ...surah.aliases];
    for (const candidate of candidates) {
      if (normalize(candidate) === target) return surah;
    }
  }
  return null;
}

function getSurahByNumber(num) {
  return SURAHS.find((s) => s.n === num) || null;
}

// ---- Reference parsing ----
// Supports:
//   "2:255"            -> surah 2, ayah 255
//   "2 255"             -> surah 2, ayah 255
//   "2:1-5"             -> surah 2, ayahs 1 through 5
//   "Al-Baqarah 255"    -> surah by name, ayah 255
//   "Baqarah 1-5"       -> surah by name, ayah range
//   "Yasin"             -> surah info card only (no ayah)
//   "36"                -> surah info card only (numeric, no ayah)
function parseReference(raw) {
  const input = raw.trim();

  // Pure numeric surah:ayah or surah:start-end
  const numericMatch = input.match(/^(\d{1,3})[:\s]+(\d{1,3})(?:-(\d{1,3}))?$/);
  if (numericMatch) {
    const surahNum = parseInt(numericMatch[1], 10);
    const surah = getSurahByNumber(surahNum);
    if (!surah) return { error: `Surah number must be between 1 and 114. Got ${surahNum}.` };
    return buildResult(surah, numericMatch[2], numericMatch[3]);
  }

  // Pure number, no ayah -> surah info card
  const surahOnlyNumeric = input.match(/^(\d{1,3})$/);
  if (surahOnlyNumeric) {
    const surahNum = parseInt(surahOnlyNumeric[1], 10);
    const surah = getSurahByNumber(surahNum);
    if (!surah) return { error: `Surah number must be between 1 and 114. Got ${surahNum}.` };
    return { surah, ayahStart: null, ayahEnd: null };
  }

  // Name + ayah / range: e.g. "Al-Baqarah 255", "Baqarah 1-5"
  const nameAyahMatch = input.match(/^(.+?)\s+(\d{1,3})(?:-(\d{1,3}))?$/);
  if (nameAyahMatch) {
    const surah = findSurahByName(nameAyahMatch[1]);
    if (!surah) return { error: `Could not recognize surah name "${nameAyahMatch[1]}".` };
    return buildResult(surah, nameAyahMatch[2], nameAyahMatch[3]);
  }

  // Name only -> surah info card
  const surah = findSurahByName(input);
  if (surah) return { surah, ayahStart: null, ayahEnd: null };

  return { error: "Unrecognized format." };
}

function buildResult(surah, startStr, endStr) {
  const start = parseInt(startStr, 10);
  const end = endStr ? parseInt(endStr, 10) : start;

  if (start < 1 || start > surah.ayahs) {
    return { error: `${surah.en} only has ${surah.ayahs} verses. "${start}" is out of range.` };
  }
  if (end < start) {
    return { error: `Invalid range: end ayah (${end}) is before start ayah (${start}).` };
  }
  if (end > surah.ayahs) {
    return { error: `${surah.en} only has ${surah.ayahs} verses. Range goes up to ${end}.` };
  }
  if (end - start + 1 > MAX_RANGE) {
    return { error: `Please request ${MAX_RANGE} verses or fewer at a time (you asked for ${end - start + 1}).` };
  }

  return { surah, ayahStart: start, ayahEnd: end };
}

// ---- API calls ----
async function fetchSingleAyah(surahNum, ayahNum) {
  const cacheKey = `ayah:${surahNum}:${ayahNum}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const [arRes, enRes] = await Promise.all([
    axios.get(`${API_BASE}/ayah/${surahNum}:${ayahNum}/${AR_EDITION}`, { timeout: REQUEST_TIMEOUT_MS }),
    axios.get(`${API_BASE}/ayah/${surahNum}:${ayahNum}/${EN_EDITION}`, { timeout: REQUEST_TIMEOUT_MS }),
  ]);

  if (arRes.data?.code !== 200 || enRes.data?.code !== 200) {
    throw new Error("API returned a non-200 payload code");
  }

  const result = {
    arabic: [arRes.data.data.text],
    english: [enRes.data.data.text],
    numbers: [arRes.data.data.numberInSurah],
  };

  setCached(cacheKey, result);
  return result;
}

async function fetchAyahRange(surahNum, start, end) {
  const cacheKey = `surah:${surahNum}`;
  let arList = getCached(`${cacheKey}:ar`);
  let enList = getCached(`${cacheKey}:en`);

  if (!arList || !enList) {
    const [arRes, enRes] = await Promise.all([
      axios.get(`${API_BASE}/surah/${surahNum}/${AR_EDITION}`, { timeout: REQUEST_TIMEOUT_MS }),
      axios.get(`${API_BASE}/surah/${surahNum}/${EN_EDITION}`, { timeout: REQUEST_TIMEOUT_MS }),
    ]);

    if (arRes.data?.code !== 200 || enRes.data?.code !== 200) {
      throw new Error("API returned a non-200 payload code");
    }

    arList = arRes.data.data.ayahs;
    enList = enRes.data.data.ayahs;
    setCached(`${cacheKey}:ar`, arList);
    setCached(`${cacheKey}:en`, enList);
  }

  const arabic = [];
  const english = [];
  const numbers = [];

  for (let i = start; i <= end; i++) {
    const arAyah = arList.find((a) => a.numberInSurah === i);
    const enAyah = enList.find((a) => a.numberInSurah === i);
    if (!arAyah || !enAyah) throw new Error(`Ayah ${i} not found in surah ${surahNum}`);
    arabic.push(arAyah.text);
    english.push(enAyah.text);
    numbers.push(i);
  }

  return { arabic, english, numbers };
}

// ---- Message formatting ----
function formatSurahInfoCard(surah) {
  return `📜 *SURAH INFORMATION*

📖 *Name:* ${surah.en} (${surah.ar})
🏷️ *Meaning:* ${surah.meaning}
🔢 *Surah Number:* ${surah.n}
🔢 *Total Verses:* ${surah.ayahs}
🕋 *Revelation:* ${surah.type}

📝 *Tip:* Add a verse number to read it, e.g.
.quran ${surah.en} 1

> © Powered By Lucky Tech Hub`;
}

function formatVerseMessage(surah, data) {
  const isRange = data.numbers.length > 1;
  const refLabel = isRange
    ? `${surah.n}:${data.numbers[0]}-${data.numbers[data.numbers.length - 1]}`
    : `${surah.n}:${data.numbers[0]}`;

  let verseBlock = "";
  for (let i = 0; i < data.numbers.length; i++) {
    verseBlock += `\n*[${data.numbers[i]}]*\n🇸🇦 ${data.arabic[i]}\n🇬🇧 ${data.english[i]}\n`;
  }

  return `📜 *QURAN VERSE${isRange ? "S" : ""} FOUND!*

📖 *Surah:* ${surah.en} (${surah.ar})
🏷️ *Meaning:* ${surah.meaning}
🔢 *Reference:* ${refLabel}
🕋 *Revelation:* ${surah.type}
${verseBlock}
🗂️ *Translation:* Saheeh International

> © Powered By Lucky Tech Hub`;
}

module.exports = {
  name: "quran",
  aliases: ["quraan", "alquran", "koran"],
  category: "utility",
  description: "Fetch Quran verses by surah name or number, including ranges and surah info.",
  usage:
    ".quran <Surah Name|Number> [Ayah|Range]\n" +
    "Examples:\n" +
    ".quran 2:255\n" +
    ".quran Al-Baqarah 255\n" +
    ".quran Yasin 1-5\n" +
    ".quran 36   (surah info only)",
  react: "📖",
  ownerOnly: false,

  async execute(sock, msg, args, extra) {
    const { reply } = extra;

    try {
      await sock.sendMessage(extra.from, {
        react: { text: "📖", key: msg.key },
      });

      if (!args || args.length === 0) {
        return reply(
          "⚠️ *Please provide a Quran reference.*\n\n📝 *Examples:*\n" +
            ".quran 2:255\n.quran Al-Baqarah 255\n.quran Yasin 1-5\n.quran 36\n\n" +
            "_Accepts surah name or number, single verse, or a verse range (max 10)._"
        );
      }

      const referenceInput = args.join(" ").trim();
      const parsed = parseReference(referenceInput);

      if (parsed.error) {
        return reply(`⚠️ *${parsed.error}*\n\n📝 *Example:*\n.quran 2:255\n.quran Al-Baqarah 255`);
      }

      const { surah, ayahStart, ayahEnd } = parsed;

      // Surah-only lookup -> info card, no API call needed
      if (ayahStart === null) {
        return reply(formatSurahInfoCard(surah));
      }

      let data;
      try {
        data =
          ayahStart === ayahEnd
            ? await fetchSingleAyah(surah.n, ayahStart)
            : await fetchAyahRange(surah.n, ayahStart, ayahEnd);
      } catch (apiError) {
        console.error("Quran API fetch error:", apiError.message);
        const status = apiError.response?.status;
        if (status === 404) {
          return reply("❌ *Verse not found.* Please check the reference and try again.");
        }
        if (apiError.code === "ECONNABORTED" || apiError.message?.includes("timeout")) {
          return reply("⏱️ *The Quran API took too long to respond.* Please try again in a moment.");
        }
        return reply("⚠️ *Could not reach the Quran API right now.* Please try again shortly.");
      }

      await reply(formatVerseMessage(surah, data));
    } catch (error) {
      console.error("Quran command error:", error);
      await reply("⚠️ *An unexpected error occurred while processing your request.* Please try again.");
    }
  },
};
