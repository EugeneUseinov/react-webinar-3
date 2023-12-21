export default function dateParser(
  value,
  locale = "ru-RU",
  options = {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }
) {
  const formatDate = new Date(value);
  return new Intl.DateTimeFormat(locale, options).format(formatDate).replace('г. в','в');
}