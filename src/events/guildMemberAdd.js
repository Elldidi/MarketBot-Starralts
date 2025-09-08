const { EmbedBuilder } = require('discord.js');
const { formatMessage } = require('../utils/messageFormatter');

module.exports = {
  name: 'guildMemberAdd',
  async execute(member) {
    const config = member.client.config;
    if (!config.welcome.enabled) return;

    try {
      // Ajout du rôle de bienvenue
      if (config.welcomeRoleId) {
        await member.roles.add(config.welcomeRoleId).catch(console.error);
      }

      // Préparation des données pour le formatage
      const messageData = {
        user: member.user.username,
        userTag: member.user.tag,
        userId: member.id,
        server: member.guild.name,
        memberCount: member.guild.memberCount,
        createdAt: `<t:${Math.floor(member.user.createdTimestamp / 1000)}:F>`,
        joinedAt: `<t:${Math.floor(member.joinedTimestamp / 1000)}:F>`,
        userMention: member.toString(),
        userAvatar: member.user.displayAvatarURL({ dynamic: true }),
        serverIcon: member.guild.iconURL({ dynamic: true })
      };

      // Message de bienvenue dans le salon
      if (config.welcome.channelId) {
        const welcomeChannel = await member.guild.channels.fetch(config.welcome.channelId);
        if (welcomeChannel) {
          if (config.welcome.useEmbed && config.welcome.message.embed.enabled) {
            const embed = new EmbedBuilder()
              .setColor(config.welcome.message.embed.color)
              .setTitle(formatMessage(config.welcome.message.embed.title, messageData))
              .setDescription(formatMessage(config.welcome.message.embed.description, messageData));

            if (config.welcome.message.embed.thumbnail) {
              embed.setThumbnail(messageData.userAvatar);
            }

            if (config.welcome.message.embed.showJoinDate) {
              embed.addFields({ name: 'Date d\'arrivée', value: messageData.joinedAt, inline: true });
            }

            if (config.welcome.message.embed.showAccountAge) {
              embed.addFields({ name: 'Compte créé le', value: messageData.createdAt, inline: true });
            }

            if (config.welcome.message.embed.footer) {
              embed.setFooter({ 
                text: formatMessage(config.welcome.message.embed.footer, messageData)
              });
            }

            await welcomeChannel.send({ embeds: [embed] });
          } else {
            const content = formatMessage(config.welcome.message.content, messageData);
            await welcomeChannel.send({ content });
          }
        }
      }

      // Message privé de bienvenue
      if (config.welcome.dmWelcome?.enabled) {
        if (config.welcome.dmWelcome.useEmbed) {
          const dmEmbed = new EmbedBuilder()
            .setColor(config.welcome.dmWelcome.embed.color)
            .setTitle(formatMessage(config.welcome.dmWelcome.embed.title, messageData))
            .setDescription(formatMessage(config.welcome.dmWelcome.embed.description, messageData));

          await member.send({ embeds: [dmEmbed] }).catch(() => {});
        } else {
          const content = formatMessage(config.welcome.dmWelcome.content, messageData);
          await member.send({ content }).catch(() => {});
        }
      }

      // Log de l'arrivée
      if (config.logs.members) {
        const logChannel = await member.guild.channels.fetch(config.logs.members);
        if (logChannel) {
          const logEmbed = new EmbedBuilder()
            .setColor('#00ff00')
            .setTitle('📥 Nouveau membre')
            .addFields(
              { name: 'Membre', value: `${messageData.userTag} (${messageData.userId})`, inline: true },
              { name: 'Compte créé le', value: messageData.createdAt, inline: true }
            )
            .setTimestamp();

          await logChannel.send({ embeds: [logEmbed] });
        }
      }
    } catch (error) {
      console.error('Erreur lors de l\'exécution de guildMemberAdd:', error);
    }
  }
};