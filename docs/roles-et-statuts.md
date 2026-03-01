# Roles Et Statuts

## Principe

Le systeme distingue:
- le statut d'adhesion: ou en est l'utilisateur dans son parcours
- le role applicatif: quels droits il possede

Convention retenue:
- noms techniques en anglais dans la base et le code
- libelles francais dans l'interface

## Mapping Technique / Interface

### Statuts de candidature

| Technique | Interface FR | Usage |
| --- | --- | --- |
| `draft` | Brouillon | dossier commence mais non structurant |
| `incomplete` | Incomplet | informations ou pieces manquantes |
| `pending_review` | En attente de validation | dossier soumis au bureau |
| `changes_requested` | A corriger | correction demandee par le bureau |
| `approved` | Valide | dossier approuve |
| `rejected` | Refuse | dossier refuse |

### Statuts d'experience utilisateur derives

| Technique derivee | Interface FR | Regle |
| --- | --- | --- |
| `public` | Public | aucun dossier actif |
| `candidate` | Candidat | dossier `draft`, `incomplete` ou `changes_requested` |
| `pending_member` | En attente | dossier `pending_review` |
| `member_active` | Membre actif | adhesion active |
| `suspended` | Suspendu | adhesion suspendue |

## Statuts d'experience utilisateur

### `public`

Utilisateur non connecte ou sans dossier actif.

Droits:
- consulter les pages publiques
- creer un compte
- se connecter
- commencer une adhesion

### `candidat`

Utilisateur connecte avec un dossier en cours de constitution.

Droits:
- completer son dossier
- deposer les pieces demandees
- consulter le reglement
- accepter le reglement
- voir le RIB
- deposer une preuve de paiement

Ce statut couvre les dossiers techniques:
- `draft`
- `incomplete`
- `changes_requested`

### `pending_member`

Dossier soumis ou quasi complet, en attente de traitement bureau.

Droits:
- consulter l'etat du dossier
- voir les elements manquants ou demandes de correction
- redeposer une piece si necessaire

Ce statut couvre le dossier technique:
- `pending_review`

### `member_active`

Adhesion validee pour la saison en cours.

Droits:
- acceder aux fonctions membre
- reserver
- consulter les actualites internes
- saisir des records

### `suspended`

Compte temporairement bloque.

Droits:
- acces limite au profil et aux informations administratives
- impossibilite de reserver

## Roles applicatifs

### `member`

Role standard d'un adherent actif.

### `coach`

Role reserve aux coachs encadrants.

Permissions supplementaires:
- voir uniquement les seances assignees
- voir la liste des inscrits de ses seances

### `admin`

Role reserve aux membres du bureau.

Permissions supplementaires:
- valider les adhesions
- gerer les seances
- gerer les actualites
- affecter les coachs
- administrer les membres

## Matrice simplifiee

| Capacite | Public | Candidat | En attente | Membre | Coach | Admin |
| --- | --- | --- | --- | --- | --- | --- |
| Voir contenu public | Oui | Oui | Oui | Oui | Oui | Oui |
| Creer un compte | Oui | Non | Non | Non | Non | Non |
| Completer dossier adhesion | Non | Oui | Oui | Non | Non | Non |
| Voir RIB / montant | Non | Oui | Oui | Non | Non | Oui |
| Deposer preuve de paiement | Non | Oui | Oui | Non | Non | Non |
| Voir statut dossier | Non | Oui | Oui | Oui | Oui | Oui |
| Reserver une seance | Non | Non | Non | Oui | Oui | Oui |
| Saisir un record | Non | Non | Non | Oui | Oui | Oui |
| Voir seances assignees | Non | Non | Non | Non | Oui | Oui |
| Voir inscrits d'une seance | Non | Non | Non | Non | Oui, sessions assignees | Oui, toutes |
| Valider une adhesion | Non | Non | Non | Non | Non | Oui |
| Gerer seances / actus | Non | Non | Non | Non | Non | Oui |
