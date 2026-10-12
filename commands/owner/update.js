module.exports = {
  name: 'update', aliases: ['upgrade'], category: 'owner',
  description: 'Updates are disabled in safe mode', usage: '.update', ownerOnly: true,
  async execute(sock, msg, args, extra) {
    return extra.reply('🛡️ Safe mode: remote ZIP updates are disabled. Update code manually through your own trusted GitHub repository.');
  }
};
