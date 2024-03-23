export function dateFormatter(date: Date) {
  if (!date) {
    return;
  }
  date = new Date(date);
  let dateFormatted = new Intl.DateTimeFormat(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date.getTime() + Math.abs(date.getTimezoneOffset() * 60000));
  return dateFormatted;
}
