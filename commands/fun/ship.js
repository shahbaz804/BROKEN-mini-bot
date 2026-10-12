// commands/fun/ship.js
module.exports = {
  name: 'ship',
  aliases: ['shipit','match'],
  category: 'fun',
  description: 'Ship two users randomly or mention/reply to specific users.',
  usage: '.ship (random) OR .ship @user1 @user2 OR reply with .ship',
  groupOnly: true,
  
  async execute(sock, msg, args, extra) {
    try {
      const ctx = msg.message?.extendedTextMessage?.contextInfo || {};
      const mentioned = ctx.mentionedJid || [];
      let a = null;
      let b = null;

      // If two mentions -> use them
      if (mentioned.length >= 2) {
        a = mentioned[0];
        b = mentioned[1];
      } else if (mentioned.length === 1) {
        // one mention: pair mentioned with sender
        a = mentioned[0];
        b = extra.sender;
      } else if (ctx.participant) {
        // replied to someone: pair replied user with sender
        a = ctx.participant;
        b = extra.sender;
      } else {
        // No mentions or reply: select 2 random group members
        if (extra.isGroup && extra.groupMetadata?.participants) {
          const participants = extra.groupMetadata.participants
            .map(p => p.id)
            .filter(id => id !== sock.user.id); // Exclude bot
          
          if (participants.length >= 2) {
            // Randomly select 2 different users
            const shuffled = participants.sort(() => Math.random() - 0.5);
            a = shuffled[0];
            b = shuffled[1];
          } else {
            return extra.reply('❌ Not enough members to ship!');
          }
        } else {
          return extra.reply('❌ This command works only in groups!');
        }
      }

      // names (friendly)
      const nameOf = id => `@${id.split('@')[0]}`;

      // create a deterministic percent from concatenated ids
      const seed = (a + b).split('').reduce((s,c)=> s + c.charCodeAt(0), 0);
      const love = Math.abs((seed * 7) % 101); // 0-100

      // fun ship phrases
      const hearts = ['💖','💕','💘','💞','💓'];
      const heart = hearts[Math.floor(Math.random() * hearts.length)];
const phrases = [
    `${nameOf(a)} + ${nameOf(b)} = ${love}% ${heart}\nCupid is working overtime! 💘`,
    `${nameOf(a)} x ${nameOf(b)} = ${love}%\nSparks might fly! ✨`,
    `${nameOf(a)} & ${nameOf(b)} Compatibility: ${love}%\n${love > 80 ? 'A perfect match! 💞' : love > 50 ? 'Looking good! 💖' : 'Might need extra magic 🪄'}`,
    `${nameOf(a)} ❤ ${nameOf(b)} = ${love}%\nRomance alert! 🚨`,
    `${nameOf(a)} + ${nameOf(b)} = ${love}%\nFate seems interested 😏`,
    `${nameOf(a)} x ${nameOf(b)} = ${love}%\nCould be a legendary duo! 🏆`,
    `${nameOf(a)} & ${nameOf(b)} Compatibility: ${love}%\n${love > 70 ? 'Hearts aligned! ❤️' : love > 40 ? 'Needs work 🛠️' : 'Chaos incoming 😂'}`,
    `${nameOf(a)} + ${nameOf(b)} = ${love}% ${heart}\nLove vibes detected! 🌟`,
    `${nameOf(a)} x ${nameOf(b)} = ${love}%\nA match made in memes 😆`,
    `${nameOf(a)} & ${nameOf(b)} Compatibility: ${love}%\n${love > 85 ? 'Epic chemistry! 🔥' : love > 60 ? 'Promising! 💕' : 'Uh-oh… 😬'}`,
    `${nameOf(a)} ❤ ${nameOf(b)} = ${love}%\nThe stars are aligned! ✨`,
    `${nameOf(a)} + ${nameOf(b)} = ${love}%\nLove meter: ${love}/100 ❤️`,
    `${nameOf(a)} x ${nameOf(b)} = ${love}%\nFlirt mode: ON 😏`,
    `${nameOf(a)} & ${nameOf(b)} Compatibility: ${love}%\n${love > 75 ? 'Destined for love! 💖' : love > 50 ? 'Could be interesting! 😎' : 'Tread carefully! ⚠️'}`,
    `${nameOf(a)} + ${nameOf(b)} = ${love}% ${heart}\nThe chemistry is real! 🔥`,
    `${nameOf(a)} x ${nameOf(b)} = ${love}%\nRomance forecast: ${love}% chance of sparks! ⚡`,
    `${nameOf(a)} & ${nameOf(b)} Compatibility: ${love}%\n${love > 80 ? 'Couple goals! 💕' : love > 55 ? 'Not bad! 😍' : 'Better luck next time! 😂'}`,
    `${nameOf(a)} ❤ ${nameOf(b)} = ${love}%\nCupid approves! 🏹`,
    `${nameOf(a)} + ${nameOf(b)} = ${love}%\nFeeling the love vibes! 💓`,
    `${nameOf(a)} x ${nameOf(b)} = ${love}%\nCould cause heart palpitations! ❤️‍🔥`,
    `${nameOf(a)} & ${nameOf(b)} Compatibility: ${love}%\n${love > 90 ? 'True love alert! 💖' : love > 60 ? 'Sweet potential! 🌸' : 'Better keep friends! 🤪'}`,
    `${nameOf(a)} + ${nameOf(b)} = ${love}% ${heart}\nRomantic chaos incoming! 😍`,
    `${nameOf(a)} x ${nameOf(b)} = ${love}%\nCould be the next power couple! 💪`,
    `${nameOf(a)} & ${nameOf(b)} Compatibility: ${love}%\n${love > 70 ? 'Hearts in sync! 💘' : love > 40 ? 'Needs some magic ✨' : 'Comedy duo potential 😂'}`,
    `${nameOf(a)} ❤ ${nameOf(b)} = ${love}%\nSwoon factor: high! 💖`,
    `${nameOf(a)} + ${nameOf(b)} = ${love}%\nLove-o-meter skyrocketing! 🚀`,
    `${nameOf(a)} x ${nameOf(b)} = ${love}%\nFeels like a rom-com scene 🎬`,
    `${nameOf(a)} & ${nameOf(b)} Compatibility: ${love}%\n${love > 85 ? 'Match made in heaven! 😇' : love > 50 ? 'Could be sweet! 🍭' : 'Prepare for laughs! 😂'}`,
    `${nameOf(a)} + ${nameOf(b)} = ${love}% ${heart}\nLove potion activated! 🧪`,
    `${nameOf(a)} x ${nameOf(b)} = ${love}%\nRomantic tension detected! ⚡`,
    `${nameOf(a)} & ${nameOf(b)} Compatibility: ${love}%\n${love > 75 ? 'Soulmates? Maybe! 💞' : love > 40 ? 'Potential brewing! ☕' : 'Just friends vibes 😂'}`,
    `${nameOf(a)} ❤ ${nameOf(b)} = ${love}%\nHeart meters rising! ❤️`,
    `${nameOf(a)} + ${nameOf(b)} = ${love}%\nCould break the love charts! 📈`,
    `${nameOf(a)} x ${nameOf(b)} = ${love}%\nFlirt alert! 🚨`,
    `${nameOf(a)} & ${nameOf(b)} Compatibility: ${love}%\n${love > 80 ? 'Love at first sight! 😍' : love > 50 ? 'Things are heating up! 🔥' : 'Comedy vibes only! 😂'}`,
    `${nameOf(a)} + ${nameOf(b)} = ${love}% ${heart}\nRomance levels rising! 💖`,
    `${nameOf(a)} x ${nameOf(b)} = ${love}%\nPotential couple vibes detected 💕`,
    `${nameOf(a)} & ${nameOf(b)} Compatibility: ${love}%\n${love > 90 ? 'Legendary couple! 🌟' : love > 60 ? 'Looking cute together! 😘' : 'Friends first! 🤗'}`,
    `${nameOf(a)} ❤ ${nameOf(b)} = ${love}%\nHeartbeats synchronized! 💓`,
    `${nameOf(a)} + ${nameOf(b)} = ${love}%\nLove forecast: 🌈 bright with sparks!`,
    `${nameOf(a)} x ${nameOf(b)} = ${love}%\nCould be a fairy tale romance! 🏰`,
    `${nameOf(a)} & ${nameOf(b)} Compatibility: ${love}%\n${love > 75 ? 'Destiny calling! 💞' : love > 45 ? 'Could be fun! 😄' : 'Comedy gold! 😂'}`,
    `${nameOf(a)} + ${nameOf(b)} = ${love}% ${heart}\nPrepare for butterflies! 🦋`,
    `${nameOf(a)} x ${nameOf(b)} = ${love}%\nRomantic energy levels: high! ⚡`,
    `${nameOf(a)} & ${nameOf(b)} Compatibility: ${love}%\n${love > 80 ? 'Hearts aligned! 💖' : love > 50 ? 'Sweet potential! 🌸' : 'Better keep distance 😂'}`,
    `${nameOf(a)} ❤ ${nameOf(b)} = ${love}%\nCupid says yes! 🏹`,
    `${nameOf(a)} + ${nameOf(b)} = ${love}%\nCould be love at first meme! 😆`,
    `${nameOf(a)} x ${nameOf(b)} = ${love}%\nRomance-o-meter: ${love}% 🔥`,
    `${nameOf(a)} & ${nameOf(b)} Compatibility: ${love}%\n${love > 90 ? 'True love vibes! 💕' : love > 60 ? 'Promising duo! 😍' : 'Comedy pairing 😂'}`
];

      const out = phrases[Math.floor(Math.random() * phrases.length)];

      await sock.sendMessage(extra.from, { text: out, mentions: [a, b] }, { quoted: msg });
    } catch (error) {
      console.error('[ship] ERROR:', error);
      await extra.reply('❌ Something went wrong while shipping.');
    }
  }
};
