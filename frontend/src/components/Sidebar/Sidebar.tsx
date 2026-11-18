import { useState } from "react";
import LayersTab from "./LayersTab";
import ProjectsTab from "./ProjectsTab";

type TabId = "layers" | "projects";

const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  {
    id: "layers",
    label: "Layers",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
        />
      </svg>
    ),
  },
  {
    id: "projects",
    label: "Projects",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M3 7a2 2 0 012-2h3.586a1 1 0 01.707.293L10.707 6.7A1 1 0 0111.414 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
        />
      </svg>
    ),
  },
];

function Sidebar() {
  const [activeTab, setActiveTab] = useState("layers");

  return (
    <aside className="w-64 shrink-0 bg-base-100 border-r border-base-300 flex flex-col overflow-hidden">
      <div role="tablist" className="tabs tabs-bordered px-2 pt-2 shrink-0">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            onClick={() => setActiveTab(tab.id)}
            className={`tab flex-1 gap-1.5 text-sm
              ${activeTab === tab.id ? "tab-active font-medium" : "opacity-60"}`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto px-2 pb-4">
        {activeTab == "layers" && <LayersTab />}
        {activeTab == "projects" && <ProjectsTab />}
      </div>
    </aside>
  );
}

export default Sidebar;
