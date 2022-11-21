import { useQuery } from "@tanstack/react-query";
import { searchRoute, getStations } from "src/lib/api"

const SEARCH_QUERY_KEY = "search-route";
const ORIGIN_STATIONS_KEY = "get-origin-stations"
const DESTINATION_STATIONS_KEY = "get-destination-stations"

export function useSearch({originId, destinationId, date}) {
  const {data, isLoading, isError, error, refetch} = useQuery({
    queryKey: [SEARCH_QUERY_KEY, {originId, destinationId, date}],
    queryFn: searchRoute({originId, destinationId, date}),
    enabled: false, 
    refetchOnWindowFocus: false
  });

  return {searchResults: data,  isError, error, search: refetch}
}

export function useOriginStations({origin}) {
  console.log({origin})
  const {data, isLoading, isError, error, refetch} = useQuery({
    queryKey: [ORIGIN_STATIONS_KEY, origin],
    queryFn: getStations(origin),
    enabled: false, 
    refetchOnWindowFocus: false
  });
console.log({data})
  return {originSuggestions: data, fetchOriginStation: refetch}
}

export function useDestinationStations({destination}) {
  const {data, isLoading, isError, error, refetch} = useQuery({
    queryKey: [DESTINATION_STATIONS_KEY, destination],
    queryFn: getStations(destination),
    enabled: false, 
    refetchOnWindowFocus: false
  });
  
  return {destinationSuggestions: data, fetchDestinationStation: refetch}
}