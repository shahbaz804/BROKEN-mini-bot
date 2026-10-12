const vm = require('vm');
module.exports = {
  name: 'calc', aliases: ['calculate', 'math'], category: 'utility',
  description: 'Calculate simple math expressions', usage: '.calc <expression>',
  async execute(sock, msg, args, extra) {
    const expression = (Array.isArray(args) ? args.join(' ') : String(args || '')).trim();
    if (!expression) return extra.reply('Usage: .calc 5 + 3 * 2');
    if (expression.length > 120 || !/^[0-9+\-*/(). %]+$/.test(expression))
      return extra.reply('❌ Only basic arithmetic characters are allowed.');
    try {
      const result = vm.runInNewContext(expression, Object.create(null), { timeout: 50 });
      if (typeof result !== 'number' || !Number.isFinite(result)) throw new Error('Invalid result');
      return extra.reply(`🧮 ${expression} = ${result}`);
    } catch { return extra.reply('❌ Invalid mathematical expression.'); }
  }
};
