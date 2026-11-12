import type { GeoJSONFeatureCollection, LayerId, Project } from "../types";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/api";

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  return res.json() as Promise<T>;
}

// ======================================================

export const fetchProjects = (): Promise<Project[]> =>
  get<Project[]>("/projects/");

// ======================================================

const LAYER_PATHS: Record<LayerId, string> = {
  ducts: "/ducts/",
  subducts: "/subducts/",
  pop_areas: "/pop-areas/",
  dp_areas: "/dp-areas/",
  dps: "/dps/",
  houses: "/houses/",
};

export const fetchLayer = (
  layerId: LayerId,
  projectId: number,
): Promise<GeoJSONFeatureCollection> =>
  get<GeoJSONFeatureCollection>(`${LAYER_PATHS[layerId]}?project=${projectId}`);
