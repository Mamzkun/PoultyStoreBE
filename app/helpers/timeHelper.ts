export function toLocalTime(time: Date) {
  const timestamp = Date.parse(time.toString());
  const timezone = time.getTimezoneOffset() * 60 * 1000;
  return new Date(timestamp - timezone);
}
