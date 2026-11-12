export interface Project {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

export type LayerId =
  | "ducts"
  | "subducts"
  | "pop_areas"
  | "dp_areas"
  | "dps"
  | "houses";

export interface LayerMeta {
  id: LayerId;
  label: string;
  color: string;
  type: "line" | "fill" | "circle";
}

// ======================================================

export interface GeoJSONFeatureCollection {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
}

export interface GeoJSONFeature {
  type: "Feature";
  geometry: GeoJSONGeometry;
  properties: Record<string, unknown>;
}

export type GeoJSONGeometry =
  | { type: "LineString"; coordinates: [number, number][] }
  | { type: "Polygon"; coordinates: [number, number][] }
  | { type: "Point"; coordinates: [number, number] };

// ======================================================
export interface AppState {
  projects: Project[];
  selectedProjectId: number | null;
  visibleLayers: Set<LayerId>;
  layerData: Partial<Record<LayerId, GeoJSONFeatureCollection>>;
  isLoadingProjects: boolean;
  isLoadingLayers: boolean;
  error: string | null;
}

export type AppAction =
  | { type: "SET_PROJECTS"; payload: Project[] }
  | { type: "SELECT_PROJECT"; payload: number }
  | { type: "TOGGLE_LAYER"; payload: LayerId }
  | {
      type: "SET_LAYER_DATA";
      payload: { layerId: LayerId; data: GeoJSONFeatureCollection };
    }
  | { type: "SET_LOADING_PROJECTS"; payload: boolean }
  | { type: "SET_LOADING_LAYERS"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null };
