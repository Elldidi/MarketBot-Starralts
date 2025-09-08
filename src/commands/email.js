const { AttachmentBuilder } = require('discord.js');

module.exports = {
  name: 'email',
  description: 'Affiche les instructions pour accéder aux emails Rambler',
  async execute(message, args) {
    try {
      const step1 = new AttachmentBuilder('assets/rockstar-login.png');
      await message.channel.send({
        content: "**1. Connexion au compte Rockstar Games**\n\n" +
                "Votre compte a été configuré avec une adresse e-mail se terminant par @rambler.ru.\n" +
                "Voici les étapes pour vous connecter :\n" +
                "• Rendez vous sur la page de connexion rockstar après le woof ou le changement de compte\n" +
                "• Entrez l'adresse e-mail fournie (terminant par @rambler.ru) et le mot de passe associé que vous avez reçu lors de votre achat.",
        files: [step1]
      });

      await new Promise(resolve => setTimeout(resolve, 1000));

      const step2 = new AttachmentBuilder('assets/rambler-login.png');
      await message.channel.send({
        content: "**2. Utilisation de Rambler Mail pour consulter vos e-mails**\n\n" +
                "Pour accéder à la boîte mail associée à l'adresse @rambler.ru :\n" +
                "• Allez sur https://id.rambler.ru/login-20/login?back=https%3A%2F%2Fmail.rambler.ru%2F&rname=mail&theme=mail&session=false#startTime=1736013755680\n" +
                "• Connectez-vous avec les identifiants fournis pour accéder à vos e-mails.",
        files: [step2]
      });

    } catch (error) {
      console.error('Erreur lors de l\'envoi des instructions:', error);
      message.reply('❌ Une erreur est survenue lors de l\'envoi des instructions.');
    }
  }
};