class StickyMessageManager {
  constructor(client) {
    this.client = client;
    this.lastMessages = new Map();
    this.validProducts = ['rockstar', 'steam', 'discord', 'bundlef', 'hazelifetime', 'hazeweek', 'minecraft'];
    this.enabled = client.config.enableStickyMessages !== false;
  }

  async initialize() {
    if (!this.enabled) return;

    const { stickyMessages } = this.client.config;
    if (!stickyMessages) return;

    for (const [key, config] of Object.entries(stickyMessages)) {
      const channel = await this.client.channels.fetch(config.channelId).catch(() => null);
      if (channel) {
        const messages = await channel.messages.fetch({ limit: 10 });
        const lastSticky = messages.find(m => 
          m.author.id === this.client.user.id && 
          m.content.startsWith('__**Message épinglé:**__')
        );
        if (lastSticky) await lastSticky.delete().catch(() => null);

        const sticky = await channel.send(config.message);
        this.lastMessages.set(config.channelId, sticky.id);
      }
    }
  }

  isValidRepFormat(message) {
    if (!this.enabled) return true;

    if (!message.content.toLowerCase().startsWith('+rep')) return false;

    if (message.mentions.users.size !== 1) return false;

    const afterMention = message.content.split('>')[1]?.trim();
    if (!afterMention) return false;

    const parts = afterMention.split(/\s+/);
    if (parts.length !== 2) return false;

    const quantityMatch = parts[0].match(/^(\d+)x$/);
    if (!quantityMatch) return false;
    const quantity = parseInt(quantityMatch[1]);
    if (quantity <= 0 || quantity > 100) return false;

    const product = parts[1].toLowerCase();
    if (!this.validProducts.includes(product)) return false;

    return true;
  }

  async handleMessage(message) {
    if (!this.enabled) return;

    if (message.author.bot) return;

    if (message.channel.id === this.client.config.stickyMessages.reviews.channelId) {
      if (!this.isValidRepFormat(message)) {
        try {
          await message.delete();
          const warningMessage = await message.channel.send({
            content: `${message.author}, votre message a été supprimé car il ne respecte pas le format requis.\n\n` +
                    `Format correct: \`+rep @utilisateur 1x produit\`\n` +
                    `Produits valides: ${this.validProducts.join(', ')}\n\n` +
                    `Exemple: \`+rep @staff 1x rockstar\``,
            allowedMentions: { users: [message.author.id] }
          });
          setTimeout(() => warningMessage.delete().catch(() => null), 10000);
        } catch (error) {
          console.error('Erreur lors de la suppression du message:', error);
        }
      }
    }

    const { stickyMessages } = this.client.config;
    if (!stickyMessages) return;

    const config = Object.values(stickyMessages).find(c => c.channelId === message.channel.id);
    if (!config) return;

    const lastStickyId = this.lastMessages.get(message.channel.id);
    if (lastStickyId && message.id !== lastStickyId) {
      const lastSticky = await message.channel.messages.fetch(lastStickyId).catch(() => null);
      if (lastSticky) await lastSticky.delete().catch(() => null);

      const sticky = await message.channel.send(config.message);
      this.lastMessages.set(message.channel.id, sticky.id);
    }
  }
}

module.exports = StickyMessageManager;