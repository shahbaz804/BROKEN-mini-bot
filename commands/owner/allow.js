

const fs = require('fs');
const path = require('path');
const config = require('../../config');

const filePath = path.join(__dirname, '../../data/allowed.json');

function loadAllowed() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({ numbers: [] }, null, 2));
  }
  return JSON.parse(fs.readFileSync(filePath));
}

function saveAllowed(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Clean number format
function formatNumber(num) {
  return num.replace(/[^0-9]/g, '');
}

module.exports = {
  name: 'allow',
  description: 'Manage allowed call numbers',
  category: 'owner',
  usage: '.allow add/remove/list/clear',
  ownerOnly: true,
  
  async execute(sock, msg, args) {
    try {
      const from = msg.key.remoteJid;
      const sender = msg.key.participant || msg.key.remoteJid;
      const senderNumber = sender.split('@')[0];

    

      const action = args[0]?.toLowerCase();
      const data = loadAllowed();

      if (!action) {
        return sock.sendMessage(from, {
          text:
            'Usage:\n' +
            '.allow add 2567xxxx\n' +
            '.allow remove 2567xxxx\n' +
            '.allow list\n' +
            '.allow clear'
        });
      }

      // ================= ADD =================
      if (action === 'add') {
        let number = args[1];
        if (!number) {
          return sock.sendMessage(from, { text: '❌ Provide a number to add.' });
        }

        number = formatNumber(number);

        if (data.numbers.includes(number)) {
          return sock.sendMessage(from, {
            text: '⚠️ Number already in allowed list.'
          });
        }

        data.numbers.push(number);
        saveAllowed(data);

        return sock.sendMessage(from, {
          text: `✅ ${number} added to allowed list.`
        });
      }

      // ================= REMOVE =================
      if (action === 'remove') {
        let number = args[1];
        if (!number) {
          return sock.sendMessage(from, { text: '❌ Provide a number to remove.' });
        }

        number = formatNumber(number);

        if (!data.numbers.includes(number)) {
          return sock.sendMessage(from, {
            text: '⚠️ Number not found in allowed list.'
          });
        }

        data.numbers = data.numbers.filter(n => n !== number);
        saveAllowed(data);

        return sock.sendMessage(from, {
          text: `🗑 ${number} removed from allowed list.`
        });
      }

      // ================= LIST =================
      if (action === 'list') {
        if (!data.numbers.length) {
          return sock.sendMessage(from, {
            text: '📂 Allowed list is currently empty.'
          });
        }

        let text = '📞 *ALLOWED CALL NUMBERS*\n\n';

        data.numbers.forEach((num, i) => {
          text += `${i + 1}. ${num}\n`;
        });

        text += `\n📊 Total: ${data.numbers.length}`;

        return sock.sendMessage(from, { text });
      }

      // ================= CLEAR =================
      if (action === 'clear') {
        data.numbers = [];
        saveAllowed(data);

        return sock.sendMessage(from, {
          text: '🧹 Allowed list cleared successfully.'
        });
      }

      return sock.sendMessage(from, {
        text: '❌ Invalid action. Use add/remove/list/clear.'
      });

    } catch (err) {
      console.error('[ALLOW CMD ERROR]', err);
    }
  }
};