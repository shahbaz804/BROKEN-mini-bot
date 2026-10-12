// Safe pairing command: pairing must be initiated by the bot owner at startup.
// This command deliberately does not call a third-party pairing-code service.
module.exports = {
  name: 'pair', aliases: ['pcode'], category: 'general',
  description: 'Pairing setup information (safe mode)', usage: '.pair',
  async execute(sock, msg, args, extra) {
    return extra.reply(
      '🔐 *BROKEN MINI BOT — Safe Pairing*\n\n' +
      'This command will not send your phone number to any external pairing API.\n' +
      'For first-time login, configure pairing at startup using the official Baileys flow, ' +
      'then enter the code only in WhatsApp > Linked Devices.\n\n' +
      'Never share your pairing code or session files with anyone.'
    );
  }
};
