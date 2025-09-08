const { EmbedBuilder } = require('discord.js');
const { getStockCounts } = require('../utils/accountManager');

module.exports = {
  name: 'stock',
  description: 'Affiche le stock de comptes disponible',
  async execute(message, args) {
    const stock = getStockCounts();
    
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('📦 État du Stock')
      .setDescription('Voici le stock actuel des comptes disponibles')
      .addFields(
        { 
          name: 'Stock Rockstar', 
          value: `${stock.rockstar} compte(s)`,
          inline: false 
        },
        { 
          name: '———————————————', 
          value: '\u200B',
          inline: false 
        },
        { 
          name: 'Stock Steam', 
          value: `${stock.steam} compte(s)`,
          inline: false 
        },
        { 
          name: '———————————————', 
          value: '\u200B',
          inline: false 
        },
        { 
          name: 'Stock Minecraft', 
          value: `${stock.minecraft} compte(s)`,
          inline: false 
        },
        { 
          name: '———————————————', 
          value: '\u200B',
          inline: false 
        },
        { 
          name: 'Stock Discord Email + num vérif', 
          value: `${stock.discord} compte(s)`,
          inline: false 
        },
        { 
          name: '———————————————', 
          value: '\u200B',
          inline: false 
        },
        { 
          name: 'Stock bundlefivem (discord, steam, fivem fresh)', 
          value: `${stock.bundlef} compte(s)`,
          inline: false 
        },
        { 
          name: '———————————————', 
          value: '\u200B',
          inline: false 
        },
        { 
          name: 'Stock clé Haze LifeTime', 
          value: `${stock.hazelifetime} compte(s)`,
          inline: false 
        },
        { 
          name: '———————————————', 
          value: '\u200B',
          inline: false 
        },
        { 
          name: 'Stock clé Haze week 7days', 
          value: `${stock.hazeweek} compte(s)`,
          inline: false 
        }
      )
      .setTimestamp();

    message.reply({ embeds: [embed] });
  }
};