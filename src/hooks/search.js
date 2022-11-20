import { useQuery } from "@tanstack/react-query";
import { searchRoute } from "src/lib/api"

const SEARCH_QUERY_KEY = "search-route";

export function useSearch() {
  const {data, isLoading, isError, error, refetch} = useQuery({
    queryKey: [SEARCH_QUERY_KEY],
    queryFn: async () => {
      try {
        const res = await fetch(
          "https://v5.db.transport.rest/journeys?from=8011113&to=8010159&departure=tomorrow+2pm&results=2'"
        );
        const data = await res.json();
        return data;
      } catch (err) {
        console.log({ err });
      }
    },
    enabled: false, 
    refetchOnWindowFocus: false,
    cacheTime: 300_000 // Clear cache after 5 mins
  });

  return {data, isLoading, isError, error, refetch}
}