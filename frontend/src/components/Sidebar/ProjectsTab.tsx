import { useState } from "react";
import { useApp } from "../../context/AppContext";
import type { Project } from "../../types";

function ProjectsTab() {
  const { state, dispatch } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const selectProject = (id: number) =>
    dispatch({ type: "SELECT_PROJECT", payload: id });

  // Placeholder — wire to POST /api/projects/ when backend is ready
  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("TODO: POST /api/projects/", { name, description });
    setShowForm(false);
    setName("");
    setDescription("");
  };

  return (
    <div className="flex flex-col gap-2 py-2">
      {/* Project list */}
      {state.isLoadingProjects ? (
        <div className="flex justify-center py-8">
          <span className="loading loading-spinner loading-sm text-primary" />
        </div>
      ) : state.projects.length === 0 ? (
        <div className="text-center py-8 opacity-50">
          <p className="text-xs">No projects yet</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-1">
          {state.projects.map((project: Project) => {
            const isSelected = project.id === state.selectedProjectId;
            return (
              <li key={project.id}>
                <button
                  onClick={() => selectProject(project.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors
                    ${
                      isSelected
                        ? "bg-primary/15 border border-primary/30"
                        : "hover:bg-base-200 border border-transparent"
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-1.5 h-1.5 rounded-full shrink-0
                        ${isSelected ? "bg-primary" : "bg-base-content/20"}`}
                    />
                    <span
                      className={`text-sm font-medium truncate ${isSelected ? "text-primary" : ""}`}
                    >
                      {project.name}
                    </span>
                  </div>
                  {project.description && (
                    <p className="text-xs opacity-40 mt-0.5 pl-3.5 truncate">
                      {project.description}
                    </p>
                  )}
                  <p className="text-xs opacity-30 mt-0.5 pl-3.5 font-mono">
                    {new Date(project.created_at).toLocaleDateString()}
                  </p>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <div className="divider my-1" />

      {/* New project */}
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="btn btn-outline btn-primary btn-sm w-full gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          New project
        </button>
      ) : (
        <form onSubmit={handleCreate} className="flex flex-col gap-2 px-1">
          <label className="form-control">
            <div className="label py-0.5">
              <span className="label-text text-xs">Project name</span>
            </div>
            <input
              type="text"
              className="input input-bordered input-sm"
              placeholder="Bizerte North Zone"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
            />
          </label>

          <label className="form-control">
            <div className="label py-0.5">
              <span className="label-text text-xs">Description</span>
            </div>
            <textarea
              className="textarea textarea-bordered textarea-sm resize-none"
              rows={2}
              placeholder="Optional description…"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          <div className="flex gap-2 mt-1">
            <button type="submit" className="btn btn-primary btn-sm flex-1">
              Create
            </button>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ProjectsTab;
