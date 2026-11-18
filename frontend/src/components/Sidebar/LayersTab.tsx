import { useApp } from "../../context/AppContext";
import { LAYER_CONFIG } from "../../config/layers";
import type { LayerId } from "../../types";

const TYPE_ICON: Record<"line" | "fill" | "circle", string> = {
  line: "─",
  fill: "▪",
  circle: "●",
};

function LayersTab() {
  const { state, dispatch } = useApp();

  const toggle = (id: LayerId) =>
    dispatch({ type: "TOGGLE_LAYER", payload: id });

  if (state.selectedProjectId === null) {
    return (
      <div className="flex flex-col items-center justify-center h-40 gap-2 opacity-50">
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
          />
        </svg>
        <p className="text-xs text-center">
          Select a project to see its layers
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 py-2">
      {LAYER_CONFIG.map((layer) => {
        const isVisible = state.visibleLayers.has(layer.id);
        const hasData = !!state.layerData[layer.id];

        return (
          <label
            key={layer.id}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-base-200 transition-colors group"
          >
            <input
              type="checkbox"
              className="checkbox checkbox-primary checkbox-sm"
              checked={isVisible}
              onChange={() => toggle(layer.id)}
            />

            {/* Color + type indicator */}
            <span
              className="text-sm font-bold leading-none shrink-0"
              style={{ color: layer.color }}
            >
              {TYPE_ICON[layer.type]}
            </span>

            <span className="text-sm flex-1">{layer.label}</span>

            {/* Loading / data indicator */}
            {isVisible && state.isLoadingLayers && !hasData && (
              <span className="loading loading-dots loading-xs opacity-40" />
            )}
            {hasData && (
              <span className="text-xs opacity-30 font-mono">
                {state.layerData[layer.id]!.features.length}
              </span>
            )}
          </label>
        );
      })}
    </div>
  );
}

export default LayersTab;
