import type { LayerMeta } from "../types";

export const LAYER_CONFIG: LayerMeta[] = [
  { id: "ducts", label: "Ducts", color: "#f97316", type: "line" },
  { id: "subducts", label: "Sub-ducts", color: "#fb923c", type: "line" },
  { id: "pop_areas", label: "POP Areas", color: "#3b82f6", type: "fill" },
  { id: "dp_areas", label: "DP Areas", color: "#8b5cf6", type: "fill" },
  { id: "dps", label: "DPs", color: "#22c55e", type: "circle" },
  { id: "houses", label: "Houses", color: "#ec4899", type: "circle" },
];

export const DEFAULT_VISIBLE: Set<import("../types").LayerId> = new Set([
  "ducts",
  "pop_areas",
  "dps",
  "houses",
]);
