const { checkPermissions } = require('../utils/permissions');
const { getStockCounts } = require('../utils/accountManager');
const { getPreStockCheck, createRestockEmbed, clearPreStockCheck } = require('../utils/prestockManager');

module.exports = {
  name: 'notif',
  description: 'Envoie une notification de restock',
  async execute(message, args) {
    if (!checkPermissions(message.author.id)) {
      return message.reply('❌ Vous n\'avez pas la permission d\'utiliser cette commande.');
    }

    if (args.length < 1) {
      return message.reply('❌ Usage: +notif <steam/rockstar/minecraft/discord/bundlef/hazelifetime/hazeweek>');
    }

    const type = args[0].toLowerCase();
    if (!['steam', 'rockstar', 'minecraft', 'discord', 'bundlef', 'hazelifetime', 'hazeweek'].includes(type)) {
      return message.reply('❌ Type de produit invalide');
    }

    const preCheck = getPreStockCheck(type);
    if (!preCheck) {
      return message.reply('❌ Aucune vérification de stock préalable trouvée. Utilisez d\'abord +checkstock');
    }

    try {
      const currentStock = getStockCounts()[type];
      const addedAmount = currentStock - preCheck.amount;

      if (addedAmount <= 0) {
        return message.reply('❌ Aucun nouveau stock n\'a été ajouté depuis la dernière vérification');
      }

      const restockEmbed = createRestockEmbed(
        type,
        preCheck.amount,
        currentStock,
        addedAmount
      );

      const restockChannel = await message.client.channels.fetch(message.client.config.logs.restock);
      if (restockChannel) {
        await restockChannel.send({ embeds: [restockEmbed] });
        message.reply('✅ Notification de restock envoyée avec succès');
      } else {
        message.reply('❌ Canal de restock non trouvé');
      }

      clearPreStockCheck(type);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la notification:', error);
      message.reply('❌ Une erreur est survenue lors de l\'envoi de la notification');
    }
  }
};