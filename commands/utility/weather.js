/**
 * Weather Command - Get weather information using OpenWeather API
 */
const config = require('../../config');
const axios = require('axios');

module.exports = {
  name: 'weather',
  aliases: ['w', 'clima'],
  category: 'utility',
  description: 'Get weather for a city',
  usage: '.weather <city>',
  
  async execute(sock, msg, args) {
    try {
      if (args.length === 0) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: '❌ Usage: .weather <city>\n\nExample: .weather London' 
        }, { quoted: msg });
      }
      
      const city = args.join(' ');
      const apiKey = '4902c0f2550f58298ad4146a92b65e10';
      
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      const weather = response.data;
      
const weatherText = `
╭━━〔 WEATHER REPORT 〕━━╮
┃ 📍 *Location:* ${weather.name}, ${weather.sys.country}
┃ 🌡️ *Temp:* ${weather.main.temp}°C (Feels like: ${weather.main.feels_like}°C)
┃ 📝 *Condition:* ${weather.weather[0].description}
┃ 💧 *Humidity:* ${weather.main.humidity}%
┃ 🌬️ *Wind:* ${weather.wind.speed} m/s, ${weather.wind.deg}°
┃ 🌪️ *Pressure:* ${weather.main.pressure} hPa
┃ 🌅 *Sunrise:* ${new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
┃ 🌇 *Sunset:* ${new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
╰═❀════════════════❀═╯
`;
      const contextInfo = {
  forwardingScore: 1,
  isForwarded: true,
  forwardedNewsletterMessageInfo: {
    newsletterJid: config.newsletterJid || '120363413821588578@newsletter',
    newsletterName: config.botName || 'BROKEN MD Bot',
    serverMessageId: -1
  }
};
      await sock.sendMessage(msg.key.remoteJid, { text: weatherText, contextInfo }, { quoted: msg });
      
    } catch (error) {
      console.error('Error fetching weather:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: 'Sorry, I could not fetch the weather right now.' }, { quoted: msg });
    }
  }
};
