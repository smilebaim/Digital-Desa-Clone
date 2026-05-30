"use client";

export type TabKey = "profil" | "dana" | "idm" | "pelayanan";

const TABS: { key: TabKey; label: string; icon: string }[] = [
  { key: "profil",    label: "Profil Desa",  icon: "fa-map-location-dot" },
  { key: "dana",      label: "Dana Desa",    icon: "fa-coins" },
  { key: "idm",       label: "IDM",          icon: "fa-chart-line" },
  { key: "pelayanan", label: "Pelayanan",    icon: "fa-hand-holding-heart" },
];

interface TabBarProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

export default function TabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-14 md:top-16 z-40">
      <div className="flex overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`flex-1 min-w-[80px] flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 px-2 md:px-6 py-3 text-xs md:text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
              activeTab === tab.key
                ? "border-green-600 text-green-700 bg-green-50"
                : "border-transparent text-gray-500 hover:text-green-600 hover:bg-gray-50"
            }`}
          >
            <i className={`fas ${tab.icon} text-base md:text-sm`}></i>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
