create unique index if not exists application_documents_unique_type_idx
  on public.application_documents (application_id, document_type);
