/**
 * Dare - Get a random dare challenge
 */

module.exports = {
    name: 'dare',
    aliases: [],
    category: 'fun',
    desc: 'Get a random dare challenge',
    usage: 'dare',
    execute: async (sock, msg, args) => {
      try {
        const dares = [
    "Send a random emoji to your crush!",
    "Change your WhatsApp name to a celebrity's name for 24 hours!",
    "Post a silly face selfie in your story!",
    "Text the last person you spoke to 'I love you'!",
    "Send a voice note of you laughing weirdly!",
    "Take a funny mirror selfie and send it to the group!",
    "Record yourself trying to lick your elbow!",
    "Wear socks on your hands for the next 10 minutes!",
    "Send a message in all caps for the next 5 texts!",
    "Post a childhood photo on your story!",
    "Send a random GIF that makes no sense!",
    "Speak in rhymes for the next 5 messages!",
    "Try to do a handstand and record it!",
    "Send a selfie making the weirdest face possible!",
    "Text your crush a random song lyric!",
    "Change your profile picture to a cartoon character for 24 hours!",
    "Send the last screenshot you took to the group!",
    "Attempt to juggle 3 random objects!",
    "Text a friend 'Guess what I just did?' and wait 5 minutes before explaining!",
    "Try to balance a spoon on your nose and send a picture!",
    "Sing the chorus of your favorite song in a voice note!",
    "Send a voice note saying your name in a funny accent!",
    "Do 30 squats and record yourself!",
    "Take a selfie with the weirdest filter you can find!",
    "Send a screenshot of your most recent chat!",
    "Call a friend and say 'I have a secret!' then hang up!",
    "Make a funny TikTok and share it with the group!",
    "Text a random contact 'I know your secret!'",
    "Post a funny meme in your story!",
    "Send a selfie with a kitchen utensil on your head!",
    "Do your best celebrity impression in a voice note!",
    "Record yourself pretending to be a cat for 30 seconds!",
    "Post a story with a silly caption using only emojis!",
    "Send a voice note of you trying to whistle a song!",
    "Text the last person who messaged you 'Guess who?'",
    "Dance to a random song and record it!",
    "Post a silly filter selfie in the group chat!",
    "Send a funny face emoji to a random contact!",
    "Text your crush 'I have something to tell you' and leave it there!",
    "Try to spin in a circle 10 times and record it!",
    "Post a picture of your feet with a funny caption!",
    "Send a voice note pretending to be a news reporter!",
    "Send a selfie with your hair messed up!",
    "Do 15 jumping jacks while saying a tongue twister!",
    "Record yourself singing the alphabet backwards!",
    "Send a screenshot of your most recent selfie!",
    "Text a friend 'You won't believe this!' and don't explain!",
    "Post a silly face on your story and tag a friend!",
    "Attempt to touch your toes while holding your phone and record it!",
    "Send a voice note making animal sounds!",
    "Change your WhatsApp wallpaper to a funny photo!",
    "Take a selfie with a random object on your head!",
    "Post a story saying 'I just woke up like this!' with a funny filter!"
];
        
        const randomDare = dares[Math.floor(Math.random() * dares.length)];
        
        await sock.sendMessage(msg.key.remoteJid, {
          text: `${randomDare}`
        }, { quoted: msg });
        
      } catch (error) {
        console.error('Dare Error:', error);
        await sock.sendMessage(msg.key.remoteJid, {
          text: `❌ Error: ${error.message}`
        }, { quoted: msg });
      }
    }
  };
  