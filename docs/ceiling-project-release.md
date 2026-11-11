# Chantier plafond — proposition à valider avant mise en production

## État

Branche locale `feat/realisation-plafond`, basée sur le commit main
`4303636071a481029f0bbeef5502c7ec1b6a0d5e`.
Autorisation de diffusion confirmée par l'utilisateur dans cette conversation.
La préparation d'une PR et d'une preview est autorisée ; aucune fusion ni
publication sociale sans validation explicite. Les coordonnées habituelles,
la protection du formulaire et les autres prestations restent inchangées.

## Informations établies par le propriétaire du site

- Rénovation d'un plafond à la suite d'un dégât des eaux.
- Seules des photos après intervention ont été prises.
- Deux fichiers originaux fournis : `1000025025.jpg` et `1000025026.jpg`.
- Commune : Sainte-Anastasie (Gard).
- Réparation du trou et préparation avant mise en peinture.
- Application d'une peinture isolante anti-taches bloquant le fond existant.
- Application d'une peinture de finition mate lessivable.
- Autorisation du propriétaire pour la diffusion des photos confirmée.

## Choix des images

La galerie utilise exclusivement des copies des deux JPEG originaux.
Aucune reconstitution avant travaux et aucune retouche générative n'est
intégrée : ces images ne documentent pas l'état photographié d'origine.
Ne pas les utiliser comme preuve avant/après ni dans les publications.
Les originaux sont préservés, sans changement du contenu ni du cadrage.

## Changements préparés

- Présentation du chantier au-dessus des six illustrations existantes.
- Deux photos complètes, empilées sur petit écran, côte à côte à partir de 640 px.
- Agrandissement via la galerie existante, navigation clavier et fermeture Échap.
- Libellés distincts pour chantier réel/après intervention et illustrations.
- Bouton vers la demande de devis existante, sans nouvelle promesse commerciale.
- Pas de page locale supplémentaire, ni d'avis, délai, prix ou garantie inventé.

## Limites éditoriales

Ne pas annoncer une réparation de la fuite initiale, une conformité, un prix,
une durée ou une garantie de non-réapparition des taches. Ces éléments ne sont
pas établis. Aucun lien commercial vers du remplacement de cumulus n'est ajouté.

## Validation

Informations et accord de diffusion confirmés : pousser la branche,
ouvrir une PR, contrôler la preview Vercel, demander
la validation de fusion, puis vérifier la production READY après fusion.
Ne pas fusionner ni publier des posts sans validation explicite.

Les créneaux des publications sont des essais éditoriaux, pas des horaires
optimaux démontrés par des statistiques de la page.

## Contrôles locaux

- Galerie : 5 scénarios d'intégration + test parent passent.
- Formulaire : 25 tests existants passent, aucun envoi réel effectué.
- TypeScript et lint des fichiers modifiés passent.
- Build Next.js 16.3.0 / React 19.2.4, versions identiques au lockfile : passe
  avec `next build --webpack`.
- Identité SHA-256 des deux JPEG copiés et de leurs originaux vérifiée.
- Aperçu local : non vérifié visuellement (le lanceur fourni passe des options
  Vite incompatibles avec le script Next.js existant). Ne pas changer le script
  de l'application pour cette seule limitation d'environnement.
- La vérification visuelle doit se faire sur la preview Vercel de la PR.
