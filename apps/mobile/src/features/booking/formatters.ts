export function formatTimeLabel(isoString: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(isoString));
}

export function formatDateLabel(isoString: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "short",
    day: "numeric",
    month: "short"
  }).format(new Date(isoString));
}
