// commands/fun/insult.js
module.exports = {
  name: 'insult',
  aliases: ['insultme','burn'],
  category: 'fun',
  description: 'Give a silly insult to a user. Reply or mention to target someone.',
  usage: '.insult (reply or @user)',
  
  async execute(sock, msg, args, extra) {
    try {
      const ctx = msg.message?.extendedTextMessage?.contextInfo || {};
      const mentioned = ctx.mentionedJid || [];
      let targetId = null;
      if (mentioned.length) targetId = mentioned[0];
      else if (ctx.participant) targetId = ctx.participant;
      else targetId = extra.sender;

      const targetTag = `@${(targetId || extra.sender).split('@')[0]}`;

      const insults = [
    "You're as useful as a white crayon.",
    "I'd call you sharp, but that would be offensive to pencils.",
    "You're like a cloud. When you disappear, it's a beautiful day.",
    "You bring everyone so much joy... when you leave the room.",
    "If laziness was an Olympic sport, you'd come in fourth — so you wouldn't have to walk up to the podium.",
    "You're the human equivalent of a participation trophy.",
    "You have something on your chin… no, the third one down.",
    "You bring everyone together… to talk about how much they dislike you.",
    "You're proof that even evolution takes a break sometimes.",
    "You're like a software update at 2 a.m.—unnecessary and annoying.",
    "You're as bright as a black hole.",
    "You're the reason the gene pool needs a lifeguard.",
    "If stupidity could fly, you'd be a jet.",
    "You're like a cloud of mosquitoes on a sunny day.",
    "You're the human version of a typo.",
    "You have something special… it's called incompetence.",
    "You're the reason we can't have nice things.",
    "You're like a broken pencil… pointless.",
    "You're the human version of decaf coffee.",
    "You have the charm of a wet sock.",
    "You're proof that bad ideas can survive.",
    "You're like a software bug nobody wants to fix.",
    "You're about as intimidating as a pillow.",
    "You're the reason some doors need to be fireproof.",
    "You have the personality of an expired coupon.",
    "You're like a puzzle missing half the pieces.",
    "You bring everyone down… like gravity.",
    "You're the leftover food nobody wants.",
    "You have the social grace of a malfunctioning robot.",
    "You're like a GPS stuck in a loop — annoying and wrong.",
    "You're proof that evolution sometimes sleeps on the job.",
    "You have the wit of a damp sponge.",
    "You're like a sock in the dryer — lost and useless.",
    "You're the reason silence exists.",
    "You're as organized as a tornado in a trailer park.",
    "You're like a balloon… full of hot air.",
    "You have the intelligence of a soggy noodle.",
    "You're the human equivalent of a pop-up ad.",
    "You're about as subtle as a marching band at 3 a.m.",
    "You're the reason mirrors need cleaning.",
    "You have the consistency of spoiled milk.",
    "You're like a pencil with no lead — useless.",
    "You're as coordinated as a newborn giraffe.",
    "You're the human embodiment of buffering.",
    "You have the energy of a drained battery.",
    "You're like a candle in the wind… extinguished.",
    "You're the reason some chairs are uncomfortable.",
    "You're about as helpful as a screen door on a submarine.",
    "You're the human equivalent of a typo in the title.",
    "You're like a sandwich without filling — disappointing.",
    "You have the subtlety of a brick to the face.",
    "You're as reliable as a paper umbrella in a storm.",
    "You're the reason socks disappear in the laundry.",
    "You're like a book with blank pages — pointless."
];

      const line = insults[Math.floor(Math.random() * insults.length)];
      await sock.sendMessage(extra.from, { text: `${line}`, mentions: [targetId] }, { quoted: msg });
    } catch (error) {
      console.error('[insult] ERROR:', error);
      await extra.reply('❌ Something went wrong.');
    }
  }
};
