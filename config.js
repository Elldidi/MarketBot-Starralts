module.exports = {
    // Token d'authentification du bot Discord
    token: "MTQxNDU1MDM5MDk4NDE1MTEzMA.GdHNca.0uxGBLHiPSJ5rRMOkGkNkKfXXtr0nPTHVGa4-M",

    // Configuration de la langue (fr ou en)
    language: "en",

    LicenseKey: "License", // contacte https://discord.gg/rpmarket  
  
    // Liste des IDs des administrateurs ayant accès aux commandes admin
    adminIds: ["1396867015821623296", "ID_USER"],
  
    // ID du serveur Discord
    clientId: "1414180558761754676",
  
    // IDs des rôles
    customerRoleId: "1414180559080525884", // Rôle attribué aux clients
    adminRoleId: "1414180559080525890",      // Rôle administrateur
    welcomeRoleId: "ROLE_ID", // Rôle donné automatiquement aux nouveaux membres
  
    // Système anti-doublons
    preventDuplicates: true, // Active/désactive la vérification des doublons

    // ID du salon pour les avis clients
    reviewsChannelId: "REVIEW_ID",
  
    // Préfixe pour les commandes du bot 
    prefix: "+",
  
    // Configuration des messages épinglés
    enableStickyMessages: true,

    support: {
      enabled: true, // Active/désactive le système de soutien
      roleId: "ROLE_ID", // ID du rôle à attribuer
      statusText: ".gg/rpmarket", // Texte à détecter dans le statut
      checkInterval: 60000, // Intervalle de vérification en ms (1 minute)
      removeRoleWhenStatusRemoved: true, // Retirer le rôle si le statut est retiré
      sendDM: false // Mettez false pour désactiver les messages privés
    },

    antiPing: {
      enabled: true, // Active/désactive le système anti-ping
      protectedRoleId: "PROTECTE_ID_ROLE", // ID du rôle protégé
      protectedUsers: ["USER_ID_1", "USER_ID_2"], // Liste des IDs utilisateurs protégés
      warnOnPing: true, // Active/désactive l'avertissement automatique // cela retire seulement le ping
      message: {
        enabled: true, // Active/désactive le message d'avertissement
        useEmbed: true, // Utiliser un embed ou un message texte
        deleteAfter: 10000, // Supprimer le message après X millisecondes (10 secondes)
        content: ":x: Il est interdit de mentionner les membres protégés. \nVous avez reçu un avertissement.", // Message texte simple
        embed: {
          color: "#ff0000",
          title: ":warning: Mention Interdite",
          description: "{user}, il est interdit de mentionner les membres protégés.\nVous avez reçu un avertissement (Warn #{warnCount})."
        }
      }
    },

    ban: {
      dm: {
          enabled: true,
          useEmbed: true // true pour embed, false pour message texte
      },
      channel: {
          enabled: true,
          useEmbed: true // true pour embed, false pour message texte
      }
    },
    unban: {
      channel: {
        enabled: true,
        useEmbed: true // true pour embed, false pour message texte
      }
    },
    timeout: {
      dm: {
          enabled: true, // true pour activé le message de unwarn dans le channel false pour désactivé le message dans le channel
          useEmbed: true // true pour embed, false pour message texte
      },
      channel: {
          enabled: true, // true pour activé le message de unwarn dans le channel false pour désactivé le message dans le channel
          useEmbed: true // true pour embed, false pour message texte
      }
    },
    untimeout: {
      channel: {
        enabled: true, // true pour activé le message de unwarn dans le channel false pour désactivé le message dans le channel
        useEmbed: true // true pour embed, false pour message texte
      }
    },
    warn: {
      dm: {
        enabled: true, // true pour activé le message de unwarn dans le channel false pour désactivé le message dans le channel
        useEmbed: true // true pour embed, false pour message texte
      },
      channel: {
        enabled: true, // true pour activé le message de unwarn dans le channel false pour désactivé le message dans le channel
        useEmbed: true // true pour embed, false pour message texte
      }
    },
    unwarn: {
      channel: {
        enabled: true, // true pour activé le message de unwarn dans le channel false pour désactivé le message dans le channel 
        useEmbed: true // true pour embed, false pour message texte
      }
    },

    welcome: {
      enabled: false,
      channelId: "CHANNEL_ID",
      useEmbed: true, // Utiliser un embed ou un message texte simple, false = désactivé true = activé !
      message: {
        content: "Bienvenue {userMention} sur {server} ! 🎉\nNous sommes maintenant {memberCount} membres !", // variable disponible, {user} - Nom d'utilisateur {userTag} - Tag complet de l'utilisateur {userId} - ID de l'utilisateur{userMention} - Mention de l'utilisateur {server} - Nom du serveur {memberCount} - Nombre de membres {createdAt} - Date de création du compte {joinedAt} - Date d'arrivée sur le serveur
        embed: {
          enabled: true,
          title: "👋 Nouveau Membre",
          description: "Bienvenue {userMention} sur **{server}** !\nNous sommes maintenant **{memberCount}** membres !", // variable disponible, {user} - Nom d'utilisateur {userTag} - Tag complet de l'utilisateur {userId} - ID de l'utilisateur{userMention} - Mention de l'utilisateur {server} - Nom du serveur {memberCount} - Nombre de membres {createdAt} - Date de création du compte {joinedAt} - Date d'arrivée sur le serveur
          color: "#00ff00",
          showJoinDate: true,
          showAccountAge: true,
          thumbnail: "{userAvatar}",
          footer: "ID: {userId}"
        }
      },
      dmWelcome: {
        enabled: false,
        useEmbed: true,
        content: "Bienvenue sur {server} ! N'hésite pas à lire le règlement.", // variable disponible, {user} - Nom d'utilisateur {userTag} - Tag complet de l'utilisateur {userId} - ID de l'utilisateur{userMention} - Mention de l'utilisateur {server} - Nom du serveur {memberCount} - Nombre de membres {createdAt} - Date de création du compte {joinedAt} - Date d'arrivée sur le serveur
        embed: {
          title: "Bienvenue sur {server}",
          description: "Salut {user} !\nMerci d'avoir rejoint **{server}** ! ", // variable disponible, {user} - Nom d'utilisateur {userTag} - Tag complet de l'utilisateur {userId} - ID de l'utilisateur{userMention} - Mention de l'utilisateur, {server} - Nom du serveur, {memberCount} - Nombre de membres {createdAt} - Date de création du compte {joinedAt} - Date d'arrivée sur le serveur
          color: "#00ff00"
        }
      }
    },

    goodbye: {
      enabled: false,
      channelId: "CHANNEL_ID",
      useEmbed: true,
      message: {
        content: "Au revoir {userTag} ! 👋\nNous sommes maintenant {memberCount} membres.", // variable disponible, {user} - Nom d'utilisateur {userTag} - Tag complet de l'utilisateur {userId} - ID de l'utilisateur{userMention} - Mention de l'utilisateur {server} - Nom du serveur {memberCount} - Nombre de membres {createdAt} - Date de création du compte {joinedAt} - Date d'arrivée sur le serveur
        embed: {
          enabled: true, 
          title: "👋 Un membre nous a quitté",
          description: "Au revoir **{userTag}** !\nNous sommes maintenant **{memberCount}** membres.", // variable disponible, {user} - Nom d'utilisateur {userTag} - Tag complet de l'utilisateur {userId} - ID de l'utilisateur{userMention} - Mention de l'utilisateur {server} - Nom du serveur {memberCount} - Nombre de membres {createdAt} - Date de création du compte {joinedAt} - Date d'arrivée sur le serveur
          color: "#ff0000",
          showJoinDuration: true,
          showRoles: true,
          thumbnail: "{userAvatar}",
          footer: "ID: {userId}"
        }
      }
    },
  
    // Configuration du statut du bot
    status: {
      state: "dnd", // État du bot : "online" (✅ En ligne), "dnd" (🔴 Ne pas déranger), "idle" (🟡 Inactif), "invisible" (⚫ Hors ligne)
      activities: [
        {
          name: "Starr Alts",
          type: "WATCHING", 
          enabled: true // Activer = true / désactiver = false ce statut
        },
        {
          name: "{members} membres",
          type: "WATCHING",
          enabled: true // Activer = true / désactiver = false ce statut
        },
        {
          name: "{customers} customers",
          type: "WATCHING",
          enabled: true  // Activer = true / désactiver = false ce statut
        },
        {
          name: "{reviews} avis ⭐",
          type: "WATCHING",
          enabled: true // Activer = true / désactiver = false ce statut
        },
        {
          name: "+help",
          type: "PLAYING",
          enabled: true // Activer = true / désactiver = false ce statut
        }
      ],
      interval: 10000 // Intervalle de changement du statut en millisecondes
    },
  
    // Configuration des salons de logs
    logs: {
      accounts: "LOGS_ID",   // Logs des transactions de comptes
      customers: "LOGS_ID", // Logs des nouveaux clients
      stock: "LOGS_ID",      // Logs des modifications de stock
      restock: "LOGS_ID",    // Logs des réapprovisionnements
      welcome: "LOGS_ID", // Logs des arrivées de membres
      goodbye: "LOGS_ID", // Logs des départs de membres
      members: "LOGS_ID",   // Logs généraux des membres
      bans: "LOGS_ID", // Logs des banissements / débanissement des membres et des unbans automatiques
      timeouts: "LOGS_ID", // logs des timeouts
      warns: "LOGS_ID", // logs des warns
    },
  
    // Configuration des messages épinglés par salon
    stickyMessages: {
      reviews: {
        channelId: "CHANNEL_ID",
        message: "__**Message épinglé:**__\n\n**__Nous n'acceptons les avis que dans le format suivant:__**\n\n```+rep [TAGSTAFF] [Combien] [PRODUITS] \n\nExemple:\n+rep @staffping 1x Rockstar```"
      }
    }

  };
