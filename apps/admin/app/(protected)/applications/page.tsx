import { updateApplicationStatus } from "@/lib/actions";
import { getApplications } from "@/lib/adminData";

const statusLabels = {
  pending_review: "En attente",
  changes_requested: "Correction demandée",
  approved: "Validé",
  rejected: "Refusé",
  draft: "Brouillon",
  incomplete: "Incomplet"
} as const;

export default async function ApplicationsPage() {
  const applications = await getApplications();

  return (
    <main className="page-shell">
      <h1 className="page-title">Demandes d’adhésion</h1>
      <div className="stack">
        {applications.map(
          (application: Awaited<ReturnType<typeof getApplications>>[number]) => (
            <section className="panel" key={application.id}>
              <div className="row-between">
                <div>
                  <h2>{application.applicantName}</h2>
                  <p className="muted">{application.contactLabel}</p>
                  <p className="muted">Saison {application.seasonLabel}</p>
                </div>
                <span className="status-pill">
                  {statusLabels[application.status as keyof typeof statusLabels] ?? application.status}
                </span>
              </div>
              <div className="check-grid">
                <span>Règlement : {application.rulesAccepted ? "OK" : "Manquant"}</span>
                <span>Certificat: {application.medicalCertificate ? "OK" : "Manquant"}</span>
                <span>Paiement: {application.paymentProof ? "OK" : "Manquant"}</span>
              </div>
              <div className="document-links">
                {application.medicalCertificateUrl ? (
                  <a
                    className="nav-link"
                    href={application.medicalCertificateUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Voir le certificat
                  </a>
                ) : null}
                {application.paymentProofUrl ? (
                  <a
                    className="nav-link"
                    href={application.paymentProofUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Voir la preuve de paiement
                  </a>
                ) : null}
              </div>
              <form action={updateApplicationStatus} className="admin-form">
                <input name="applicationId" type="hidden" value={application.id} />
                <select defaultValue={application.status} name="status">
                  <option value="pending_review">En attente</option>
                  <option value="changes_requested">Correction demandée</option>
                  <option value="approved">Validé</option>
                  <option value="rejected">Refusé</option>
                </select>
                <textarea
                  name="reviewComment"
                  placeholder="Commentaire bureau"
                  rows={3}
                />
                <button className="primary-action" type="submit">
                  Enregistrer la décision
                </button>
              </form>
            </section>
          )
        )}
      </div>
    </main>
  );
}
