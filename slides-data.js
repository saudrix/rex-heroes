/* ====================================================================
   REX héros, données partagées des slides (moteur + vote téléphone)
   Une slide = un numéro. Les choix pointent vers un numéro cible.
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
    budget: { label:"Budget",        start:0,   max:20, unit:" j", sens:"monte" },
    tokens: { label:"Tokens",        start:100,          unit:"",  sens:"descend" },
    sante:  { label:"Santé mentale", start:10,           unit:"",  sens:"descend" }
  },
  slides: {
    0: {
      node: "S0",
      kicker: "Chapitre 1 · l'appel de l'aventure",
      chapitre: "Le brief",
      texte: "La réunion vient de s'achever et le verdict tombe : le module de facturation de l'aéroport doit être refait, de fond en comble. Les factures s'empilent, le vieil outil rend l'âme, et tous les regards se tournent vers vous. Vingt jours de budget, une IA pleine de promesses, et votre santé mentale pour seule armure. Désormais, c'est VOUS les héros de ce chantier.",
      question: "Première décision : par où commencez-vous ?",
      premiere: true,
      choix: [
        { code:"S0.1", label:"Réunir l'équipe pour un vrai cadrage", target:2, tags:["cadrage"], impacts:{budget:+1, tokens:+10} },
        { code:"S0.2", label:"Lancer tout de suite une itération exploratoire avec l'IA", target:1, tags:[], impacts:{budget:+1, tokens:-5} }
      ]
    }
  }
};
window.REX.nodeOf = n => "S" + n;
