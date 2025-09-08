const { AttachmentBuilder } = require('discord.js');

module.exports = {
  name: 'payment',
  description: 'Affiche les instructions de paiement PayPal',
  async execute(message, args) {
    try {
      await message.channel.send({
        content: "**Paiement par PayPal :**\n\n" +
                "Pour effectuer un paiement via PayPal, veuillez envoyer le montant à l'adresse suivante **sans ajouter de note** :\n\n" +
                "https://paypal.me/prestonbel"
      });

      await new Promise(resolve => setTimeout(resolve, 1000));

      const friendsImage = new AttachmentBuilder('assets/paypal-friends.png');
      await message.channel.send({
        content: "Sélectionnez l'option :\n\n# **amis proches**\n\n" +
                "⚠️ Tout paiement ne respectant pas ces conditions sera refusé.",
        files: [friendsImage]
      });

      await new Promise(resolve => setTimeout(resolve, 1000));

      const transactionImage = new AttachmentBuilder('assets/transaction-id.png');
      await message.channel.send({
        content: "**Une fois le paiement effectué:**\n" +
                "Merci d'envoyer une capture d'écran accompagnée de l'ID de transaction.",
        files: [transactionImage]
      });

    } catch (error) {
      console.error('Erreur lors de l\'envoi des instructions:', error);
      message.reply('❌ Une erreur est survenue lors de l\'envoi des instructions.');
    }
  }
};