const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'shopdiscord',
  description: 'Affiche les informations des comptes Discord',
  async execute(message, args) {
    const embed = new EmbedBuilder()
      .setColor('#5865F2')
      .setTitle('🎮 Compte Discord')
      .setDescription('**Compte Discord prêt à l\'emploi**\n\n💰 **Prix:** 0,55€')
      .addFields(
        { 
          name: '📦 Détails du produit',
          value: '• Comptes récents et vierges (sans aucune activité)\n• Numéro vérifié inclus\n• Compatibles avec toutes les plateformes Discord\n• Accès sécurisé et garanti\n• Compte remplaçable en cas de problème',
          inline: false 
        },
        { 
          name: '📧 Webmail disponibles',
          value: 'Oui',
          inline: false 
        },
        { 
          name: '🛒 Après l\'achat, vous recevrez',
          value: '• Les détails de connexion (Email + Mot de passe)\n• Une assistance après achat si nécessaire\n• Un support après-vente réactif',
          inline: false 
        },
        {
          name: '🌍 Garantie',
          value: 'Une garantie de 24h est incluse après l\'achat si le compte ne fonctionne pas.',
          inline: false
        }
      )
      .setImage('https://i.imgur.com/haQP3n1.png') 
      .setFooter({ 
        text: 'Pour acheter, ouvrez un ticket !',
        iconURL: message.guild.iconURL()
      })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  }
};