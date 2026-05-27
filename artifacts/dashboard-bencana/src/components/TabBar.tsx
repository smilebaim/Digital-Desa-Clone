interface TabBarProps {
  activeTab: "dampak" | "peta" | "pengungsi" | "bantuan";
  onTabChange: (tab: "dampak" | "peta" | "pengungsi" | "bantuan") => void;
}

export default function TabBar({ activeTab, onTabChange }: TabBarProps) {
  const tabs = [
    { id: "dampak", label: "Dampak", icon: "fa-exclamation-triangle" },
    { id: "peta", label: "Peta Operasi", icon: "fa-map-marked-alt" },
    { id: "pengungsi", label: "Pengungsi", icon: "fa-users" },
    { id: "bantuan", label: "Bantuan", icon: "fa-truck" },
  ] as const;

  return (
    <div className="flex w-full border-b bg-white shadow-sm sticky top-[56px] md:top-[64px] z-40">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`tab-btn flex-1 flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 whitespace-nowrap px-1 sm:px-4 md:px-6 h-12 md:h-14 transition-all duration-200 text-[10px] sm:text-sm font-semibold ${
            activeTab === tab.id
              ? "active text-red-600 border-b-2 border-red-600"
              : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
          }`}
          data-testid={`tab-${tab.id}`}
        >
          <i className={`fas ${tab.icon} text-sm sm:text-base`}></i>
          <span className="leading-tight">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
