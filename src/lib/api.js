const MAIN_URL = "https://v5.db.transport.rest/";

const getStationsUrl = (station) => `${MAIN_URL}locations?query=${station}`;

const getSearchUrl = ({ origin, destination, date }) =>
  `${MAIN_URL}journeys?from=${origin}&to=${destination}&departure=${date}&results=5'`;

export async function fetchStations(query) {
  if (!query) return;
  try {
    const response = await fetch(getStationsUrl(query));
    // console.log(response.json())
    return response.json();
  } catch (err) {
    throw new Error
  }
}

export async function searchRoute({ originId, destinationId, date }, options) {
  // console.log({originId, destinationId, date})
  if (!originId || !destinationId || !date) return;
  try {
    const response = await fetch(
      getSearchUrl({ originId, destinationId, date }),
      options
    );
    const data = await response.json();
    return data?.journeys;
  } catch (err) {
    throw new Error;
  }
}
