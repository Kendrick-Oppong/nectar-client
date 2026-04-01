import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "@/lib/constants/api-endpoints";
import { api } from "@/lib/api/axios";
import { ZonesResponse } from "@/types/location";
import { QUERY_KEYS } from "@/lib/constants/query-keys";

export function useZones() {
  return useQuery({
    queryKey: QUERY_KEYS.ZONES,
    queryFn: async () => {
      const { data } = await api.get<ZonesResponse>(
        API_ENDPOINTS.LOCATIONS.GET_ZONES,
      );
      return data.zones;
    },
  });
}
