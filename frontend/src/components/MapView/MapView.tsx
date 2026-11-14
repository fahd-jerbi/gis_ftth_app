import Map, { Layer, NavigationControl, Source } from "react-map-gl/maplibre";
import type {
  CircleLayerSpecification,
  FillLayerSpecification,
  LineLayerSpecification,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useApp } from "../../context/AppContext";
import { LAYER_CONFIG } from "../../config/layers";
import type { LayerId } from "../../types";

// ─── Layer style builders ─────────────────────────────────────────────────────

function lineStyle(
  color: string,
): Omit<LineLayerSpecification, "id" | "source"> {
  return {
    type: "line",
    paint: { "line-color": color, "line-width": 2.5, "line-opacity": 0.9 },
  };
}

function fillStyle(
  color: string,
): Omit<FillLayerSpecification, "id" | "source"> {
  return {
    type: "fill",
    paint: {
      "fill-color": color,
      "fill-opacity": 0.2,
      "fill-outline-color": color,
    },
  };
}

function circleStyle(
  color: string,
): Omit<CircleLayerSpecification, "id" | "source"> {
  return {
    type: "circle",
    paint: {
      "circle-color": color,
      "circle-radius": 5,
      "circle-stroke-color": "#fff",
      "circle-stroke-width": 1.5,
    },
  };
}

const STYLE_BUILDERS = {
  line: lineStyle,
  fill: fillStyle,
  circle: circleStyle,
} as const;

// ─── Component ───────────────────────────────────────────────────────────────

const OSM_STYLE = {
  version: 8 as const,
  sources: {
    osm: {
      type: "raster" as const,
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "© OpenStreetMap contributors",
    },
  },
  layers: [{ id: "osm-tiles", type: "raster" as const, source: "osm" }],
};

const INITIAL_VIEW = {
  longitude: 9.8642,
  latitude: 37.2744,
  zoom: 12,
};

function MapView() {
  const { state } = useApp();

  return (
    <div className="flex-1 relative overflow-hidden">
      <Map
        initialViewState={INITIAL_VIEW}
        style={{ width: "100%", height: "100%" }}
        mapStyle={OSM_STYLE}
        attributionControl={false}
      >
        <NavigationControl position="bottom-right" />

        {LAYER_CONFIG.map((layerMeta) => {
          const isVisible = state.visibleLayers.has(layerMeta.id);
          const data = state.layerData[layerMeta.id as LayerId];

          if (!isVisible || !data) return null;

          const styleBuilder = STYLE_BUILDERS[layerMeta.type];
          const layerStyle = styleBuilder(layerMeta.color);

          return (
            <Source
              key={layerMeta.id}
              id={layerMeta.id}
              type="geojson"
              data={data}
            >
              <Layer
                id={`${layerMeta.id}-layer`}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                {...(layerStyle as any)}
              />
            </Source>
          );
        })}
      </Map>

      {/* Loading overlay */}
      {state.isLoadingLayers && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10">
          <div className="badge badge-neutral gap-1.5 shadow-md">
            <span className="loading loading-ring loading-xs" />
            <span className="text-xs">Loading layers…</span>
          </div>
        </div>
      )}

      {/* Error toast */}
      {state.error && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
          <div className="alert alert-error py-2 px-4 shadow-lg text-sm max-w-sm">
            <svg
              className="w-4 h-4 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
              />
            </svg>
            <span>{state.error}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default MapView;
