const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'shopminecraft',
  description: 'Affiche les informations des comptes Minecraft',
  async execute(message, args) {
    const embed = new EmbedBuilder()
      .setColor('#62B47A')  
      .setTitle('🎮 Compte Minecraft Premium')
      .setDescription('**Compte prêt à l\'emploi pour accéder à vos serveurs Minecraft préférés !**\n\n💰 **Prix:** 5€')
      .addFields(
        { 
          name: '📦 Détails du produit',
          value: '• Compte entièrement fonctionnel\n• Compatible avec toutes les versions de Minecraft\n• Accès sécurisé garanti\n• Compte remplaçable en cas de problème',
          inline: false 
        },
        { 
          name: '📧 Webmail disponibles',
          value: 'Oui',
          inline: false 
        },
        { 
          name: '🛒 Après l\'achat, vous recevrez',
          value: '• Les détails de connexion (Email + Mot de passe)\n• Une aide pour l\'installation si nécessaire\n• Un support après-vente réactif',
          inline: false 
        },
        {
          name: '🌍 Garantie',
          value: 'Une garantie de 24h est incluse après l\'achat si le compte ne fonctionne pas.',
          inline: false
        }
      )
      .setImage('https://i.imgur.com/ApifUqg.png') 
      .setFooter({ 
        text: 'Pour acheter, ouvrez un ticket !',
        iconURL: message.guild.iconURL()
      })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  }
};