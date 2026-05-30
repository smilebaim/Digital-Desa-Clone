"use client";

import Link from "next/link";
import type { TabKey } from "./TabBar";

const TABS: { key: TabKey; label: string; icon: string }[] = [
  { key: "profil",    label: "Profil Desa",  icon: "fa-map-location-dot" },
  { key: "dana",      label: "Dana Desa",    icon: "fa-coins" },
  { key: "idm",       label: "IDM",          icon: "fa-chart-line" },
  { key: "pelayanan", label: "Pelayanan",    icon: "fa-hand-holding-heart" },
];

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  lastUpdate?: string;
}

export default function MobileDrawer({ isOpen, onClose, activeTab, onTabChange, lastUpdate }: MobileDrawerProps) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-[100] transition-opacity md:hidden ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 right-0 bottom-0 w-64 bg-white z-[110] shadow-xl md:hidden flex flex-col transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b bg-green-50">
          <div className="flex items-center gap-2">
            <i className="fas fa-building-columns text-green-700"></i>
            <h2 className="font-bold text-green-800">Menu</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-green-100 transition"
          >
            <i className="fas fa-times text-green-700"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition ${
                activeTab === tab.key
                  ? "bg-green-50 text-green-700 font-semibold border-r-4 border-green-600"
                  : "text-gray-600 hover:bg-gray-50 font-medium"
              }`}
            >
              <i className={`fas ${tab.icon} w-6 text-center`}></i>
              {tab.label}
            </button>
          ))}

          <div className="my-2 border-t border-gray-100" />

          <Link
            href="/admin"
            className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-600 hover:bg-gray-50 font-medium"
          >
            <i className="fas fa-cog w-6 text-center"></i>
            Panel Admin
          </Link>
        </div>

        {lastUpdate && (
          <div className="p-4 border-t bg-gray-50">
            <p className="text-xs text-gray-500 mb-1">Diperbarui</p>
            <p className="text-sm font-semibold text-gray-800">{lastUpdate}</p>
          </div>
        )}
      </div>
    </>
  );
}
