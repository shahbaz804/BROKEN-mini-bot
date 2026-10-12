


/**
 * PM Blocker Command - Auto reject private messages
 */
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '../../database/pmblocker.json');

// Load or initialize config
function loadConfig() {
  if (!fs.existsSync(configPath)) {
    fs.writeFileSync(configPath, JSON.stringify({
      enabled: false,
      mode: 'reject', // reject | warn | block
      allowed: []
    }, null, 2));
  }
  return JSON.parse(fs.readFileSync(configPath));
}

function saveConfig(data) {
  fs.writeFileSync(configPath, JSON.stringify(data, null, 2));
}

module.exports = {
  name: 'pmblocker',
  aliases: ['pmblock', 'antidm', 'nopm'],
  category: 'owner',
  description: 'Block or control private messages',
  usage: '.pmblocker <on/off/mode>',
  ownerOnly: true,

  async execute(sock, msg, args) {
    const from = msg.key.remoteJid;
    const isGroup = from.endsWith('@g.us');

    if (isGroup) {
      return sock.sendMessage(from, { text: '❌ This command works only in private chat.' }, { quoted: msg });
    }

    let config = loadConfig();

    const option = (args[0] || '').toLowerCase();

    if (option === 'on') {
      config.enabled = true;
      saveConfig(config);
      return sock.sendMessage(from, { text: '✅ PM Blocker enabled. All DMs will be controlled.' }, { quoted: msg });
    }

    if (option === 'off') {
      config.enabled = false;
      saveConfig(config);
      return sock.sendMessage(from, { text: '❌ PM Blocker disabled.' }, { quoted: msg });
    }

    if (['reject', 'warn', 'block'].includes(option)) {
      config.mode = option;
      saveConfig(config);
      return sock.sendMessage(from, { text: `⚙️ PM Blocker mode set to *${option}*` }, { quoted: msg });
    }

    return sock.sendMessage(from, {
      text: `📌 *PM Blocker Usage:*
      
.on → Enable blocker  
.off → Disable blocker  
.reject → Auto reject messages  
.warn → Warn user only  
.block → Auto block sender`
    }, { quoted: msg });
  }
};