const { EmbedBuilder } = require('discord.js');
const { checkPermissions } = require('../utils/permissions');
const { getStockCounts } = require('../utils/accountManager');
const { setPreStockCheck } = require('../utils/prestockManager');

module.exports = {
  name: 'checkstock',
  description: 'Vérifie le stock avant ajout',
  async execute(message, args) {
    if (!checkPermissions(message.author.id)) {
      return message.reply('❌ Vous n\'avez pas la permission d\'utiliser cette commande.');
    }

    if (args.length < 1) {
      return message.reply('❌ Usage: +checkstock <steam/rockstar/minecraft/discord/bundlef/hazelifetime/hazeweek>');
    }

    const type = args[0].toLowerCase();
    if (!['steam', 'rockstar', 'minecraft', 'discord', 'bundlef', 'hazelifetime', 'hazeweek'].includes(type)) {
      return message.reply('❌ Type de produit invalide');
    }

    const stock = getStockCounts();
    const currentStock = stock[type] || 0;

    setPreStockCheck(type, currentStock);

    message.reply(`✅ Stock actuel de ${type}: ${currentStock}\nVous pouvez maintenant utiliser la commande +addstock`);
  }
};