# Bannière de consentement sans recouvrement

## Demande

Éviter que la bannière masque les photos, textes et commandes, notamment sur
petit écran, sans choisir à la place du visiteur.

## Mise en œuvre

- Emplacement dans le flux de la page, immédiatement après l'espace réservé
  au menu fixe. Pas de positionnement `fixed`, `absolute` ni `sticky`.
- Le composant global conserve les scripts et le choix existants. Seul le
  bandeau est rendu dans l'emplacement du Header par un portail React.
- L'emplacement est renouvelé après une navigation client vers une autre page.
- Texte raccourci, choix accepter/refuser de même taille et lien de confidentialité.
- La page reste consultable en défilant sans choix préalable ; aucun accord
  n'est enregistré par le simple affichage, le défilement ou la réouverture.
- Bouton « Gérer mes cookies » dans le flux, en bas de page : réaffiche le
  bandeau et y place le focus uniquement à la demande du visiteur.
- Aucune modification du formulaire, de ses clés, des scripts Analytics ou
  des domaines de production autorisés à charger Google Analytics.

## Tests

`npm run test:consent` contrôle le placement, l'absence de chargement avant
accord, le refus, l'acceptation explicite, l'exclusion des previews, la
réouverture avec focus et le changement d'emplacement après navigation.
Ces interactions de consentement ont lieu dans un DOM de test isolé, jamais
dans le navigateur réel de l'utilisateur.

La vérification visuelle doit confirmer le rendu en haut de page et l'absence
de superposition lors de la consultation des photos, sans cliquer sur les
choix du visiteur. Fusion de la PR #28 uniquement après validation.
