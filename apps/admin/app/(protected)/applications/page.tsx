import { applicationStatusLabels } from "@helihyrox/shared";
import { updateApplicationStatus } from "@/lib/actions";
import { getApplications } from "@/lib/adminData";

export default async function ApplicationsPage() {
  const { items: applications, error } = await getApplications();

  return (
    <main className="page-shell">
      <h1 className="page-title">Demandes d'adhesion</h1>
      {error ? <p className="form-error">{error}</p> : null}
      <div className="stack">
        {applications.map((application) => (
          <section className="panel" key={application.id}>
            <div className="row-between">
              <div>
                <h2>{application.applicantName}</h2>
                <p className="muted">{application.contactLabel}</p>
                <p className="muted">Saison {application.seasonLabel}</p>
              </div>
              <span className="status-pill">
                {applicationStatusLabels[
                  application.status as keyof typeof applicationStatusLabels
                ] ?? application.status}
              </span>
            </div>
            <div className="check-grid">
              <span>Reglement : {application.rulesAccepted ? "OK" : "Manquant"}</span>
              <span>Certificat : {application.medicalCertificate ? "OK" : "Manquant"}</span>
              <span>Paiement : {application.paymentProof ? "OK" : "Manquant"}</span>
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
                <option value="pending_review">{applicationStatusLabels.pending_review}</option>
                <option value="changes_requested">
                  {applicationStatusLabels.changes_requested}
                </option>
                <option value="approved">{applicationStatusLabels.approved}</option>
                <option value="rejected">{applicationStatusLabels.rejected}</option>
              </select>
              <textarea name="reviewComment" placeholder="Commentaire bureau" rows={3} />
              <button className="primary-action" type="submit">
                Enregistrer la decision
              </button>
            </form>
          </section>
        ))}
      </div>
    </main>
  );
}
