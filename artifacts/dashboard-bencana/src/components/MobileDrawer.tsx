import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: "dampak" | "peta" | "pengungsi" | "bantuan";
  onTabChange: (tab: "dampak" | "peta" | "pengungsi" | "bantuan") => void;
}

export default function MobileDrawer({ isOpen, onClose, activeTab, onTabChange }: MobileDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const tabs = [
    { id: "dampak", label: "Dampak Bencana", icon: "fa-exclamation-triangle" },
    { id: "peta", label: "Peta Operasi", icon: "fa-map-marked-alt" },
    { id: "pengungsi", label: "Data Pengungsi", icon: "fa-users" },
    { id: "bantuan", label: "Logistik Bantuan", icon: "fa-truck" },
  ] as const;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-[60] transition-opacity md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Drawer */}
      <div 
        className={cn(
          "fixed top-0 right-0 h-full w-[280px] bg-card shadow-xl z-[70] transform transition-transform duration-300 ease-in-out md:hidden flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-4 bg-gradient-to-br from-red-700 to-red-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <i className="fa-solid fa-shield-halved text-sm"></i>
            </div>
            <span className="font-bold uppercase tracking-tight">Menu Navigasi</span>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
          >
            <i className="fa-solid fa-times"></i>
          </button>
        </div>
        
        <div className="p-2 flex-1 overflow-y-auto">
          <div className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "w-full flex items-center gap-4 px-4 py-4 rounded-lg transition-colors text-left",
                  activeTab === tab.id 
                    ? "bg-red-50 text-red-700 font-bold dark:bg-red-950/30 dark:text-red-400" 
                    : "text-foreground font-medium hover:bg-muted"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                  activeTab === tab.id ? "bg-red-100 text-red-600 dark:bg-red-900/50" : "bg-muted text-muted-foreground"
                )}>
                  <i className={`fa-solid ${tab.icon} text-sm`}></i>
                </div>
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <i className="fa-solid fa-chevron-right ml-auto text-xs opacity-50"></i>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
