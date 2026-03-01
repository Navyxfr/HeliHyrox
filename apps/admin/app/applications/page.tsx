import { updateApplicationStatus } from "@/lib/actions";
import { getApplications } from "@/lib/adminData";

export default async function ApplicationsPage() {
  const applications = await getApplications();

  return (
    <main className="page-shell">
      <h1 className="page-title">Demandes d'adhesion</h1>
      <div className="stack">
        {applications.map(
          (application: Awaited<ReturnType<typeof getApplications>>[number]) => (
          <section className="panel" key={application.id}>
            <div className="row-between">
              <div>
                <h2>{application.applicantName}</h2>
                <p className="muted">{application.email}</p>
                <p className="muted">Saison {application.seasonLabel}</p>
              </div>
              <span className="status-pill">{application.status}</span>
            </div>
            <div className="check-grid">
              <span>Reglement: {application.rulesAccepted ? "OK" : "Manquant"}</span>
              <span>Certificat: {application.medicalCertificate ? "OK" : "Manquant"}</span>
              <span>Paiement: {application.paymentProof ? "OK" : "Manquant"}</span>
            </div>
            <form action={updateApplicationStatus} className="admin-form">
              <input name="applicationId" type="hidden" value={application.id} />
              <select defaultValue={application.status} name="status">
                <option value="pending_review">pending_review</option>
                <option value="changes_requested">changes_requested</option>
                <option value="approved">approved</option>
                <option value="rejected">rejected</option>
              </select>
              <textarea
                name="reviewComment"
                placeholder="Commentaire bureau"
                rows={3}
              />
              <button className="primary-action" type="submit">
                Enregistrer la decision
              </button>
            </form>
          </section>
          )
        )}
      </div>
    </main>
  );
}
