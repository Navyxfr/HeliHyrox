# Modele De Donnees

## Objectif

Definir un schema metier MVP clair pour:
- adhesion de saison
- reservations
- actualites
- records
- affectations coach
- administration

## Principes

- une adhesion est rattachee a une saison
- le certificat medical est rattache a la saison
- la validation bureau est manuelle
- les roles applicatifs sont separes du statut d'adhesion

## Entites Principales

### `users`

Compte technique d'authentification.

Champs minimaux:
- `id`
- `email`
- `password_auth_provider`
- `created_at`
- `updated_at`

### `profiles`

Profil utilisateur.

Champs minimaux:
- `id`
- `user_id`
- `first_name`
- `last_name`
- `phone`
- `date_of_birth`
- `emergency_contact_name`
- `emergency_contact_phone`
- `employee_identifier` si necessaire
- `is_public_profile` optionnel
- `created_at`
- `updated_at`

### `seasons`

Reference de saison.

Champs minimaux:
- `id`
- `label`
- `starts_at`
- `ends_at`
- `membership_fee_cents`
- `max_active_bookings`
- `default_cancellation_deadline_hours`
- `rib_label`
- `rib_iban`
- `rib_bic`
- `rules_document_url`
- `is_active`

### `membership_applications`

Dossier d'adhesion de saison.

Champs minimaux:
- `id`
- `user_id`
- `season_id`
- `status`
- `submitted_at`
- `validated_at`
- `validated_by`
- `review_comment`
- `rules_accepted_at`
- `created_at`
- `updated_at`

Statuts recommandes:
- `draft`
- `incomplete`
- `pending_review`
- `changes_requested`
- `approved`
- `rejected`

### `application_documents`

Pieces rattachees a une adhesion.

Champs minimaux:
- `id`
- `application_id`
- `document_type`
- `storage_path`
- `status`
- `uploaded_at`
- `reviewed_at`
- `reviewed_by`
- `review_comment`

Types recommandes:
- `medical_certificate`
- `payment_proof`
- `other`

Statuts recommandes:
- `uploaded`
- `accepted`
- `rejected`

Principe retenu:
- le certificat medical et la preuve de paiement sont tous deux geres comme documents
- aucun statut dedie `payment_status` n'est porte par `membership_applications`

### `memberships`

Adhesion active ou historique.

Champs minimaux:
- `id`
- `user_id`
- `season_id`
- `application_id`
- `status`
- `activated_at`
- `ended_at`

Statuts recommandes:
- `active`
- `suspended`
- `expired`
- `cancelled`

### `user_roles`

Roles applicatifs.

Champs minimaux:
- `id`
- `user_id`
- `role`
- `created_at`

Roles recommandes:
- `member`
- `coach`
- `admin`

### `news_posts`

Actualites section.

Champs minimaux:
- `id`
- `title`
- `summary`
- `content`
- `cover_image_url`
- `visibility`
- `published_at`
- `created_by`
- `updated_at`

### `sessions`

Seances sportives.

Champs minimaux:
- `id`
- `season_id`
- `session_type`
- `title`
- `starts_at`
- `ends_at`
- `capacity`
- `location`
- `status`
- `booking_opens_at`
- `booking_closes_at`
- `cancellation_deadline_at`
- `created_by`

Statuts recommandes:
- `scheduled`
- `cancelled`
- `completed`

### `session_coaches`

Affectation coach / seance.

Champs minimaux:
- `id`
- `session_id`
- `user_id`
- `assigned_at`
- `assigned_by`

### `bookings`

Reservations membres.

Champs minimaux:
- `id`
- `session_id`
- `user_id`
- `status`
- `booked_at`
- `cancelled_at`
- `cancel_reason`

Statuts recommandes:
- `confirmed`
- `cancelled`
- `no_show`

### `movements`

Referentiel des mouvements de records.

Champs minimaux:
- `id`
- `key`
- `label`
- `unit`
- `is_active`

### `records`

Historique des performances personnelles.

Champs minimaux:
- `id`
- `user_id`
- `movement_id`
- `value`
- `value_label`
- `performed_on`
- `created_at`

Contrainte:
- `movement_id` doit referencer `movements.id`

### `notifications`

Notifications in-app MVP.

Champs minimaux:
- `id`
- `user_id`
- `type`
- `title`
- `body`
- `is_read`
- `created_at`
- `read_at`

## Relations Principales

- `users` 1 -> 1 `profiles`
- `users` 1 -> n `membership_applications`
- `users` 1 -> n `memberships`
- `users` 1 -> n `user_roles`
- `membership_applications` 1 -> n `application_documents`
- `membership_applications` 1 -> 1 `memberships` apres validation
- `seasons` 1 -> n `membership_applications`
- `seasons` 1 -> n `memberships`
- `seasons` 1 -> n `sessions`
- `sessions` 1 -> n `bookings`
- `sessions` 1 -> n `session_coaches`
- `movements.id` 1 -> n `records.movement_id`
- `users` 1 -> n `notifications`

## Contraintes Metier Importantes

- un utilisateur ne doit avoir qu'une adhesion active par saison
- une seule candidature active par utilisateur et par saison
- seuls les membres actifs peuvent avoir une reservation `confirmed`
- seuls les coaches affectes voient les inscrits d'une seance
- seuls les admins valident une adhesion

## Derivations Utiles

Statut utilisateur calcule:
- `public`: pas de candidature active
- `candidate`: candidature en `draft`, `incomplete` ou `changes_requested`
- `pending_member`: candidature en `pending_review`
- `member_active`: membership `active`
- `suspended`: membership `suspended`

## Questions A Trancher

- faut-il stocker l'employee identifier des la candidature
- faut-il historiser les validations admin en audit log dedie
