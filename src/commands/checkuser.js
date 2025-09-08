const { EmbedBuilder } = require('discord.js');
const { checkPermissions } = require('../utils/permissions');
const { getUserHistory } = require('../utils/userHistory');

module.exports = {
  name: 'checkuser',
  description: 'Affiche l\'historique des produits reçus par un utilisateur',
  async execute(message, args) {
    if (!checkPermissions(message.author.id)) {
      return message.reply('❌ Vous n\'avez pas la permission d\'utiliser cette commande.');
    }

    const user = message.mentions.users.first();
    if (!user) {
      return message.reply('❌ Vous devez mentionner un utilisateur. Usage: +checkuser @utilisateur');
    }

    try {
      const member = await message.guild.members.fetch(user.id);
      const hasCustomerRole = member.roles.cache.has(message.client.config.customerRoleId);
      const userHistory = getUserHistory(user.id);

      let productsReceived = '```\n';
      if (userHistory.length === 0) {
        productsReceived += 'Aucun produit reçu\n';
      } else {
        userHistory.forEach(item => {
          const date = new Date(item.date).toLocaleDateString('fr-FR');
          productsReceived += `${date} : ${item.quantity}x ${item.type}\n`;
        });
      }
      productsReceived += '```';

      const embed = new EmbedBuilder()
        .setColor(hasCustomerRole ? '#00ff00' : '#ff0000')
        .setTitle(`📋 Informations sur ${user.tag}`)
        .setThumbnail(user.displayAvatarURL())
        .addFields(
          {
            name: '👤 Status',
            value: hasCustomerRole ? '✅ Customer' : '❌ Non Customer',
            inline: true
          },
          {
            name: '🔢 ID',
            value: user.id,
            inline: true
          },
          {
            name: '📅 Compte créé le',
            value: `<t:${Math.floor(user.createdTimestamp / 1000)}:f>`,
            inline: false
          },
          {
            name: '📥 A rejoint le serveur le',
            value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:f>`,
            inline: false
          },
          {
            name: '🛍️ Historique des produits reçus',
            value: productsReceived,
            inline: false
          }
        )
        .setFooter({ 
          text: `Demandé par ${message.author.tag}`,
          iconURL: message.author.displayAvatarURL()
        })
        .setTimestamp();

      message.reply({ embeds: [embed] });

    } catch (error) {
      console.error('Erreur lors de la vérification de l\'utilisateur:', error);
      message.reply('❌ Une erreur est survenue lors de la vérification de l\'utilisateur.');
    }
  }
};