export interface Area {
  id: string;
  name: string;
  zoneId: string;
  isActive: boolean;
  sortOrder: number;
}

export interface Zone {
  id: string;
  name: string;
  isActive: boolean;
  sortOrder: number;
  areas: Area[];
}

export interface UpdateLocationData {
  zoneId: string;
  areaId: string;
}

export interface ZonesResponse {
  zones: Zone[];
}
