export function getTimeFromDate(date: string) {
  // First argument set to 'default' to use user's browser settings (showing PM/AM)
  const withPmAm = new Date(date).toLocaleTimeString("default", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return withPmAm;
}

export function getDateDifference({
  departure,
  arrival,
}: {
  departure: string;
  arrival: string;
}) {
  const diffDate = Math.abs(
    new Date(departure).valueOf() - new Date(arrival).valueOf()
  );
  let days = diffDate / (24 * 60 * 60 * 1000);
  let hours = (days % 1) * 24;
  let minutes = (hours % 1) * 60;
  return [Math.round(days), Math.round(hours), Math.round(minutes)];
}

export function getPrice(price: number | undefined) {
  return price ? price + "€" : "Fare is not available";
}

export function getCurrentDate() {
  const currentDate = new Date().toISOString();
  return currentDate.substring(0, currentDate.lastIndexOf(':'));
};