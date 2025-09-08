const { AttachmentBuilder } = require('discord.js');

module.exports = {
  name: 'cfxban',
  description: 'Affiche les instructions pour se spoof CFX après un ban Rockstar',
  async execute(message, args) {
    try {
      const step1 = new AttachmentBuilder('assets/winr.png');
      await message.channel.send({
        content: "**1. Ouvrir l'exécuteur Windows**\n\n" +
                "• Appuyez sur les touches Windows + R pour ouvrir une petite fenêtre",
        files: [step1]
      });

      await new Promise(resolve => setTimeout(resolve, 1000));

      const step2 = new AttachmentBuilder('assets/appdata.png');
      await message.channel.send({
        content: "**2. Accéder au dossier AppData**\n\n" +
                "• Dans la fenêtre, écrivez **%appdata%**\n" +
                "• Appuyez sur Entrée",
        files: [step2]
      });

      await new Promise(resolve => setTimeout(resolve, 1000));

      const step3 = new AttachmentBuilder('assets/local-delete.png');
      await message.channel.send({
        content: "**3. Supprimer DigitalEntitlements**\n\n" +
                "• Allez dans le dossier **Local**\n" +
                "• Trouvez et supprimez le dossier **DigitalEntitlements**",
        files: [step3]
      });

      await new Promise(resolve => setTimeout(resolve, 1000));

      const step4 = new AttachmentBuilder('assets/roaming-delete.png');
      await message.channel.send({
        content: "**4. Supprimer CitizenFX**\n\n" +
                "• Retournez en arrière\n" +
                "• Allez dans le dossier **Roaming**\n" +
                "• Trouvez et supprimez le dossier **CitizenFX**",
        files: [step4]
      });

      await new Promise(resolve => setTimeout(resolve, 1000));

      const step5 = new AttachmentBuilder('assets/fivem-launch.png');
      await message.channel.send({
        content: "**5. Terminer**\n\n" +
                "✅ Relancez FiveM et connecté vous au nouveau compte !\n\n" +
                "⚠️ **Note**: Assurez-vous que FiveM est bien fermé avant de faire ces manipulations.",
        files: [step5]
      });

    } catch (error) {
      console.error('Erreur lors de l\'envoi des instructions:', error);
      message.reply('❌ Une erreur est survenue lors de l\'envoi des instructions.');
    }
  }
};