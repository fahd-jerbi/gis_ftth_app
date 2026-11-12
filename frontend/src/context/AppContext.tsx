import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import { DEFAULT_VISIBLE } from "../config/layers";
import type { AppAction, AppState, LayerId } from "../types";
import { fetchLayer, fetchProjects } from "../services/api";

const initialState: AppState = {
  projects: [],
  selectedProjectId: null,
  visibleLayers: DEFAULT_VISIBLE,
  layerData: {},
  isLoadingLayers: false,
  isLoadingProjects: false,
  error: null,
};

// ===========================================================================

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_PROJECTS":
      return { ...state, projects: action.payload };

    case "SELECT_PROJECT":
      return {
        ...state,
        selectedProjectId: action.payload,
        layerData: {}, // clear stale layer data on project change
      };

    case "TOGGLE_LAYER": {
      const next = new Set(state.visibleLayers);
      next.has(action.payload)
        ? next.delete(action.payload)
        : next.add(action.payload);
      return { ...state, visibleLayers: next };
    }

    case "SET_LAYER_DATA":
      return {
        ...state,
        layerData: {
          ...state.layerData,
          [action.payload.layerId]: action.payload.data,
        },
      };

    case "SET_LOADING_PROJECTS":
      return { ...state, isLoadingProjects: action.payload };

    case "SET_LOADING_LAYERS":
      return { ...state, isLoadingLayers: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload };

    default:
      return state;
  }
}

// ===========================================================================

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  loadLayer: (layerId: LayerId) => Promise<void>;
}

const AppContext = createContext<AppContextValue | null>(null);

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}

// ─── Provider ────────────────────────────────────────────────────────────────

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load project list on mount
  useEffect(() => {
    dispatch({ type: "SET_LOADING_PROJECTS", payload: true });
    fetchProjects()
      .then((projects) => {
        dispatch({ type: "SET_PROJECTS", payload: projects });
        // Auto-select first project
        if (projects.length > 0) {
          dispatch({ type: "SELECT_PROJECT", payload: projects[0].id });
        }
      })
      .catch((err: unknown) =>
        dispatch({ type: "SET_ERROR", payload: String(err) }),
      )
      .finally(() =>
        dispatch({ type: "SET_LOADING_PROJECTS", payload: false }),
      );
  }, []);

  // Fetch visible layers whenever selected project or visibleLayers changes
  useEffect(() => {
    const { selectedProjectId, visibleLayers } = state;
    if (selectedProjectId === null) return;

    dispatch({ type: "SET_LOADING_LAYERS", payload: true });

    const fetches = [...visibleLayers].map((layerId) =>
      fetchLayer(layerId, selectedProjectId)
        .then((data) =>
          dispatch({ type: "SET_LAYER_DATA", payload: { layerId, data } }),
        )
        .catch((err: unknown) =>
          dispatch({ type: "SET_ERROR", payload: String(err) }),
        ),
    );

    Promise.allSettled(fetches).finally(() =>
      dispatch({ type: "SET_LOADING_LAYERS", payload: false }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.selectedProjectId, state.visibleLayers]);

  const loadLayer = async (layerId: LayerId) => {
    if (state.selectedProjectId === null) return;
    const data = await fetchLayer(layerId, state.selectedProjectId);
    dispatch({ type: "SET_LAYER_DATA", payload: { layerId, data } });
  };

  return (
    <AppContext.Provider value={{ state, dispatch, loadLayer }}>
      {children}
    </AppContext.Provider>
  );
}
