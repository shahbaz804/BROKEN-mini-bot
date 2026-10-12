// commands/fun/gayrate.js
module.exports = {
  name: 'gayrate',
  aliases: ['gay'],
  category: 'fun',
  description: 'Playful gay percentage. Reply or mention a user.',
  usage: '.gayrate (reply or @user)',
  
  async execute(sock, msg, args, extra) {
    try {
      const ctx = msg.message?.extendedTextMessage?.contextInfo || {};
      const mentioned = ctx.mentionedJid || [];
      let targetId = null;
      if (mentioned.length) targetId = mentioned[0];
      else if (ctx.participant) targetId = ctx.participant;
      else targetId = extra.sender;

      const targetTag = `@${(targetId || extra.sender).split('@')[0]}`;

      // deterministic-ish but random: base on id to make repeatable so it's less spammy
      const base = (targetId || extra.sender).toString().split('').reduce((s,c)=> s + c.charCodeAt(0), 0);
      const percent = ((base % 101) + Math.floor(Math.random()*7)) % 101; // 0-100

      const messages = [
    `${targetTag} shines at ${percent}% rainbow power 🌈✨`,
    `💅 Fierceness level: ${percent}% for ${targetTag}`,
    `${targetTag} sparkles with ${percent}% fabulousness 💖`,
    `🌈 ${targetTag} is ${percent}% glitter queen/king`,
    `✨ ${targetTag}'s queer energy: ${percent}% activated`,
    `💖 ${targetTag} brings ${percent}% pride to the party`,
    `⚡ ${targetTag} is ${percent}% glitter explosion`,
    `💃 ${targetTag} dances at ${percent}% sass power`,
    `🌟 ${targetTag} radiates ${percent}% rainbow magic`,
    `🌈 ${targetTag} is ${percent}% sparkle-tastic`,
    `💎 ${targetTag} is shining at ${percent}% fabulousness`,
    `🎉 ${targetTag}'s party factor: ${percent}% rainbow vibes`,
    `🌟 ${targetTag} is ${percent}% bedazzled brilliance`,
    `💖 ${targetTag} serves ${percent}% extra glitter`,
    `💫 ${targetTag} sparkles at ${percent}% gay glory`,
    `🌈 ${targetTag} is ${percent}% unicorn energy`,
    `💅 ${targetTag} exudes ${percent}% fierceness`,
    `✨ ${targetTag} radiates ${percent}% dazzling pride`,
    `🎊 ${targetTag} is ${percent}% rainbow-tastic`,
    `🌟 ${targetTag} sparkles with ${percent}% fabulous flair`,
    `💖 ${targetTag} slays at ${percent}% glitter power`,
    `⚡ ${targetTag} is ${percent}% dazzlingly queer`,
    `🌈 ${targetTag} shines with ${percent}% rainbow sparkle`,
    `💃 ${targetTag} waltzes at ${percent}% fabulousness`,
    `🌟 ${targetTag} is ${percent}% glitter queen vibes`,
    `💎 ${targetTag} sparkles at ${percent}% rainbow chic`,
    `✨ ${targetTag} is ${percent}% flamboyant brilliance`,
    `🎉 ${targetTag} brings ${percent}% pride energy`,
    `💫 ${targetTag} sparkles at ${percent}% sassiness`,
    `🌈 ${targetTag} serves ${percent}% rainbow glamour`,
    `💅 ${targetTag} is ${percent}% dazzling fabulousness`,
    `💖 ${targetTag} radiates ${percent}% glittery charm`,
    `⚡ ${targetTag} shines at ${percent}% unicorn power`,
    `🌟 ${targetTag} slays at ${percent}% rainbow sparkle`,
    `🎊 ${targetTag} dazzles with ${percent}% glitter energy`,
    `💫 ${targetTag} is ${percent}% fabulous and fearless`,
    `🌈 ${targetTag} glows with ${percent}% glittery pride`,
    `💃 ${targetTag} flaunts ${percent}% rainbow confidence`,
    `✨ ${targetTag} sparkles at ${percent}% flamboyance`,
    `💖 ${targetTag} brings ${percent}% rainbow magic`,
    `🎉 ${targetTag} is ${percent}% sparkling queer legend`,
    `🌟 ${targetTag} radiates ${percent}% glitter power`,
    `⚡ ${targetTag} is ${percent}% fabulous superstar`,
    `💎 ${targetTag} shines with ${percent}% rainbow energy`,
    `💅 ${targetTag} dazzles at ${percent}% sparkling glory`,
    `💫 ${targetTag} exudes ${percent}% glitter queen vibes`,
    `🌈 ${targetTag} sparkles with ${percent}% fabulous sass`,
    `🎊 ${targetTag} glows at ${percent}% rainbow chic`,
    `✨ ${targetTag} is ${percent}% glitter goddess/god`,
    `💖 ${targetTag} serves ${percent}% sparkling brilliance`,
    `🌟 ${targetTag} slays with ${percent}% rainbow charm`,
    `💃 ${targetTag} shines at ${percent}% glitter pride`
];

      const out = messages[Math.floor(Math.random() * messages.length)];
      await sock.sendMessage(extra.from, { text: out, mentions: [targetId] }, { quoted: msg });
    } catch (error) {
      console.error('[gayrate] ERROR:', error);
      await extra.reply('❌ Something went wrong.');
    }
  }
};
