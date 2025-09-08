const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'shopbundle',
  description: 'Affiche les informations du Bundle FiveM',
  async execute(message, args) {
    const embed = new EmbedBuilder()
      .setColor('#ff6b6b')  
      .setTitle('🎮 Bundle FiveM Complet')
      .setDescription('**Parfait pour se débannir/spoofer sur FiveM.**\n\n💰 **Prix:** 0,90€')
      .addFields(
        { 
          name: '📦 Contenu du Pack',
          value: '• 1x Compte Steam \n• 1x Compte Discord Fresh \n• 1x Acc FiveM Ready \n• Support après-vente inclus',
          inline: false 
        },
        { 
          name: '✨ Avantages',
          value: '• Comptes vérifiés et testés\n• Installation guidée\n• Accès immédiat\n• Compatible avec tous les serveurs',
          inline: false 
        },
        { 
          name: '📧 Webmail inclus',
          value: '• Accès aux webmails fourni\n• Changement des informations possible',
          inline: false 
        },
        { 
          name: '⚡ Bonus',
          value: '• Guide d\'installation détaillé \n• Garantie de remplacement 24h',
          inline: false 
        }
      )
      .setImage('https://i.imgur.com/RGKMLSR.png') 
      .setFooter({ 
        text: 'Pour acheter, Ouvrez un ticket !',
        iconURL: message.guild.iconURL()
      })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  }
};