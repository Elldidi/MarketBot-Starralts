const { EmbedBuilder } = require('discord.js');
const { getTranslation } = require('../utils/translationManager');

module.exports = {
  name: 'help',
  description: 'Affiche la liste des commandes disponibles',
  async execute(message, args) {
    const translation = getTranslation(message.client.config.language);
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(translation.commands.help.title)
      .setDescription(translation.commands.help.description)
      .addFields(
        {
          name: '🛍️ ' + translation.commands.help.shopCommands,
          value: '```' +
            '+shop - ' + translation.commands.help.shopDesc + '\n' +
            '+shopsteam - ' + translation.commands.help.shopSteamDesc + '\n' +
            '+shopdiscord - ' + translation.commands.help.shopDiscordDesc + '\n' +
            '+shopminecraft - ' + translation.commands.help.shopMinecraftDesc + '\n' +
            '+shopbundle - ' + translation.commands.help.shopBundleDesc + '\n' +
            '+shopwoofer - ' + translation.commands.help.shopWooferDesc +
            '```'
        },
        {
          name: '📦 ' + translation.commands.help.stockCommands,
          value: '```' +
            '+stock - ' + translation.commands.help.stockDesc + '\n' +
            '+checkstock <type> - ' + translation.commands.help.checkStockDesc + '\n' +
            '+addstock <type> <nombre> <comptes> - ' + translation.commands.help.addStockDesc + '\n' +
            '+notif <type> - ' + translation.commands.help.notifDesc +
            '```'
        },
        {
          name: '👥 ' + translation.commands.help.userCommands,
          value: '```' +
            '+senduser @user <nombre> <type> - ' + translation.commands.help.sendUserDesc + '\n' +
            '+addcustomer @user - ' + translation.commands.help.addCustomerDesc + '\n' +
            '+checkuser @user - ' + translation.commands.help.checkUserDesc +
            '```'
        },
        {
          name: '🛡️ ' + translation.commands.help.moderationCommands,
          value: '```' +
            '+ban @user [durée] [raison] - ' + translation.commands.help.banDesc + '\n' +
            '+unban <ID> [raison] - ' + translation.commands.help.unbanDesc + '\n' +
            '+timeout @user <durée> [raison] - ' + translation.commands.help.timeoutDesc + '\n' +
            '+untimeout @user [raison] - ' + translation.commands.help.untimeoutDesc + '\n' +
            '+warn @user [raison] - ' + translation.commands.help.warnDesc + '\n' +
            '+unwarn @user <numéro> - ' + translation.commands.help.unwarnDesc + '\n' +
            '+warnings @user - ' + translation.commands.help.warningsDesc +
            '```'
        },
        {
          name: '📝 ' + translation.commands.help.guideCommands,
          value: '```' +
            '+cfxban - ' + translation.commands.help.cfxbanDesc + '\n' +
            '+email - ' + translation.commands.help.emailDesc + '\n' +
            '+payment - ' + translation.commands.help.paymentDesc +
            '```'
        }
      )
      .setFooter({ 
        text: 'RP Market',
        iconURL: message.guild.iconURL()
      })
      .setTimestamp();

    message.reply({ embeds: [embed] });
  }
};