const MAIN_URL = "https://v5.db.transport.rest/";

const getStationsUrl = (station) => `${MAIN_URL}locations?query=${station}`;

const getSearchUrl = ({ origin, destination, date }) =>
  `${MAIN_URL}journeys?from=${origin}&to=${destination}&departure=${date}&results=5'`;

export async function fetchStations(query) {
  if (!query) return;
  try {
    const response = await fetch(getStationsUrl(query));
    const data = response.json()
    console.log("data", data)
    return data;
  } catch (err) {
    throw new Error
  }
}

export async function searchRoute({ origin, destination, date }, options) {
  // console.log({origin, destination, date})
  if (!origin || !destination || !date) return;
  try {
    const response = await fetch(
      getSearchUrl({ origin, destination, date }),
      options
    );
    const data = await response.json();
    return data?.journeys;
  } catch (err) {
    throw new Error;
  }
}
