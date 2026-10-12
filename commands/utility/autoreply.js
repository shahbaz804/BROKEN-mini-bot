const fs = require('fs');
const path = require('path');
const config = require('../../config');

// Simple similarity
function similarity(a, b) {
  a = a.toLowerCase();
  b = b.toLowerCase();
  if (!a.length || !b.length) return 0;

  let longer = a.length > b.length ? a : b;
  let shorter = a.length > b.length ? b : a;
  let same = 0;

  for (let i = 0; i < shorter.length; i++) {
    if (longer.includes(shorter[i])) same++;
  }

  return same / longer.length;
}

const emojis = ['💖','😊','😂','😍','🥰','✨','💘','💛','💜','💞'];

module.exports = {
  name: 'autoreply',
  description: 'Premium auto-reply system',
  usage: '.autoreply on/off',
  category: 'utility',

  async execute(sock, msg, args, extra) {

    if (typeof this._autoReplyState === 'undefined') {
      this._autoReplyState =
        config.AUTO_REPLY === true || config.AUTO_REPLY === 'true';
    }

    const arg = args[0]?.toLowerCase();

    if (!arg || !['on', 'off'].includes(arg)) {
      return extra.reply(
        `❌ Usage: .autoreply on/off\nCurrent status: ${this._autoReplyState ? 'ON' : 'OFF'}`
      );
    }

    this._autoReplyState = arg === 'on';

    return extra.reply(
      `✅ Auto-reply is now ${this._autoReplyState ? 'ON' : 'OFF'}`
    );
  },

  async init(sock) {

    const filePath = path.join(__dirname, '../../auto/autoreply.json');

    if (typeof this._autoReplyState === 'undefined') {
      this._autoReplyState =
        config.AUTO_REPLY === true || config.AUTO_REPLY === 'true';
    }

    // 🔥 Correct listener for your setup
    sock.ev.on('messages.upsert', async ({ messages, type }) => {

      if (type !== 'notify') return;

      for (const msg of messages) {

        if (!msg.message || !msg.key?.id) continue;

        const from = msg.key.remoteJid;
        if (!from) continue;

        // Ignore bot messages
        if (msg.key.fromMe) continue;

        if (!this._autoReplyState) continue;

        const body =
          msg.message?.conversation ||
          msg.message?.extendedTextMessage?.text ||
          msg.message?.imageMessage?.caption ||
          msg.message?.videoMessage?.caption ||
          '';

        const text = body.toLowerCase().trim();
        if (!text) continue;

        if (!fs.existsSync(filePath)) continue;

        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        if (!Object.keys(data).length) continue;

        let bestMatch = null;
        let bestScore = 0;

        for (const keyword in data) {
          const lowerKeyword = keyword.toLowerCase().trim();

          let score = 0;

          if (text === lowerKeyword) score = 1;
          else if (text.includes(lowerKeyword)) score = 0.9;
          else score = similarity(text, lowerKeyword);

          if (score > bestScore) {
            bestScore = score;
            bestMatch = keyword;
          }
        }

        if (bestMatch && bestScore >= 0.6) {

          const emoji =
            emojis[Math.floor(Math.random() * emojis.length)];

          await sock.sendPresenceUpdate('composing', from);
          await new Promise(r => setTimeout(r, 1500));

          await sock.sendMessage(
            from,
            { text: `${data[bestMatch]} ${emoji}` },
            { quoted: msg }
          );
        }
      }
    });
  }
};