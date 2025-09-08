const { addAccounts } = require('../utils/accountManager');
const { checkPermissions } = require('../utils/permissions');
const { getPreStockCheck } = require('../utils/prestockManager');

module.exports = {
  name: 'addstock',
  description: 'Ajoute des comptes au stock',
  async execute(message, args) {
    if (!checkPermissions(message.author.id)) {
      return message.reply('❌ Permissions insuffisantes');
    }

    if (args.length < 3) {
      return message.reply('❌ Usage: +addstock <type> <nombre> <comptes>');
    }

    const type = args[0].toLowerCase();
    const validTypes = ['steam', 'rockstar', 'minecraft', 'discord', 'bundlef', 'hazelifetime', 'hazeweek'];
    
    if (!validTypes.includes(type)) {
      return message.reply('❌ Type invalide');
    }

    const preCheck = getPreStockCheck(type);
    if (!preCheck) {
      return message.reply('❌ Utilisez d\'abord +checkstock');
    }

    const count = parseInt(args[1]);
    if (isNaN(count) || count <= 0) {
      return message.reply('❌ Quantité invalide');
    }

    const accounts = args.slice(2).join(' ').split(',').map(acc => acc.trim());
    if (accounts.length !== count) {
      return message.reply('❌ Nombre de comptes incorrect');
    }

    try {
      addAccounts(type, accounts, message.client.config);
      
      const Logger = require('../utils/logger');
      const logger = new Logger(message.client);
      logger.logStockAdded(message.author, type, count).catch(console.error);

      message.reply(`✅ ${count} ${type} ajoutés\n+notif ${type} pour notifier`);
    } catch (error) {
      if (error.code === 'DUPLICATE_ACCOUNTS') {
        return message.reply(`❌ Doublons détectés ! Les comptes suivants existent déjà :\n\`\`\`${error.duplicates.join('\n')}\`\`\``);
      }
      console.error('Erreur addstock:', error);
      message.reply('❌ Erreur lors de l\'ajout');
    }
  }
};