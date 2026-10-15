/* ====================================================================
   REX héros, données partagées des slides (moteur + vote téléphone)
   Clés = numéro de slide ("0".."18") ou fin ("GO","GO2","FINTADA","FINBOF").
   Chaque slide affiche TOUTES ses options ; certaines peuvent être
   verrouillées (lock(ctx)) selon l'état (nb de cadrages).
   Jauges : Budget ne fait que monter (jours), Tokens descend sur l'IA /
   remonte au cadrage, Santé descend (surtout sur les changements de cap).
   ==================================================================== */
window.REX = {
  site: location.origin,
  firebase: {
    apiKey: "AIzaSyD4cdrYbLHnfykd_4iVKTWS12mT7QeVAbo",
    authDomain: "rexheroes.firebaseapp.com",
    projectId: "rexheroes",
    storageBucket: "rexheroes.firebasestorage.app",
    messagingSenderId: "75737820499",
    appId: "1:75737820499:web:24619eeda46d47509505a6",
    measurementId: "G-2VWJ5MNC50"
  },
  gauges: {
    budget: { label:"Budget",        start:0,   max:20, unit:" j" },
    tokens: { label:"Tokens",        start:100,          unit:"" },
    sante:  { label:"Santé mentale", start:10,           unit:"" }
  },
  cadrageNodes: ["S2","S6","S10","S13"],

  slides: {
    "0": {
      node:"S0", premiere:true,
      kicker:"Chapitre 1 · l'appel de l'aventure", chapitre:"Le brief",
      texte:"La réunion s'achève, les ordinateurs se referment, les regards se croisent : l'aventure commence. L'aéroport vient de vous confier une quête de taille, refondre son module de facturation de fond en comble. Vingt jours de budget, une IA pleine de promesses, votre santé mentale pour seule armure. Désormais, c'est VOUS les héros.",
      question:"Par où commencez-vous ?",
      choix:[
        {code:"S0.1", label:"Réunir l'équipe pour un cadrage et poser une route commune", target:"2", tags:["cadrage"], impacts:{budget:+1, tokens:+10}},
        {code:"S0.2", label:"Le projet est balisé, lancer l'IA sur une première itération", target:"1", tags:[], impacts:{budget:+1, tokens:-5}}
      ]
    },
    "1": {
      node:"S1", kicker:"Chapitre 2 · l'élan", chapitre:"Ça avance vite",
      texte:"L'IA s'appuie sur l'application existante et enchaîne les écrans à toute vitesse. Forte de cette base, elle élargit déjà son champ : propositions annexes, reprise d'écrans périphériques à la facturation. Le périmètre enfle, le design dérive vers quelque chose de plus moderne. Grisant, mais glissant.",
      question:"Comment cadrez-vous cet élan ?",
      choix:[
        {code:"S1.1", label:"Conserver l'ancien design et le chiffrer avec le TechLead", target:"3", tags:[], impacts:{budget:+1, sante:-2}},
        {code:"S1.2", label:"Profiter de la refonte pour adopter le nouveau design", target:"4", tags:["cap"], impacts:{budget:+1, sante:-2, tokens:-5}},
        {code:"S1.3", label:"Acter la direction avec le pilote", target:"2", tags:[], impacts:{budget:+1, tokens:+5}}
      ]
    },
    "2": {
      node:"S2", cadrage:true, kicker:"Cadrer c'est la santé", chapitre:"Bien cadrer le périmètre, une étape indispensable",
      texte:"Le point avec le pilote a tracé la voie : l'IA peut s'en nourrir, et toutes les parties prenantes gardent l'objectif en tête. On refait, mais sans surenchère, en tenant un périmètre raisonnable, les vingt jours en ligne de mire.",
      question:"Comment continue-t-on sur notre lancée ?",
      choix:[
        {code:"S2.1", label:"Générer d'un coup tous les écrans du périmètre", target:"3", tags:[], impacts:{budget:+2, sante:-2, tokens:-5}},
        {code:"S2.2", label:"Itérer pour exploiter le potentiel génératif de l'IA", target:"5", tags:[], impacts:{budget:+3, tokens:-10}}
      ]
    },
    "3": {
      node:"S3", kicker:"Un tournant dans le projet", chapitre:"Le TechLead veut repenser la validation des factures",
      texte:"Le TechLead pose sa vision : un nouveau tunnel pour valider les éléments facturables un par un, facture après facture, au lieu de la liste actuelle. Beaucoup de travail en perspective, mais un vrai bénéfice pour les utilisateurs finaux.",
      question:"Que décidez-vous ?",
      choix:[
        {code:"S3.1", label:"Refaire les écrans à l'IA selon ce nouveau fonctionnement", target:"7", tags:["cap"], impacts:{budget:+1, sante:-2}, lock:c=>c.cadrage<2, lockMsg:"Pas assez cadré pour encaisser ce virage"},
        {code:"S3.2", label:"En discuter dans un point de cadrage", target:"10", tags:[], impacts:{budget:+1, tokens:+5}, lock:c=>c.cadrage<2, lockMsg:"Pas assez cadré pour reprendre la main"},
        {code:"S3.GO", label:"Encore un changement de périmètre, c'en est trop", target:"GO2", tags:[], impacts:{}, lock:c=>c.cadrage>=2, lockMsg:"Vous avez assez cadré pour éviter ça"}
      ]
    },
    "4": {
      node:"S4", kicker:"Chapitre 2 · sans filet", chapitre:"Pas d'UI-Kit, pas de problèmes ?",
      texte:"Le design a changé, mais aucun UI-Kit sur lequel s'appuyer : chaque nouvel écran flotte sans référence ni composant stable. L'IA peine à tenir la cohérence, et la maintenir coûte cher, en temps comme en tokens. C'est joli, mais ça tient avec de la ficelle.",
      question:"Qu'est-ce qu'on fait du design ?",
      choix:[
        {code:"S4.A", label:"Rester calme : un Figma brouillon peut suffire, fragile mais économe", target:"3", tags:[], impacts:{budget:+2, sante:-4, tokens:-10}},
        {code:"S4.B", label:"Faire les choses bien : créer au moins les composants de la refonte", target:"GO", tags:[], impacts:{budget:+20}}
      ]
    },
    "5": {
      node:"S5", kicker:"Chapitre 2 · le frein", chapitre:"L'absence d'UI-Kit et de design system rend l'IA moins fiable",
      texte:"Sans composants ni UI-Kit, l'IA génère à l'aveugle. On a beau lui donner des captures de l'existant et toute la connaissance de la refonte, les générations successives dérivent : chaque passe perd un peu en fidélité.",
      question:"Comment renforcer la qualité de notre production ?",
      choix:[
        {code:"S5.1", label:"Faire un point de cadrage sur le manque de design system", target:"6", tags:[], impacts:{budget:+1, tokens:+5}},
        {code:"S5.2", label:"Avancer sans DS, on industrialisera plus tard", target:"4", tags:["cap"], impacts:{budget:+1, sante:-2}}
      ]
    },
    "6": {
      node:"S6", cadrage:true, kicker:"On tient le cap", chapitre:"Le pilote s'en mêle et propose des solutions",
      texte:"Présent à tous les cadrages, le pilote connaît le sujet sur le bout des doigts : il a de quoi trancher. Mais l'heure est à l'avancée, pas à la tergiversation. Pour verrouiller la faisabilité, faut-il solliciter le TechLead ou faire confiance au PO ? La décision vous revient.",
      question:"Vous suivez quelle piste ?",
      choix:[
        {code:"S6.1", label:"Demander l'avis du TechLead et chiffrer le dev", target:"3", tags:[], impacts:{budget:+1, sante:-2, tokens:+5}},
        {code:"S6.2", label:"Créer seulement les composants de ce module", target:"4", tags:["cap"], impacts:{budget:+3, sante:-2}}
      ]
    },
    "7": {
      node:"S7", kicker:"Nouveau fonctionnement", chapitre:"Proposition technique validée, on rechange l'attendu",
      texte:"La proposition technico-fonctionnelle est actée : on reprend l'attendu et on refait les écrans pour intégrer ce nouveau mécanisme. Ça rebat les cartes, mais le gain pour l'utilisateur final vaut le détour. Alors on fonce.",
      question:"Quand commencer les développements ?",
      choix:[
        {code:"S7.1", label:"Lancer les dev en parallèle sur des modifs de facturation", target:"9", tags:[], impacts:{budget:+4, sante:-2, tokens:-10}},
        {code:"S7.2", label:"Faire patienter le dev, il a d'autres projets", target:"15", tags:[], impacts:{budget:+1}}
      ]
    },
    "9": {
      node:"S9", kicker:"Chapitre 3 · en parallèle", chapitre:"Dev en parallèle des specs",
      texte:"Trop d'allers-retours, trop d'incertitude : ce que les devs produisent et ce qu'exige la refonte ne collent plus. On se marche dessus, et chaque passe creuse l'écart. Une réunion de cadrage s'impose.",
      question:"On fait quoi ?",
      choix:[
        {code:"S9.1", label:"Filer en réunion de cadrage", target:"13", tags:[], impacts:{}},
        {code:"S9.x", label:"Continuer sans recadrer", target:"13", tags:[], impacts:{}, lock:()=>true, lockMsg:"Impossible : trop d'allers-retours pour avancer à l'aveugle"}
      ]
    },
    "10": {
      node:"S10", cadrage:true, kicker:"Chapitre 3 · recadrage", chapitre:"Reprendre les choses en main",
      texte:"Le TechLead a besoin d'y voir clair : où en est le projet, comment avancent les spécifications ? Mettre les choses à plat permet de poser les vraies questions. Les specs ne sont pas prêtes, le module grossit, mais l'équipe, elle, doit continuer d'avancer.",
      question:"Comment occuper les devs ?",
      choix:[
        {code:"S10.1", label:"Tout bloquer, les specs doivent être finalisées d'abord", target:"GO2", tags:[], impacts:{}},
        {code:"S10.2", label:"Lancer des petits sujets de maintenance facturation en attendant", target:"11", tags:[], impacts:{budget:+2, sante:-1}}
      ]
    },
    "11": {
      node:"S11", kicker:"Chapitre 3 · en attendant", chapitre:"Maintenance en parallèle",
      texte:"Les développeurs s'occupent avec de petits retours client sur l'existant, pendant que les specs touchent au but. Mais au moment de tout regrouper, les divergences éclatent : certains sujets déjà traités portent sur des champs, des écrans ou des fonctionnements qui n'existent plus, ou qui ont été entièrement repensés par la refonte.",
      question:"Comment gérer ce problème de scope ?",
      choix:[
        {code:"S11.1", label:"Mélanger les deux, quitte à faire des concessions", target:"9", tags:["cap"], impacts:{budget:+2, sante:-2}},
        {code:"S11.2", label:"Jeter le travail fait, ne garder que le nouveau", target:"14", tags:[], impacts:{budget:+3, sante:-5}},
        {code:"S11.3", label:"Arrêter d'avancer, attendre la spec définitive", target:"15", tags:[], impacts:{budget:+1, sante:-3}}
      ]
    },
    "13": {
      node:"S13", cadrage:true, kicker:"Chapitre 3 · recadrage", chapitre:"Trop d'incertitudes, il faut sécuriser la suite",
      texte:"L'absence de design system et les virages successifs ont fait monter l'incertitude d'un cran. Le budget touche ses limites, et les allers-retours continuent : ce n'est plus tenable.",
      question:"Quelle issue ?",
      choix:[
        {code:"S13.1", label:"Terminer les spécifications", target:"15", tags:[], impacts:{budget:+1, tokens:+5}},
        {code:"S13.x", label:"Utiliser le budget restant", target:"15", tags:[], impacts:{}, lock:()=>true, lockMsg:"Plus de 10 jours déjà consommés : aucune marge"}
      ]
    },
    "14": {
      node:"S14", kicker:"Chapitre 3 · le contrecoup", chapitre:"On a perdu l'avance de la maintenance",
      texte:"On a lancé des travaux de maintenance devenus obsolètes : on accuse le coup, mais il faut vite se recentrer sur la refonte. Tout n'est peut-être pas perdu. On en discute et on avise, les specs doivent se boucler pour mesurer les écarts et ce qui peut être repris.",
      question:"On rattrape comment ?",
      choix:[
        {code:"S14.1", label:"Faire le point avec le pilote sur les écarts", target:"13", tags:[], impacts:{budget:+1, tokens:+5}},
        {code:"S14.2", label:"Attendre la spec finale avant de se lancer", target:"15", tags:[], impacts:{budget:+1}}
      ]
    },
    "15": {
      node:"S15", kicker:"Chapitre 4 · l'atterrissage", chapitre:"Fin des spécifications",
      texte:"Le projet touche à sa fin. L'heure est venue de regarder en arrière et de mesurer comment vous l'avez mené : les cadrages tenus, les virages encaissés, le budget dépensé. Tout se joue maintenant.",
      question:"Comment ça se termine ?",
      choix:[
        {code:"S15.1", label:"Projet bien cadré, atterrissage en souplesse", target:"17", tags:[], impacts:{}, lock:c=>c.cadrage<3, lockMsg:"Il fallait au moins 3 points de cadrage"},
        {code:"S15.2", label:"Pas assez cadré, on termine dans l'urgence", target:"18", tags:[], impacts:{}, lock:c=>c.cadrage>=3, lockMsg:"Vous avez assez cadré pour éviter l'urgence"}
      ]
    },
    "17": {
      node:"S17", kicker:"Chapitre 4 · la dernière porte", chapitre:"Un design system en place ?",
      texte:"Vous touchez au but. Tout se joue sur une question : avez-vous, au fil du projet, posé un vrai design system ?",
      question:"Alors, ce design system ?",
      choix:[
        {code:"S17.1", label:"Oui, un design system est en place", target:"FINTADA", tags:[], impacts:{}},
        {code:"S17.2", label:"Non, pas de design system", target:"FINBOF", tags:[], impacts:{}}
      ]
    },
    "18": {
      node:"S18", kicker:"Chapitre 4 · l'urgence", chapitre:"Il faut terminer",
      texte:"Le budget est presque bouclé. Pas le choix : on termine le projet avec ce qu'on a.",
      question:"On termine comment ?",
      choix:[
        {code:"S18.1", label:"Terminer le projet avec ce qu'on a", target:"FINBOF", tags:[], impacts:{}},
        {code:"S18.x", label:"Repartir sur un cadrage propre", target:"FINBOF", tags:[], impacts:{}, lock:()=>true, lockMsg:"Budget épuisé : trop tard pour recadrer"}
      ]
    },

    "GO": {
      node:"GO", fin:"over", chapitre:"GAME OVER", emoji:"💀",
      titreFin:"Budget épuisé",
      texte:"À vouloir tout faire proprement sans filet, vous avez consommé la totalité du budget avant la livraison. Le projet s'arrête net."
    },
    "GO2": {
      node:"GO2", fin:"over", chapitre:"GAME OVER", emoji:"💀",
      titreFin:"Santé mentale à zéro",
      texte:"Trop de virages, pas assez de cadrage : l'équipe a fini en burn-out. Il faut tout arrêter."
    },
    "FINTADA": {
      node:"FINTADA", fin:"tada", chapitre:"FIN +", emoji:"🎉",
      titreFin:"Mission accomplie",
      texte:"Cadrage solide, design system en place, budget tenu : le module de facturation est livré, propre et durable. Les héros rentrent couverts de gloire."
    },
    "FINBOF": {
      node:"FINBOF", fin:"bof", chapitre:"FIN -", emoji:"🏁",
      titreFin:"C'est livré",
      texte:"Le module est en production, mais au prix de compromis et d'un peu de dette. Ça passe, sans panache. La prochaine fois, on cadrera plus tôt."
    }
  }
};
