/* ====================================================================
   REX héros, verdicts affichés en pop-up sur la carte des opérations.
   Clé = code d'un choix (ex. "S1.2") ou d'une slide sans choix (ex. "S9").
   verdict : "succes", "echec" ou "a-venir" (pastille grise). note : ce que le projet nous a appris.
   Seules les cases du parcours affiché qui ont un verdict ici deviennent
   cliquables (pastille ✓ ou ✗).
   ==================================================================== */
window.REX_VERDICTS = {
  "S2":  { verdict:"a-venir", note:"Réunion de cadrage initiale, contenu à venir." },
  "S5":  { verdict:"a-venir", note:"Recours à un design system existant pour gagner du temps, contenu à venir." },
  "S11": { verdict:"a-venir", note:"Maintenance en parallèle, contenu à venir." },
  "S15": { verdict:"a-venir", note:"Fin des spécifications, contenu à venir." },
  "BOF": { verdict:"a-venir", note:"Dépassement des 20 jours de budget, contenu à venir." },
  // "S1.2": { verdict:"echec",  note:"Exemple : changer le design sans design system nous a coûté cher en reprises." },
  // "S11.1":{ verdict:"succes", note:"Exemple : mêler maintenance et nouvelles specs a gardé l'équipe en mouvement." },
};
