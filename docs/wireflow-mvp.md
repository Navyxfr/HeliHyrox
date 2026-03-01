# Wireflow MVP

## Objectif

Definir les ecrans du MVP et les transitions principales entre eux selon:
- le statut d'adhesion
- le role applicatif

## 1. Parcours Public

### Ecrans

- `PublicHome`
- `AboutSection`
- `MembershipInfo`
- `Login`
- `Register`
- `EmailVerificationPending`

### Transitions

- `PublicHome` -> `AboutSection`
- `PublicHome` -> `MembershipInfo`
- `PublicHome` -> `Login`
- `PublicHome` -> `Register`
- `Register` -> `EmailVerificationPending`
- `EmailVerificationPending` -> `CandidateDashboard`
- `Login` -> redirection selon statut utilisateur

## 2. Parcours Candidat

### Ecrans

- `CandidateDashboard`
- `ApplicationForm`
- `MedicalCertificateUpload`
- `RulesView`
- `RulesAcceptance`
- `PaymentInfo`
- `PaymentProofUpload`
- `ApplicationStatus`

### Logique

Le tableau de bord candidat affiche:
- progression du dossier
- elements manquants
- actions prioritaires

### Transitions

- `CandidateDashboard` -> `ApplicationForm`
- `CandidateDashboard` -> `MedicalCertificateUpload`
- `CandidateDashboard` -> `RulesView`
- `RulesView` -> `RulesAcceptance`
- `CandidateDashboard` -> `PaymentInfo`
- `PaymentInfo` -> `PaymentProofUpload`
- `CandidateDashboard` -> `ApplicationStatus`

### Sorties de parcours

- si dossier incomplet: retour sur `CandidateDashboard`
- si dossier soumis: passage vers etat `en_attente`
- si dossier valide par admin: redirection vers `MemberHome`

## 3. Parcours En Attente

### Ecrans

- `PendingDashboard`
- `ApplicationStatus`
- `CorrectionRequestDetail`

### Logique

Cet espace remplace le tableau de bord candidat quand le dossier est en `pending_review`.

### Transitions

- `PendingDashboard` -> `ApplicationStatus`
- `PendingDashboard` -> `CorrectionRequestDetail` si correction demandee
- `CorrectionRequestDetail` -> `CandidateDashboard`

### Sorties de parcours

- si correction demandee: l'utilisateur revient dans le parcours `candidate`
- si dossier valide: redirection `MemberHome`
- si dossier refuse: affichage d'un statut refuse avec consigne bureau

## 4. Parcours Membre

### Navigation principale

Tab bar recommandee:
- `MemberHome`
- `Planning`
- `News`
- `Profile`
- `CoachSessions` si role `coach`

Le module records peut etre integre au profil en MVP.

### Ecrans

- `MemberHome`
- `Planning`
- `SessionDetail`
- `MyBookings`
- `NewsList`
- `NewsDetail`
- `Profile`
- `MembershipStatus`
- `Records`
- `AddRecord`

### Transitions

- `MemberHome` -> `Planning`
- `MemberHome` -> `MyBookings`
- `MemberHome` -> `NewsDetail`
- `Planning` -> `SessionDetail`
- `Planning` -> action `BookSession`
- `MyBookings` -> action `CancelBooking`
- `NewsList` -> `NewsDetail`
- `Profile` -> `MembershipStatus`
- `Profile` -> `Records`
- `Records` -> `AddRecord`

## 5. Parcours Coach

### Principe

Le coach conserve l'experience membre et obtient un acces supplementaire.

### Ecrans

- `CoachSessions`
- `CoachSessionDetail`
- `CoachAttendeesList`

### Transitions

- `MemberHome` -> `CoachSessions` si role `coach`
- `CoachSessions` -> `CoachSessionDetail`
- `CoachSessionDetail` -> `CoachAttendeesList`

### Contraintes

- le coach ne voit que ses seances assignees
- il n'accede pas aux dossiers d'adhesion

## 6. Parcours Admin

## Recommandation

Back-office web dedie plutot qu'un espace admin mobile complet.

### Ecrans

- `AdminDashboard`
- `ApplicationsList`
- `ApplicationDetail`
- `MembersList`
- `MemberDetail`
- `SessionsList`
- `SessionEdit`
- `CoachAssignments`
- `NewsAdminList`
- `NewsEditor`
- `SeasonSettings`

### Transitions

- `AdminDashboard` -> `ApplicationsList`
- `ApplicationsList` -> `ApplicationDetail`
- `AdminDashboard` -> `MembersList`
- `AdminDashboard` -> `SessionsList`
- `SessionsList` -> `SessionEdit`
- `SessionEdit` -> `CoachAssignments`
- `AdminDashboard` -> `NewsAdminList`
- `NewsAdminList` -> `NewsEditor`
- `AdminDashboard` -> `SeasonSettings`

## 7. Redirections Selon Statut

### Apres connexion

- `public` sans dossier -> `CandidateDashboard` ou `PublicHome` selon contexte
- `candidate` -> `CandidateDashboard`
- `pending_member` -> `PendingDashboard`
- `member_active` -> `MemberHome`
- `suspended` -> `Profile` avec blocage des fonctions sportives

### Apres validation admin

- `PendingDashboard` -> `MemberHome`

## 8. Parcours Renouvellement De Saison

### Principe

Un membre actif de la saison N peut devoir lancer une nouvelle adhesion pour la saison N+1.

### Ecrans

- `SeasonRenewalPrompt`
- `CandidateDashboard`
- `ApplicationForm`
- `MedicalCertificateUpload`
- `PaymentInfo`
- `PaymentProofUpload`

### Transitions

- `MemberHome` -> `SeasonRenewalPrompt` quand une nouvelle saison est ouverte et aucune adhesion active n'existe pour cette saison
- `SeasonRenewalPrompt` -> `CandidateDashboard`
- `CandidateDashboard` pre-remplit le profil connu

### Apres suspension

- l'utilisateur garde l'acces a son profil
- les ecrans de reservation deviennent non accessibles

## 9. Etats Critiques A Designer

Ces etats doivent avoir un ecran ou composant dedie:

- dossier incomplet
- dossier en attente
- dossier a corriger
- adhesion refusee
- adhesion validee
- aucune seance disponible
- seance complete
- quota de reservations atteint
- annulation non autorisee
- compte suspendu

## 10. Ecrans Prioritaires A Designer En Premier

Ordre recommande:
1. `PublicHome`
2. `CandidateDashboard`
3. `ApplicationForm`
4. `PaymentInfo`
5. `PendingDashboard`
6. `MemberHome`
7. `Planning`
8. `SessionDetail`
9. `Profile`
10. `ApplicationsList` et `ApplicationDetail`
