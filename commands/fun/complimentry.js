/**
 * Compliment - Send a random compliment
 */

module.exports = {
    name: 'compliment',
    aliases: ['praise', 'compliment'],
    category: 'fun',
    desc: 'Get a random compliment',
    usage: 'compliment [@user]',
    execute: async (sock, msg, args) => {
      try {
        const compliments = [
    "You're a ray of sunshine! ☀️",
    "Your kindness is contagious! 💖",
    "You make life brighter! 🌟",
    "You're amazing just the way you are! 🌈",
    "You have a heart of gold! 💛",
    "Your energy is inspiring! ⚡",
    "You're a true gem! 💎",
    "You make the world better! 🌍",
    "You're incredibly thoughtful! 🫂",
    "You have an amazing soul! ✨",
    "You're so creative! 🎨",
    "You light up everyone's day! 🌞",
    "You're wonderfully unique! 🌟",
    "You have a beautiful mind! 🧠",
    "You're a joy to be around! 🥰",
    "You're remarkably talented! 🎶",
    "Your positivity is infectious! 😄",
    "You're a superstar! 🌠",
    "You make people feel special! 💝",
    "You're a true friend! 🤝",
    "You have a magical touch! ✨",
    "You're brave and strong! 🛡️",
    "Your laughter is a gift! 😂",
    "You're so thoughtful! 💐",
    "You're full of potential! 🌱",
    "You inspire greatness! 🚀",
    "You're a wonderful human! 🌎",
    "Your smile brightens everything! 😁",
    "You're elegant and classy! 👑",
    "You're a creative spark! 🔥",
    "You make a difference every day! 🌸",
    "You're fabulous! 💃",
    "You radiate warmth and love! ❤️",
    "You're endlessly charming! 💫",
    "You have amazing intuition! 🧩",
    "You're full of surprises! 🎁",
    "You're a beautiful soul! 🌈",
    "You light up the darkness! 🌌",
    "You're fantastically funny! 😆",
    "You have a heart full of love! 💓",
    "You're a shining example! ✨",
    "You make others feel valued! 🌟",
    "You're an inspiration to all! 🏆",
    "Your positivity is unmatched! 🌞",
    "You're endlessly kind! 💛",
    "You bring happiness everywhere! 😄",
    "You're a brilliant mind! 💡",
    "You make ordinary moments extraordinary! 🌟",
    "You're a beacon of hope! 🕊️",
    "You shine brighter than the stars! 🌠",
    "You're incredible just being you! 💖"
];
        
        const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
        const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];
        
        if (mentioned.length > 0) {
          await sock.sendMessage(msg.key.remoteJid, {
            text: `${randomCompliment}`,
            mentions: mentioned
          }, { quoted: msg });
        } else {
          await sock.sendMessage(msg.key.remoteJid, {
            text: `${randomCompliment}`
          }, { quoted: msg });
        }
        
      } catch (error) {
        console.error('Compliment Error:', error);
        await sock.sendMessage(msg.key.remoteJid, {
          text: `❌ Error: ${error.message}`
        }, { quoted: msg });
      }
    }
  };
  