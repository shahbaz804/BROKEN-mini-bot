module.exports = {
  name: 'hacklove',
  description: 'Playful emotional hacking simulation 😈💘',
  usage: '.hacklove @user or reply to a message',
  category: 'fun',

  async execute(sock, msg, args, extra) {
    // Get target: either mentioned JID or replied message sender
    const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    const replied = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage
      ? msg.message.extendedTextMessage.contextInfo.participant
      : null;
    
    const target = mentioned || replied;
    if (!target) return extra.reply('❌ Mention someone or reply to their message to hack emotionally 😏');

    const stages = [
      '🔍 Scanning heart firewall...',
      '💘 Injecting sweet emotions...',
      '🧠 Bypassing overthinking security...',
      '❤️ Uploading romantic payload...',
      '🔥 Installing permanent feelings...',
      '```[█▒▒▒▒] 10%``` ⏳',
      '```[██▒▒▒▒] 30%``` ⏳',
      '```[████▒▒▒] 50%``` ⏳',
      '```[██████▒] 70%``` ⏳',
      '```[████████] 90%``` ⏳',
      '```[████████] 100%``` ✅',
      '📡 Syncing heartbeat connection...',
      '🔓 Access granted to emotional core!'
    ];

    const reactions = [
      '😊 Blushing uncontrollably...',
      '😂 Giggling at every thought...',
      '💖 Feeling butterflies in the stomach...',
      '😍 Heart racing with excitement...',
      '🥰 Smiling like crazy...',
      '😳 Embarrassed but secretly happy...'
    ];

    const emojis = ['💖','✨','😍','🥰','💘','💫','💛','💜'];

    // Initial hack message with mention
    await extra.reply(
      `💻 Initiating Emotional Hack on @${target.split('@')[0]}...\n`,
      { mentions: [target] }
    );

    // Progress stages with random emojis
    for (let stage of stages) {
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];
      await new Promise(r => setTimeout(r, 1800)); // slightly faster feel
      await sock.sendMessage(extra.from, { text: `${stage} ${emoji}` });
    }

    // Pick a random reaction
    const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];

    // Final hack message with mention
    await sock.sendMessage(extra.from, {
      text:
        `\n💞 *HACK COMPLETE!*\n\n` +
        `@${target.split('@')[0]}'s heart is now 100% vulnerable to love 😈❤️\n\n` +
        `⚠️ Side effects: ${randomReaction}`,
      mentions: [target]
    });
  }
};