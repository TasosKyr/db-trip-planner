import { SearchParams } from "src/types";
const MAIN_URL = "https://v5.db.transport.rest/";

const getStationsUrl = (station: string) =>
  `${MAIN_URL}locations?query=${station}`;

const getSearchUrl = ({ originId, destinationId, date }: SearchParams) =>
  `${MAIN_URL}journeys?from=${originId}&to=${destinationId}&departure=${date}&results=5'`;

export async function fetchStations(query: string) {
  if (!query) return;
  try {
    const response = await fetch(getStationsUrl(encodeURIComponent(query)));
    const data = response.json();
    console.log("data", data);
    return data;
  } catch (err) {
    throw new Error();
  }
}

export async function searchRoute({
  originId,
  destinationId,
  date,
}: SearchParams) {
  // console.log({origin, destination, date})
  if (!originId || !destinationId || !date) return;
  try {
    const response = await fetch(
      getSearchUrl({ originId, destinationId, date })
    );
    const data = await response.json();
    return data?.journeys;
  } catch (err) {
    throw new Error();
  }
}
