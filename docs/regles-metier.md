# Regles Metier

## 1. Adhesion De Saison

- L'adhesion est geree par saison.
- Un membre doit fournir un certificat medical pour la saison en cours.
- Le certificat n'est pas gere avec une expiration glissante dans l'annee.
- Une nouvelle saison implique une nouvelle adhesion et un nouveau certificat.

## 2. Dossier D'adhesion

Le dossier d'adhesion comprend au minimum:
- informations personnelles demandees par la section
- certificat medical de saison
- acceptation du reglement interieur
- preuve de paiement

Le bureau valide manuellement le dossier.

Statuts possibles du dossier:
- `draft`
- `incomplete`
- `pending_review`
- `changes_requested`
- `approved`
- `rejected`

## 3. Reglement Interieur

- Le reglement doit pouvoir etre consulte dans l'app.
- L'utilisateur doit explicitement l'accepter.
- L'acceptation doit etre horodatee.
- Pour le MVP, une acceptation simple suffit. Une signature electronique avancee n'est pas necessaire.

## 4. Paiement

- Le paiement est realise hors app.
- L'app affiche le RIB de la section et le montant a payer.
- Le candidat depose une preuve de paiement.
- Le bureau confirme manuellement la validite du paiement.
- Le statut de la preuve de paiement est gere comme un document de dossier.

## 5. Activation Membre

- Un utilisateur ne devient `membre_actif` qu'apres validation bureau.
- Techniquement, un dossier `approved` cree ou active une `membership` de statut `active`.
- Tant que l'adhesion n'est pas validee, l'utilisateur ne peut pas reserver ni saisir de records.
- Le passage en mode membre debloque les fonctions sportives.

## 6. Reservation

- Seuls les membres actifs peuvent reserver.
- Une seance a une capacite maximale.
- Un membre peut avoir un quota maximum de reservations actives.
- La valeur par defaut du quota est definie par saison.
- L'annulation n'est autorisee que jusqu'au delai defini par la section.
- Valeur par defaut recommandee pour le MVP: `2` heures avant le debut de seance.
- La liste d'attente est hors MVP et relevee en V2.

## 7. Coach

- Un coach ne voit que les seances qui lui sont assignees.
- Un coach peut voir les inscrits de ses propres seances.
- Un coach n'accede pas aux dossiers d'adhesion ni aux outils bureau.

## 8. Admin

- Un admin voit tous les dossiers d'adhesion.
- Un admin peut valider, refuser ou demander correction.
- Un admin peut gerer les seances, les coachs et les actualites.
- Un admin peut activer, suspendre ou mettre a jour un compte membre selon les regles decidees par le bureau.

## 9. Records

- Les records sont reserves aux membres actifs.
- Le MVP peut commencer avec une saisie simple et un historique personnel.
- Les validations avancees ou classements globaux sont hors perimetre initial.

## 10. Renouvellement De Saison

- Une adhesion est toujours rattachee a une saison.
- A l'ouverture d'une nouvelle saison, un membre de la saison precedente doit redeposer un dossier pour la nouvelle saison.
- Le profil utilisateur reste conserve.
- Le dossier de renouvellement peut etre pre-rempli avec les informations de profil deja connues.
- Le certificat medical et la preuve de paiement doivent etre fournis a nouveau pour la nouvelle saison.
