const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'shopwoofer',
  description: 'Affiche les informations du Temp Woofer',
  async execute(message, args) {
    const embed = new EmbedBuilder()
      .setColor('#ff5555')
      .setTitle('🛡️ Temp Woofer ')
      .setDescription('**Solution complète pour FiveM & Call of Duty MW3**\n\n💫 **Spoofer de haute qualité avec support premium**')
      .addFields(
        { 
          name: '🔥 Fonctionnalités',
          value: '• Bypass des bans globaux FiveM\n• Bypass des bans serveurs FiveM\n• Compatible avec Call of Duty MW3\n• Spoofer temporaire optimisé\n• Mises à jour régulières',
          inline: false 
        },
        { 
          name: '💻 Compatibilité',
          value: '• Windows 10 & 11\n• Processeurs Intel & AMD\n• Compatible toutes cartes mères\n• Installation simple et rapide',
          inline: false 
        },
        { 
          name: '💰 Tarifs',
          value: '• **Lifetime**: 20€ *(Accès illimité) (x2)*\n• **Mensuel**: 12,5€ (x0)\n• **Hebdomadaire**: 10€ (x0)',
          inline: false 
        },
        {
          name: '✨ Avantages',
          value: '• Support technique 24/7\n• Guide d\'installation détaillé\n• Mises à jour gratuites\n• Configuration assistée',
          inline: false
        }
      )
      .setImage('https://cdn.discordapp.com/attachments/636965217011499013/1323958960885334079/d.gif?ex=6776685e&is=677516de&hm=de8bb42866ee089c96e95a300188ae2c397ca0287562dcf6f42b9a3760dd56e4&')
      .setFooter({ 
        text: '🔒 Solution sécurisée et fiable | Pour acheter, ouvrez un ticket',
        iconURL: message.guild.iconURL()
      })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  }
};