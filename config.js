/**
 * Global Configuration for WhatsApp MD Bot
 */

module.exports = {
    // Bot Owner Configuration
    ownerNumber: (process.env.OWNER_NUMBER || '').split(',').map(n => n.replace(/\D/g, '')).filter(Boolean), // Railway OWNER_NUMBER, comma-separated numbers
    ownerName: [process.env.OWNER_NAME || 'BROKEN'], // Owner names corresponding to ownerNumber array
    
    // Bot Configuration
    botName: 'BROKEN MINI BOT',
    version: '3.1.3',
    prefix: '.',
    sessionName: 'session',
    sessionID: process.env.SESSION_ID || '',
    newsletterJid: '120363413821588578@newsletter', // Newsletter JID for menu forwarding
    updateZipUrl: '', // URL to latest code zip for .update command
    
    // Sticker Configuration
    packname: 'BROKEN MINI BOT',
    
    // Bot Behavior
    selfMode: false, // Private mode - only owner can use commands
    autoRead: false,
    autoTyping: true,
    autoRecording: false,
    autoBio: false,
    autoSticker: false,
    autoReact: false,
    autoReactMode: 'all', // set bot or all via cmd
    autoDownload: false,
    
    // Auto Reply
    AUTO_REPLY: false,
    AUTO_STATUS_SEEN: true,
    AUTO_STATUS_REACT: false,
   
    // Group Settings Defaults
    defaultGroupSettings: {
      antilink: false,
      antilinkAction: 'delete', // 'delete', 'kick', 'warn'
      antitag: false,
      antitagAction: 'delete',
      antiall: false, // Owner only - blocks all messages from non-admins
      antiviewonce: false,
      antibot: false,
      antigroupmention: false, // Anti-group mention feature
      antigroupmentionAction: 'delete', // 'delete', 'kick'
      welcome: false,
      welcomeMessage: '╭╼━≪•𝙽𝙴𝚆 𝙼𝙴𝙼𝙱𝙴𝚁•≫━╾╮\n┃𝚆𝙴𝙻𝙲𝙾𝙼𝙴: @user 👋\n┃Member count: #memberCount\n┃𝚃𝙸𝙼𝙴: time⏰\n╰━━━━━━━━━━━━━━━╯\n\n*@user* Welcome to *@group*! 🎉\n*Group 𝙳𝙴𝚂𝙲𝚁𝙸𝙿𝚃𝙸𝙾𝙽*\ngroupDesc\n\n> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ BROKEN MD*',
      goodbye: false,
      goodbyeMessage: 'Goodbye @user 👋 We will never miss you!',
      antiSpam: false,
      antidelete: false,
      nsfw: false,
      detect: false,
      chatbot: false,
      autosticker: false // Auto-convert images/videos to stickers
    },
    
    // API Keys (add your own)
    apiKeys: {
      // Add API keys here if needed
      openai: '',
      deepai: '',
      remove_bg: ''
    },
    
    // Message Configuration
    messages: {
      wait: '⏳ Please wait...',
      success: '✅ Success!',
      error: '❌ Error occurred!',
      ownerOnly: '👑 This command is only for bot owner!',
      adminOnly: '🛡️ This command is only for group admins!',
      groupOnly: '👥 This command can only be used in groups!',
      privateOnly: '💬 This command can only be used in private chat!',
      botAdminNeeded: '🤖 Bot needs to be admin to execute this command!',
      invalidCommand: '❓ Invalid command! Type .menu for help'
    },
    
    // Timezone
    timezone: process.env.TZ || 'Asia/Karachi',
    
    // Limits
    maxWarnings: 3,
    
    // Social Links (optional)
    social: {
      github: 'https://github.com/shahbaz804?tab=repositories',
      instagram: 'https://instagram.com/shahbazbroken7',
      youtube: 'http://youtube.com/@shahbazeditx786'
    }
};
  