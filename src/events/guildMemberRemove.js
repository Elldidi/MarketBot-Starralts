const { EmbedBuilder } = require('discord.js');
const { formatMessage } = require('../utils/messageFormatter');

module.exports = {
  name: 'guildMemberRemove',
  async execute(member) {
    const config = member.client.config;
    if (!config.goodbye.enabled) return;

    try {
      const roles = member.roles.cache
        .filter(role => role.id !== member.guild.id)
        .map(role => role.name)
        .join(', ') || 'Aucun rôle';

      // Préparation des données pour le formatage
      const messageData = {
        user: member.user.username,
        userTag: member.user.tag,
        userId: member.id,
        server: member.guild.name,
        memberCount: member.guild.memberCount,
        joinedAt: `<t:${Math.floor(member.joinedTimestamp / 1000)}:F>`,
        userMention: member.toString(),
        userAvatar: member.user.displayAvatarURL({ dynamic: true }),
        serverIcon: member.guild.iconURL({ dynamic: true }),
        roles: roles
      };

      // Message de départ dans le salon
      if (config.goodbye.channelId) {
        const goodbyeChannel = await member.guild.channels.fetch(config.goodbye.channelId);
        if (goodbyeChannel) {
          if (config.goodbye.useEmbed && config.goodbye.message.embed.enabled) {
            const embed = new EmbedBuilder()
              .setColor(config.goodbye.message.embed.color)
              .setTitle(formatMessage(config.goodbye.message.embed.title, messageData))
              .setDescription(formatMessage(config.goodbye.message.embed.description, messageData));

            if (config.goodbye.message.embed.thumbnail) {
              embed.setThumbnail(messageData.userAvatar);
            }

            if (config.goodbye.message.embed.showJoinDuration) {
              embed.addFields({ name: 'Avait rejoint le', value: messageData.joinedAt, inline: true });
            }

            if (config.goodbye.message.embed.showRoles) {
              embed.addFields({ name: 'Rôles', value: messageData.roles, inline: true });
            }

            if (config.goodbye.message.embed.footer) {
              embed.setFooter({ 
                text: formatMessage(config.goodbye.message.embed.footer, messageData)
              });
            }

            await goodbyeChannel.send({ embeds: [embed] });
          } else {
            const content = formatMessage(config.goodbye.message.content, messageData);
            await goodbyeChannel.send({ content });
          }
        }
      }

      // Log du départ
      if (config.logs.members) {
        const logChannel = await member.guild.channels.fetch(config.logs.members);
        if (logChannel) {
          const logEmbed = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle('📤 Membre parti')
            .addFields(
              { name: 'Membre', value: `${messageData.userTag} (${messageData.userId})`, inline: true },
              { name: 'Avait rejoint le', value: messageData.joinedAt, inline: true },
              { name: 'Rôles', value: messageData.roles, inline: false }
            )
            .setTimestamp();

          await logChannel.send({ embeds: [logEmbed] });
        }
      }
    } catch (error) {
      console.error('Erreur lors de l\'exécution de guildMemberRemove:', error);
    }
  }
};