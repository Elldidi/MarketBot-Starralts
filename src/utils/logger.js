const { EmbedBuilder } = require('discord.js');

class Logger {
  constructor(client) {
    this.client = client;
  }

  async sendLog(type, embed) {
    const channelId = this.client.config.logs[type];
    if (!channelId) return;

    const channel = await this.client.channels.fetch(channelId).catch(() => null);
    if (channel) {
      await channel.send({ embeds: [embed] });
    }
  }

  async logAccountsSent(admin, user, type, count, accounts) {
    const embed = new EmbedBuilder()
      .setColor('#00ff00')
      .setTitle('📤 Comptes Envoyés')
      .addFields(
        { name: 'Admin', value: `${admin.tag} (${admin.id})`, inline: true },
        { name: 'Utilisateur', value: `${user.tag} (${user.id})`, inline: true },
        { name: 'Type', value: type, inline: true },
        { name: 'Quantité', value: count.toString(), inline: true },
        { 
          name: 'Comptes envoyés', 
          value: accounts.join('\n'),
          inline: false 
        }
      )
      .setTimestamp();

    await this.sendLog('accounts', embed);
  }

  async logStockAdded(admin, type, count) {
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('📦 Stock Ajouté')
      .addFields(
        { name: 'Admin', value: `${admin.tag} (${admin.id})`, inline: true },
        { name: 'Type', value: type, inline: true },
        { name: 'Quantité', value: count.toString(), inline: true }
      )
      .setTimestamp();

    await this.sendLog('stock', embed);
  }

  async logCustomerAdded(admin, user) {
    const embed = new EmbedBuilder()
      .setColor('#ff9900')
      .setTitle('👤 Nouveau Customer')
      .addFields(
        { name: 'Admin', value: `${admin.tag} (${admin.id})`, inline: true },
        { name: 'Utilisateur', value: `${user.tag} (${user.id})`, inline: true }
      )
      .setTimestamp();

    await this.sendLog('customers', embed);
  }
}

module.exports = Logger;