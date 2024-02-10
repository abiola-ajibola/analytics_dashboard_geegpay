import { useQuery } from "@tanstack/react-query";
import { getRequest } from "../getRequest";

export function useApi({ endpoint, queryKey }) {
  return useQuery({
    queryKey,
    queryFn: () => getRequest(endpoint),
    staleTime: Infinity,
    refetchOnMount: false,
  });
}
