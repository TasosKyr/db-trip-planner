import {
  useQuery,
} from "@tanstack/react-query";
import { searchRoute } from "src/lib/api";
import { SearchParams } from "src/types"

const SEARCH_QUERY_KEY = "search-route";

const getSearchConfig = ({
  originId,
  destinationId,
  date,
}: SearchParams) => ({
  queryKey: [SEARCH_QUERY_KEY, { originId, destinationId, date }],
  queryFn: searchRoute({ originId, destinationId, date }),
  enabled: false,
  refetchOnWindowFocus: false,
  })

export function useSearch({ originId, destinationId, date }: SearchParams) {
  //TODO: fix type error with parameter of type 'QueryKey' from react-query
  //@ts-ignore
  const { data, isLoading, isError, error, refetch } = useQuery(getSearchConfig({ originId, destinationId, date }));

  return { searchResults: data, isError, error, search: refetch };
}
