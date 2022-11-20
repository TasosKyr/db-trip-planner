import { useQuery } from "@tanstack/react-query";
import { searchRoute } from "src/lib/api"

const SEARCH_QUERY_KEY = "search-route";


export function useSearch({origin, destination, date}) {
  const {data, isFetching, isError, error, refetch} = useQuery({
    queryKey: [SEARCH_QUERY_KEY, {origin, destination, date}],
    queryFn: searchRoute({origin, destination, date}),
    enabled: false, 
    cacheTime: 300_000 // Clear cache after 5 mins
  });

  return {data, isFetching, isError, error, refetch}
}