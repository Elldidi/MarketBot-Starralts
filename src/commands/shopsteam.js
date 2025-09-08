const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'shopsteam',
  description: 'Affiche les informations des comptes Steam',
  async execute(message, args) {
    const embed = new EmbedBuilder()
      .setColor('#1b2838')  
      .setTitle('🎮 Compte Steam pour FiveM')
      .setDescription('**Compte prêt à l\'emploi pour se faire deban de certains serveurs FiveM**\n\n💰 **Prix:** 0,15€')
      .addFields(
        { 
          name: '📦 Détails du produit',
          value: '• Fonctionne pour un unban de serveur\n• Compatible avec toutes les versions de Windows\n• Compte avec aucun jeu dessus\n• Compte remplaçable si dysfonctionnement',
          inline: false 
        },
        { 
          name: '✉️ Webmail disponibles',
          value: '• [thsyy](http://thsyy.com/)',
          inline: false 
        },
        { 
          name: '🛒 Après l\'achat, vous recevrez',
          value: '• Détails de connexion (Email + Mot de passe)\n• Aide après installation\n• Support après-vente',
          inline: false 
        },
        {
          name: '🌍 Garantie',
          value: 'Une Garantie de 24h est disponible après l\'achat si le compte ne marche pas',
          inline: false
        }
      )
      .setImage('https://i.imgur.com/5AErI5F.png')
      .setFooter({ 
        text: 'Pour acheter, ouvrez un ticket ! ',
        iconURL: message.guild.iconURL()
      })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  }
};