# HomeAToutFaire Android

Application Android 1.0.0 : carnet local de petits travaux, sept prestations, photos préparées sur l’appareil, export et partage explicite de dossiers ZIP, contacts. Aucun compte client, serveur de photos, paiement intégré, publicité ou suivi d’audience natif.

Le contenu et le composant du carnet sont partagés avec `/application` sur le site. L’APK embarque le code, les polices et le portrait ; il ne charge pas le site dans une WebView distante. Notes et photos sont conservées en IndexedDB dans le stockage de l’application. Les coordonnées et liens réseau ne sont ouverts qu’à la demande.

## Construire

À la racine : `npm ci`, `npm run test:mobile`, `npm run android:prepare`.

Puis, avec Java 21 et le SDK Android API 36 installés : `cd mobile/android` et `bash gradlew assembleDebug bundleRelease lintDebug --no-daemon`.

Le projet Android est régénérable avec le CLI Capacitor verrouillé dans package-lock.json. Les sources natives générées, caches, fichiers de signature et binaires restent hors Git. Le script de configuration applique le logo existant, la politique HTTPS, l’absence de sauvegarde automatique et une identité distincte pour les essais.

La chaîne GitHub Actions produit :

- un APK d’essai, identifiant `fr.homeatoutfaire30.app.preview`, signé avec la clé de développement du runner ;
- un AAB de production **non signé**, identifiant `fr.homeatoutfaire30.app` ;
- le rapport Android Lint et les empreintes SHA-256.

L’APK d’essai n’est pas une version de production et sa clé peut changer entre compilations. Exporter ses dossiers avant une désinstallation ou un changement de version d’essai. Ne pas l’envoyer sur Google Play. La version publique demande une clé d’import pérenne gardée hors du dépôt et Play App Signing.

## Publication restant sous le compte du propriétaire

Google Play : compte développeur vérifié au nom de Thibaut/son entreprise, frais d’inscription Google, acceptation des accords, clé d’import et déclaration de confidentialité/Data Safety. Certains comptes personnels récents nécessitent un test fermé avant la demande d’accès production. Le premier AAB doit être associé au bon identifiant, signé et testé sur un appareil réel avant soumission. L’acceptation de la boutique n’est jamais garantie par la compilation.

Pour le téléchargement public direct : publier uniquement un APK de production signé de façon pérenne, avec son numéro de version et son empreinte. La page web ne doit pas annoncer de disponibilité Google Play tant qu’une fiche publique n’existe pas. Aucune clé privée ne doit être ajoutée à Git, aux artefacts ou au site.

## Limites de vérification

Les tests Node utilisent IndexedDB simulé. L’interface web est vérifiée sur le site public ; cela ne remplace pas un essai Android réel pour la caméra, le sélecteur, le bouton Retour, le partage et les changements d’état de l’application. La confirmation d’envoi reste dans l’application de partage choisie : le carnet n’invente pas de demande reçue, rendez-vous ou statut de chantier.

Les projets locaux ne sont pas synchronisés. Leur archivage est réversible ; l’effacement des données Android ou une désinstallation les supprime. Les exports ZIP sont des copies de récapitulatifs et photos, pas des sauvegardes réimportables du carnet.
