/* ====================================================================
   REX héros, données partagées des slides (moteur + vote téléphone)
   Clés = numéro de slide ("0".."18") ou fin ("GO","GO2","FINTADA","FINBOF").
   Un choix pointe vers une clé cible. Textes provisoires, à affiner.
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
  cadrageNodes: ["S2","S6","S10","S13"],   // slides qui comptent comme un cadrage

  slides: {
    "0": {
      node:"S0", cadrage:false, premiere:true,
      kicker:"Chapitre 1 · l'appel de l'aventure", chapitre:"Le brief",
      texte:"La réunion vient de s'achever et le verdict tombe : le module de facturation de l'aéroport doit être refait, de fond en comble. Vingt jours de budget, une IA pleine de promesses, votre santé mentale pour seule armure. Désormais, c'est VOUS les héros.",
      question:"Par où commencez-vous ?",
      choix:[
        {code:"S0.1", label:"Réunir l'équipe pour un vrai cadrage", target:"2", tags:["cadrage"], impacts:{budget:+1, tokens:+10}},
        {code:"S0.2", label:"Lancer tout de suite une itération exploratoire avec l'IA", target:"1", tags:[], impacts:{budget:+1, tokens:-5}}
      ]
    },
    "1": {
      node:"S1", kicker:"Chapitre 2 · l'élan", chapitre:"Ça avance vite",
      texte:"L'IA crache des écrans à toute vitesse. Le périmètre enfle, le design dérive vers quelque chose de plus moderne. Grisant, mais glissant.",
      question:"Comment cadrez-vous cet élan ?",
      choix:[
        {code:"S1.1", label:"Maintenir l'ancien design, rester sobre", target:"3", tags:[], impacts:{budget:+1, sante:-2}},
        {code:"S1.2", label:"Changer le design, sans design system", target:"4", tags:["cap"], impacts:{}},
        {code:"S1.3", label:"Faire un point avec le pilote sur le périmètre", target:"2", tags:[], impacts:{tokens:+10}}
      ]
    },
    "2": {
      node:"S2", cadrage:true, kicker:"Chapitre 2 · cap tenu", chapitre:"Le périmètre est cadré",
      texte:"Le cadrage a payé : l'IA est bien orientée, tout le monde sait où l'on va. Reste à produire.",
      question:"On enchaîne comment ?",
      choix:[
        {code:"S2.1", label:"Générer l'ensemble des écrans", target:"3", tags:[], impacts:{budget:+1, sante:-2}},
        {code:"S2.2", label:"Itérer encore un peu pour voir", target:"5", tags:[], impacts:{budget:+5}}
      ]
    },
    "3": {
      node:"S3", kicker:"Chapitre 3 · le carrefour", chapitre:"Le TechLead propose le tunnel",
      texte:"Le TechLead monte au créneau : refaire la validation des factures sous forme de tunnel. Mais l'équipe a-t-elle assez cadré pour encaisser un virage de plus ?",
      question:"Que décidez-vous ?",
      gate:(c)=> c.cadrage < 2 ? {target:"GO2", why:"Trop de changements de cap sans cadrage suffisant : l'équipe part en burn-out."} : null,
      choix:[
        {code:"S3.1", label:"On écoute le dev, refonte en tunnel", target:"7", tags:["cap"], impacts:{}},
        {code:"S3.2", label:"Réunion de cadrage suite aux demandes du TechLead", target:"10", tags:[], impacts:{}}
      ]
    },
    "4": {
      node:"S4", kicker:"Chapitre 2 · sans filet", chapitre:"Design changé, pas de composants",
      texte:"Vous avez changé le design sans design system. Les écrans sont jolis mais tout est à la main, et le budget commence à chauffer.",
      question:"On gère comment ?",
      choix:[
        {code:"S4.A", label:"Rester calme, assumer un Figma brouillon", target:"3", tags:[], impacts:{budget:+1, sante:-4, tokens:-10}},
        {code:"S4.B", label:"Faire des composants propres, coûte que coûte", target:"GO", tags:[], impacts:{}}
      ]
    },
    "5": {
      node:"S5", kicker:"Chapitre 2 · le frein", chapitre:"L'absence de design system ralentit",
      texte:"Sans bibliothèque de composants, chaque écran se négocie au cas par cas. Ça traîne.",
      question:"On débloque comment ?",
      choix:[
        {code:"S5.1", label:"Point avec le pilote", target:"6", tags:[], impacts:{}},
        {code:"S5.2", label:"Changer sans le DS existant", target:"4", tags:["cap"], impacts:{}}
      ]
    },
    "6": {
      node:"S6", cadrage:true, kicker:"Chapitre 2 · cap tenu", chapitre:"Le pilote propose",
      texte:"Le pilote remet de l'ordre et pose les options sur la table.",
      question:"Vous suivez quelle piste ?",
      choix:[
        {code:"S6.1", label:"Point avec le TechLead sur le périmètre", target:"3", tags:[], impacts:{budget:+1, sante:-2}},
        {code:"S6.2", label:"Créer des composants dédiés à ce module", target:"4", tags:["cap"], impacts:{budget:+2}}
      ]
    },
    "7": {
      node:"S7", kicker:"Chapitre 3 · le tunnel", chapitre:"On s'aligne sur le TechLead",
      texte:"Cap sur le tunnel de validation. Les specs se précisent, mais les devs piaffent.",
      question:"On lance les devs quand ?",
      choix:[
        {code:"S7.1", label:"Dev en parallèle des specs, maintenant", target:"9", tags:[], impacts:{budget:+4, sante:-2, tokens:-10}},
        {code:"S7.2", label:"Attendre la fin des specs", target:"15", tags:[], impacts:{}}
      ]
    },
    "9": {
      node:"S9", kicker:"Chapitre 3 · en parallèle", chapitre:"Dev en parallèle des specs",
      texte:"Les devs avancent pendant que les specs bougent encore. Les allers-retours se multiplient, il faut recadrer.",
      forcedTarget:"13", forcedWhy:"Trop d'allers-retours : direction une réunion de cadrage.",
      forcedLabel:"Filer en réunion de cadrage →"
    },
    "10": {
      node:"S10", cadrage:true, kicker:"Chapitre 3 · recadrage", chapitre:"Réunion de cadrage",
      texte:"Le TechLead a demandé à clarifier. On pose les choses, mais le temps file.",
      question:"On fait quoi des devs pendant ce temps ?",
      choix:[
        {code:"S10.1", label:"Bloquer les devs en attendant plus d'info", target:"GO2", tags:[], impacts:{}},
        {code:"S10.2", label:"Démarrer la maintenance en attendant les specs", target:"11", tags:[], impacts:{budget:-5}}
      ]
    },
    "11": {
      node:"S11", kicker:"Chapitre 3 · en attendant", chapitre:"Maintenance en parallèle",
      texte:"Les devs occupent le terrain avec des sujets de maintenance pendant que les specs se terminent.",
      question:"Comment vous organisez-vous ?",
      choix:[
        {code:"S11.1", label:"Mélanger dev existant et nouvelles specs", target:"9", tags:["cap"], impacts:{budget:+2, sante:-1}},
        {code:"S11.2", label:"Ignorer la maintenance, on perd l'avance", target:"14", tags:[], impacts:{budget:+4, sante:-5}},
        {code:"S11.3", label:"Attendre la fin des specs, le dev ne fait rien", target:"15", tags:[], impacts:{sante:-5}}
      ]
    },
    "13": {
      node:"S13", cadrage:true, kicker:"Chapitre 3 · recadrage", chapitre:"Réunion de cadrage",
      texte:"Trop d'allers-retours : on remet tout le monde autour de la table. Mais le budget est ric-rac.",
      forcedTarget:"15", forcedWhy:"Une seule issue : terminer les spécifications.",
      forcedLabel:"Vers la fin des specs →"
    },
    "14": {
      node:"S14", kicker:"Chapitre 3 · le contrecoup", chapitre:"On a perdu l'avance de la maintenance",
      texte:"En lâchant la maintenance, on a perdu le bénéfice. Il faut se resynchroniser.",
      question:"On rattrape comment ?",
      choix:[
        {code:"S14.1", label:"Point d'équipe de régulation", target:"13", tags:[], impacts:{}},
        {code:"S14.2", label:"Attendre enfin la fin des specs", target:"15", tags:[], impacts:{}}
      ]
    },
    "15": {
      node:"S15", kicker:"Chapitre 4 · l'atterrissage", chapitre:"Fin des spécifications",
      texte:"Les specs sont bouclées. Le dénouement dépend désormais de tout ce que vous avez cadré en route.",
      gate:(c)=> c.cadrage >= 3
        ? {target:"17", why:"Vous avez assez cadré ("+c.cadrage+" points) : l'atterrissage se prépare bien."}
        : {target:"18", why:"Trop peu de cadrage ("+c.cadrage+" points) : il va falloir terminer dans l'urgence."},
      forcedLabel:"Dernière ligne droite →"
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
      forcedTarget:"FINBOF", forcedWhy:"On livre, mais sans éclat.",
      forcedLabel:"Terminer le projet →"
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
      node:"FINTADA", fin:"tada", chapitre:"FIN · version TADA", emoji:"🎉",
      titreFin:"Mission accomplie",
      texte:"Cadrage solide, design system en place, budget tenu : le module de facturation est livré, propre et durable. Les héros rentrent couverts de gloire."
    },
    "FINBOF": {
      node:"FINBOF", fin:"bof", chapitre:"FIN · version BOF", emoji:"🏁",
      titreFin:"C'est livré",
      texte:"Le module est en production, mais au prix de compromis et d'un peu de dette. Ça passe, sans panache. La prochaine fois, on cadrera plus tôt."
    }
  }
};
