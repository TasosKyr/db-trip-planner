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

const SEARCH_URL =
  "https://v5.db.transport.rest/journeys?from=8011113&to=8010159&departure=tomorrow+2pm&results=2'";

export async function searchRoute({origin, destination, date}, options) {
  console.log({origin, destination, date})
  try {
    const response = await fetch(SEARCH_URL, options);
    const data = await response.json()
    return data?.journeys;
  } catch (err) {
    throw new ApiError(url, response.status);
  }
}
