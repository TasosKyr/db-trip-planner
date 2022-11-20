export class ApiError extends Error {
  constructor(url, status) {
    super(`'${url}' returned ${status}`);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
    this.name = "ApiError";
    this.status = status;
  }
}

const MAIN_URL = "https://v5.db.transport.rest/";

const getStationsUrl = (station) => `${MAIN_URL}locations?query=${station}`;

const getSearchUrl = ({ origin, destination, date }) =>
  `${MAIN_URL}journeys?from=${origin}&to=${destination}&departure=${date}&results=5'`;

export async function getStations(query, options) {
  console.log(getStationsUrl(query))
  try {
    const response = await fetch(getStationsUrl(query), options);
    const data = await response.json();
    console.log(data)
    return data
  } catch (err) {
    throw new ApiError(url, response.status);
  }
}

export async function searchRoute({ originId, destinationId, date }, options) {
  // console.log({originId, destinationId, date})
  try {
    const response = await fetch(
      getSearchUrl({ originId, destinationId, date }),
      options
    );
    const data = await response.json();
    return data?.journeys;
  } catch (err) {
    throw new ApiError(url, response.status);
  }
}
