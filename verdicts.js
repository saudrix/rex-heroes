/* ====================================================================
   REX héros, verdicts affichés en pop-up sur la carte des opérations.
   Clé = code d'un choix (ex. "S1.2") ou d'une slide sans choix (ex. "S9").
   verdict : "succes", "echec" ou "a-venir" (pastille grise). note : ce que le projet nous a appris.
   Seules les cases du parcours affiché qui ont un verdict ici deviennent
   cliquables (pastille ✓ ou ✗).
   ==================================================================== */
window.REX_VERDICTS = {
  "S2":  { verdict:"succes", note:"L'IA peut tout générer, et dériver tout aussi vite. Plus sa puissance grandit, plus le cadrage devient vital : il compte désormais plus encore qu'avant." },
  "S5":  { verdict:"succes", choix:"S'appuyer sur le design system existant pour gagner du temps", note:"Un projet tenu en bon état stabilise l'IA. L'UI Kit devient une arme indispensable : sans lui, confier durablement les petits sujets de maintenance à l'IA sera de plus en plus difficile." },
  "S11": { verdict:"echec", choix:"Mélanger maintenance et évolutions sur le même sujet", note:"Mêler maintenance et évolution, c'est du temps perdu. Avec l'IA pour accélérateur, le périmètre peut basculer bien plus fort, qu'on le veuille ou non. Raison de plus pour attendre un périmètre entièrement spécifié avant de lancer les devs. Cela demande de la souplesse dans les opérations et le planning, et une communication sans faille." },
  "S15": { verdict:"succes", choix:"Boucler les spécifications avant de lancer les devs", note:"Retarder au maximum le lancement des développements. Cadrer par les spécifications, quitte à y intégrer la conception technique. Et cadrer en équipe : c'est la condition pour qu'une IA en mode exploratoire serve vraiment le besoin." },
  "BOF": { verdict:"a-venir", note:"Dépassement des 20 jours de budget, contenu à venir." },
  // "S1.2": { verdict:"echec",  note:"Exemple : changer le design sans design system nous a coûté cher en reprises." },
  // "S11.1":{ verdict:"succes", note:"Exemple : mêler maintenance et nouvelles specs a gardé l'équipe en mouvement." },
};
