# Architecture Fonctionnelle

## Principe General

L'application doit proposer une experience differenciee selon le statut et le role de l'utilisateur.

Flux principal:
- public -> creation de compte -> dossier d'adhesion -> validation admin -> membre actif

## Espaces Applicatifs

### 1. Espace Public

Objectif:
- presenter la section
- expliquer l'adhesion
- convertir vers la creation de compte

Ecrans:
- accueil public
- presentation de la section
- infos adhesion
- tarif et modalites
- connexion / creation de compte

### 2. Espace Candidat

Objectif:
- guider l'utilisateur jusqu'a un dossier complet

Ecrans:
- tableau de bord candidature
- formulaire dossier
- depot certificat
- consultation / acceptation reglement
- infos paiement et RIB
- depot preuve de paiement
- suivi du statut

### 3. Espace Membre

Objectif:
- donner acces a la vie sportive de la section

Ecrans:
- accueil membre
- actualites
- detail actualite
- planning
- mes reservations
- profil / statut administratif
- records

### 4. Espace Coach

Objectif:
- permettre au coach de preparer et encadrer ses seances

Ecrans:
- mes seances assignees
- detail seance
- liste des inscrits

### 5. Espace Admin

Objectif:
- permettre au bureau de piloter l'activite

Ecrans:
- tableau de bord admin
- demandes d'adhesion
- detail dossier
- membres
- seances
- affectation coachs
- actualites
- parametrage saison

## Navigation MVP

### Navigation publique

- Accueil
- Adhesion
- Connexion

### Navigation membre

Tab bar recommandee:
- Accueil
- Planning
- Actualites
- Profil

Le module `Records` peut etre:
- soit un ecran du profil
- soit un 5e onglet si la valeur percue est forte

### Navigation coach

Le coach conserve l'espace membre mais dispose en plus d'un acces `Mes seances`.

### Navigation admin

L'administration sera plus simple a exploiter via un back-office web dedie qu'au sein de l'app mobile.

## Recommandation De Mise En Oeuvre

- App mobile publique pour public, candidats, membres et coachs
- Back-office web pour les admins

Cette separation limite la complexite mobile et facilite le travail du bureau.
