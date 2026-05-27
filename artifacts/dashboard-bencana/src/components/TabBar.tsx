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
    <div className="flex w-max min-w-full md:w-full">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`tab-btn flex-1 flex items-center justify-center gap-2 whitespace-nowrap px-4 md:px-6 h-12 md:h-14 transition-all duration-200 ${
            activeTab === tab.id 
              ? "active" 
              : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
          }`}
        >
          <i className={`fa-solid ${tab.icon} ${activeTab === tab.id ? "text-primary" : ""}`}></i>
          <span className="font-semibold">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
