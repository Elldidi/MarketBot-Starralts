const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'shop',
  description: 'Affiche les informations du produit',
  async execute(message, args) {
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('🎮 Compte FiveM Ready')
      .setDescription('**Compte prêt à l\'emploi pour FiveM**\n\n💰 **Prix:** 0,35€')
      .addFields(
        { 
          name: '📋 Détails du produit',
          value: '• Fonctionne sur Unban\n• Compatible avec les Spoofers\n• Compte pour PC\n• Compte de remplacement disponible',
          inline: false 
        },
        { 
          name: '📧 Webmail disponibles',
          value: '• [Rambler](https://mail.rambler.ru/)',
          inline: false 
        },
        { 
          name: '✅ Après l\'achat, vous recevrez',
          value: '• Détails de connexion (Email + Mot de passe)\n• Instructions d\'installation\n• Support après-vente',
          inline: false 
        },
        {
          name: '⚠️ Garantie',
          value: 'Garantie produit 24 heures',
          inline: false
        }
      )
      .setImage('https://i.imgur.com/fbtZr8h.png')
      .setFooter({ 
        text: 'Pour acheter, ouvrez un ticket !',
        iconURL: message.guild.iconURL()
      })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  }
};