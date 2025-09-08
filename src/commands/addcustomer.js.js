const { checkPermissions } = require('../utils/permissions');
const config = require('../../config.js');

module.exports = {
  name: 'addcustomer',
  description: 'Ajoute le rôle customer',
  async execute(message, args) {
    if (!checkPermissions(message.author.id)) {
      return message.reply('❌ Permissions insuffisantes');
    }

    const member = message.mentions.members.first();
    if (!member) {
      return message.reply('❌ Mentionnez un utilisateur');
    }

    try {
      await member.roles.add(config.customerRoleId);
      
      const Logger = require('../utils/logger');
      const logger = new Logger(message.client);
      logger.logCustomerAdded(message.author, member.user).catch(console.error);

      message.reply(`✅ Rôle ajouté à ${member.user.tag}`);
    } catch (error) {
      console.error('Erreur addcustomer:', error);
      message.reply('❌ Erreur lors de l\'ajout du rôle');
    }
  }
};