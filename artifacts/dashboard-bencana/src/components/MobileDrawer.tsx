interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: "dampak" | "peta" | "pengungsi" | "bantuan";
  onTabChange: (tab: "dampak" | "peta" | "pengungsi" | "bantuan") => void;
  lastUpdate?: string;
}

export default function MobileDrawer({ isOpen, onClose, activeTab, onTabChange, lastUpdate }: MobileDrawerProps) {
  const tabs = [
    { id: "dampak", label: "Dampak", icon: "fa-exclamation-triangle" },
    { id: "peta", label: "Peta Operasi", icon: "fa-map-marked-alt" },
    { id: "pengungsi", label: "Pengungsi", icon: "fa-users" },
    { id: "bantuan", label: "Bantuan", icon: "fa-truck" },
  ] as const;

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/50 z-[100] transition-opacity md:hidden ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
        data-testid="mobile-drawer-backdrop"
      />
      <div 
        className={`fixed top-0 right-0 bottom-0 w-64 bg-white z-[110] shadow-xl md:hidden flex flex-col transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        data-testid="mobile-drawer"
      >
        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
          <h2 className="font-bold text-gray-800">Menu</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition"
            data-testid="button-close-drawer"
          >
            <i className="fas fa-times text-gray-600"></i>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition ${
                activeTab === tab.id ? "bg-red-50 text-red-600 font-semibold border-r-4 border-red-600" : "text-gray-600 hover:bg-gray-50 font-medium"
              }`}
              data-testid={`drawer-tab-${tab.id}`}
            >
              <i className={`fas ${tab.icon} w-6 text-center`}></i>
              {tab.label}
            </button>
          ))}
        </div>
        
        {lastUpdate && (
          <div className="p-4 border-t bg-gray-50">
            <p className="text-xs text-gray-500 mb-1">Update Terakhir</p>
            <p className="text-sm font-semibold text-gray-800">{lastUpdate}</p>
          </div>
        )}
      </div>
    </>
  );
}