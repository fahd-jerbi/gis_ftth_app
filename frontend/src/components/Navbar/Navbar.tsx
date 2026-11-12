import { useApp } from "../../context/AppContext";

export function Navbar() {
  const { state } = useApp();

  return (
    <div className="navbar bg-base-100 border-b border-base-300 px-4 z-50 h-14 min-h-0">
      <div className="flex-1 gap-3">
        <div className="flex items-center gap-2">
          <svg
            className="w-7 h-7 text-primary"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M3 12h4M17 12h4M12 3v4M12 17v4" />
            <path d="M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
          </svg>
          <span className="font-semibold text-base tracking-tight">
            FTTH<span className="text-primary">Planner</span>
          </span>
        </div>

        {state.selectedProjectId !== null && (
          <div className="hidden sm:flex items-center gap-1.5 ml-2">
            <span className="text-base-content/40 text-xs">▸</span>
            <span className="badge badge-ghost badge-sm font-mono">
              {state.projects.find((p) => p.id === state.selectedProjectId)
                ?.name ?? `Project #${state.selectedProjectId}`}
            </span>
          </div>
        )}
      </div>

      {/* Right side */}
      <div className="flex-none flex items-center gap-2">
        {state.isLoadingLayers && (
          <span className="loading loading-ring loading-xs text-primary" />
        )}

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar placeholder"
          >
            <div className="bg-primary text-primary-content rounded-full w-8">
              <span className="text-xs font-semibold">FA</span>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-2 z-50 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-48 border border-base-300"
          >
            <li className="menu-title text-xs opacity-50 pb-1">Fahd Amor</li>
            <li>
              <a>Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a className="text-error">Sign out</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
