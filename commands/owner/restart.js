module.exports = {
  name: 'restart', aliases: ['reboot', 'reload'], category: 'owner',
  description: 'Request process restart (safe mode)', usage: '.restart', ownerOnly: true,
  async execute(sock, msg, args, extra) {
    await extra.reply('ℹ️ Railway manages this process. Use Railway → Deployments → Restart to restart BROKEN MINI BOT safely.');
  }
};
