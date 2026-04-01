import { api } from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/lib/constants/api-endpoints";
import { UpdateLocationData } from "@/types/location";

export const locationMutationsApi = {
  updateProfile: async (data: UpdateLocationData) => {
    const response = await api.patch(
      API_ENDPOINTS.LOCATIONS.UPDATE_PROFILE,
      data,
    );
    return response.data;
  },
};
