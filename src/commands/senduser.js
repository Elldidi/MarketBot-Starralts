const { EmbedBuilder } = require('discord.js');
const { getAccounts, removeAccounts } = require('../utils/accountManager');
const { checkPermissions } = require('../utils/permissions');
const { addProductToHistory } = require('../utils/userHistory');
const Logger = require('../utils/logger');

module.exports = {
  name: 'senduser',
  description: 'Envoie des comptes à un utilisateur',
  async execute(message, args) {
    if (!checkPermissions(message.author.id)) {
      return message.reply('❌ Permissions insuffisantes');
    }

    if (args.length < 3) {
      return message.reply('❌ Usage: +senduser @user <nombre> <type>');
    }

    const user = message.mentions.users.first();
    if (!user) {
      return message.reply('❌ Mentionnez un utilisateur');
    }

    const count = parseInt(args[1]);
    const type = args[2].toLowerCase();

    const validTypes = ['steam', 'rockstar', 'minecraft', 'discord', 'bundlef', 'hazelifetime', 'hazeweek'];
    if (!validTypes.includes(type)) {
      return message.reply('❌ Type invalide');
    }

    if (isNaN(count) || count <= 0) {
      return message.reply('❌ Quantité invalide');
    }

    try {
      const availableAccounts = getAccounts(type);
      if (availableAccounts.length < count) {
        return message.reply(`❌ Stock insuffisant (${type})`);
      }

      const accounts = removeAccounts(type, count);

      const embed = new EmbedBuilder()
        .setColor('#00ff00')
        .setTitle('🎮 Vos comptes')
        .setDescription(`Voici vos ${count} compte(s) ${type}`)
        .addFields({ 
          name: '🔐 Comptes',
          value: '```' + accounts.map(acc => `│ ${acc}`).join('\n') + '```'
        })
        .setFooter({
          text: 'RP Market - Merci de votre confiance !',
          iconURL: message.guild.iconURL()
        })
        .setTimestamp();

      await user.send({ embeds: [embed] });
      
      Promise.all([
        addProductToHistory(user.id, type, count),
        new Logger(message.client).logAccountsSent(message.author, user, type, count, accounts)
      ]).catch(console.error);

      message.reply(`✅ ${count} ${type} envoyés à ${user.tag}`);

    } catch (error) {
      if (error.code === 50007) { 
        message.reply('❌ MPs bloqués');
      } else {
        console.error('Erreur senduser:', error);
        message.reply('❌ Erreur lors de l\'envoi');
      }
    }
  }
};