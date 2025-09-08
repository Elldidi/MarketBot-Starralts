const { EmbedBuilder } = require('discord.js');
const { checkPermissions } = require('../utils/permissions');

module.exports = {
  name: 'embed',
  description: 'Crée un embed personnalisé',
  async execute(message, args) {
    if (!checkPermissions(message.author.id)) {
      return message.reply('❌ Vous n\'avez pas la permission d\'utiliser cette commande.');
    }

    const filter = m => m.author.id === message.author.id;
    const embedData = {};

    async function askQuestion(question) {
      const questionMsg = await message.channel.send(question);
      const collected = await message.channel.awaitMessages({ 
        filter, 
        max: 1,
        time: 30000
      });

      // Supprime la question et la réponse
      await questionMsg.delete().catch(() => {});
      if (collected.first()) {
        await collected.first().delete().catch(() => {});
      }

      return collected.size > 0 ? collected.first().content : null;
    }

    try {
      // Titre
      const title = await askQuestion('📝 Entrez le titre de l\'embed (ou "skip" pour passer):');
      if (title && title.toLowerCase() !== 'skip') embedData.title = title;

      // Description
      const description = await askQuestion('📝 Entrez la description (ou "skip" pour passer):');
      if (description && description.toLowerCase() !== 'skip') embedData.description = description;

      // Couleur
      const color = await askQuestion('🎨 Entrez la couleur en hexadécimal (ex: #ff0000) ou "skip":');
      if (color && color.toLowerCase() !== 'skip') embedData.color = color;

      // Image
      const image = await askQuestion('🖼️ Entrez l\'URL de l\'image (ou "skip" pour passer):');
      if (image && image.toLowerCase() !== 'skip') embedData.image = image;

      // Thumbnail
      const thumbnail = await askQuestion('🖼️ Entrez l\'URL de la miniature/thumbnail (ou "skip" pour passer):');
      if (thumbnail && thumbnail.toLowerCase() !== 'skip') embedData.thumbnail = thumbnail;

      // Footer
      const footer = await askQuestion('📝 Entrez le texte du footer (ou "skip" pour passer):');
      if (footer && footer.toLowerCase() !== 'skip') embedData.footer = footer;

      // Sélection du salon
      const channelInput = await askQuestion('📍 Mentionnez le salon où envoyer l\'embed ou tapez "here" pour ce salon:');
      
      let targetChannel = message.channel;
      if (channelInput && channelInput.toLowerCase() !== 'here') {
        const channelId = channelInput.replace(/[<#>]/g, '');
        const channel = message.guild.channels.cache.get(channelId);
        if (channel) {
          targetChannel = channel;
        } else {
          return message.reply('❌ Salon invalide.');
        }
      }

      // Création de l'embed
      const embed = new EmbedBuilder();
      
      if (embedData.title) embed.setTitle(embedData.title);
      if (embedData.description) embed.setDescription(embedData.description);
      if (embedData.color) embed.setColor(embedData.color);
      if (embedData.image) embed.setImage(embedData.image);
      if (embedData.thumbnail) embed.setThumbnail(embedData.thumbnail);
      if (embedData.footer) embed.setFooter({ text: embedData.footer });
      
      // Envoi de l'embed
      await targetChannel.send({ embeds: [embed] });
      if (targetChannel.id !== message.channel.id) {
        const confirmMsg = await message.reply(`✅ Embed envoyé dans ${targetChannel}`);
        setTimeout(() => confirmMsg.delete().catch(() => {}), 5000);
      }

    } catch (error) {
      console.error('Erreur lors de la création de l\'embed:', error);
      const errorMsg = await message.reply('❌ Une erreur est survenue ou le temps d\'attente est dépassé.');
      setTimeout(() => errorMsg.delete().catch(() => {}), 5000);
    }
  }
};