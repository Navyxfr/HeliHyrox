# Architecture Technique

## Objectif

Definir une architecture simple, maintenable et adaptee au MVP HeliHyrox:
- application mobile publique
- parcours d'adhesion avec depot de documents
- espace membre
- espace coach
- back-office admin

## Recommandation

### Front mobile

- `React Native`
- `Expo`
- `TypeScript`
- `Expo Router`

Pourquoi:
- un seul codebase iOS / Android
- bon compromis vitesse / maintenabilite
- publication store simplifiee avec Expo

### Back-office admin

- application web simple
- `Next.js`
- `TypeScript`

Pourquoi:
- plus pratique pour le bureau sur desktop
- plus simple pour consulter et valider les dossiers
- routing, middleware et pages admin plus standardises

### Backend

- `Supabase`

Services utilises:
- Auth
- Postgres
- Storage
- Row Level Security

Pourquoi:
- tres bon fit pour MVP CRUD + fichiers + roles
- mise en place rapide
- bonne base pour evoluer sans surcomplexifier

## Architecture D'ensemble

### Clients

- app mobile publique
- back-office web admin

### Services centraux

- authentification
- API de lecture / ecriture
- base relationnelle
- stockage de documents

### Donnees sensibles

- certificat medical
- preuve de paiement
- informations personnelles d'adhesion

Ces donnees doivent etre protegees par permissions strictes cote backend.

## Couches Applicatives

### Mobile

Structure recommandee:

- `app/` ou `src/app/`: navigation et ecrans
- `src/features/`: modules fonctionnels
- `src/components/`: composants UI partages
- `src/services/`: acces API, auth, upload
- `src/store/`: etat global leger si necessaire
- `src/theme/`: couleurs, typo, spacing
- `src/types/`: types metier

Features recommandees:
- `auth`
- `onboarding`
- `membership`
- `news`
- `booking`
- `records`
- `profile`
- `coach`

### Back-office

Structure recommandee:

- `pages/` ou `app/`
- `features/admin-memberships`
- `features/admin-members`
- `features/admin-sessions`
- `features/admin-news`
- `features/admin-settings`

## Authentification

### MVP

- email + mot de passe
- verification email recommandee
- reset mot de passe

### Gestion des acces

L'UI ne suffit pas.

Les droits doivent etre appliques:
- cote base de donnees
- cote API
- cote stockage fichiers

Modele minimal:
- un utilisateur authentifie
- un statut d'adhesion
- un role applicatif

## Verification Email

- la verification email fait partie du MVP
- un utilisateur nouvellement inscrit passe par un etat `EmailVerificationPending`
- l'acces au dossier d'adhesion n'est ouvert qu'apres verification

## Stockage Des Documents

Documents a stocker:
- certificat medical
- preuve de paiement
- autres pieces si necessaire

Recommandations:
- stockage par buckets prives
- chemins organises par saison et utilisateur
- acces limite a l'utilisateur concerne et aux admins

Exemple de chemin:
- `memberships/{seasonId}/{userId}/medical-certificate.pdf`
- `memberships/{seasonId}/{userId}/payment-proof.jpg`

## Notifications

### MVP

- notifications in-app simples
- emails transactionnels si necessaire

Exemples:
- dossier recu
- dossier a corriger
- adhesion validee
- reservation confirmee
- annulation confirmee

### V2

- push mobile Expo / Firebase / APNS

## Strategie Offline MVP

- lecture seule du planning et des actualites les plus recentes via cache local
- aucune creation ou modification offline
- si le reseau est indisponible, l'utilisateur peut consulter le dernier planning synchronise
- les actions de reservation, depot de dossier et upload exigent une connexion

## Regles De Securite

- aucun controle de role uniquement cote client
- documents prives non publics
- acces coach limite a ses seances
- acces admin reserve aux comptes autorises
- journalisation minimale des validations admin

## RLS Supabase A Prevoir

Tables prioritaires:
- `membership_applications`: lecture/edition par proprietaire, lecture/edition complete par admin
- `application_documents`: lecture par proprietaire, coach interdit, admin autorise
- `memberships`: lecture par proprietaire, lecture globale admin
- `bookings`: lecture/creation/annulation par proprietaire membre actif, lecture par coach sur sessions assignees, lecture globale admin
- `session_coaches`: lecture par coach concerne et admin
- `news_posts`: lecture publique selon visibilite, edition admin
- `notifications`: lecture par proprietaire, creation systeme/admin

## Observabilite MVP

- logs d'erreurs front
- logs backend sur validations importantes
- suivi des uploads echoues
- suivi des reservations refusees

## Environnements

- `dev`
- `staging`
- `prod`

Variables critiques:
- URL backend
- cle publique frontend
- configuration stockage
- configuration email

## Strategie De Livraison

### Phase 1

- doc produit
- architecture technique
- schema de donnees

### Phase 2

- projet Expo initialise
- design system minimal
- navigation
- auth

### Phase 3

- parcours adhesion
- back-office admin

### Phase 4

- espace membre
- planning / reservations
- espace coach

### Phase 5

- tests
- stabilisation
- publication stores

## Choix A Valider Rapidement

- niveau exact de notifications email dans le MVP
- liste finale des pieces d'adhesion
