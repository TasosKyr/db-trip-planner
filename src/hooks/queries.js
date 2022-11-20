import { useQuery } from "@tanstack/react-query";
import { searchRoute, getStations } from "src/lib/api"

const SEARCH_QUERY_KEY = "search-route";
const STATIONS_QUERY_KEY = "get-station"

export function useSearch({originId, destinationId, date}) {
  const {data, isFetching, isError, error, refetch} = useQuery({
    queryKey: [SEARCH_QUERY_KEY, {originId, destinationId, date}],
    queryFn: searchRoute({originId, destinationId, date}),
    enabled: false, 
  });

  return {searchResults: data, isFetching, isError, error, search: refetch}
}

export function useStations({query}) {
  const {data, isFetching, isError, error, refetch} = useQuery({
    queryKey: [STATIONS_QUERY_KEY, {query}],
    queryFn: getStations({query}),
    enabled: false, 
  });

  return {stationId: data, fetchStation: refetch}
}