import { useState } from "react";
import { Link } from "wouter";
import {
  LayoutDashboard, AlertTriangle, Wheat, Users, Search, HandHeart,
  MapPin, Settings, ChevronLeft, Menu, X, LogOut,
} from "lucide-react";
import OverviewSection from "./admin/OverviewSection";
import DampakSection from "./admin/DampakSection";
import PertanianSection from "./admin/PertanianSection";
import PengungsiSection from "./admin/PengungsiSection";
import OrangHilangSection from "./admin/OrangHilangSection";
import BantuanSection from "./admin/BantuanSection";
import MarkersSection from "./admin/MarkersSection";
import RingkasanSection from "./admin/RingkasanSection";

type Section =
  | "overview"
  | "dampak"
  | "pertanian"
  | "pengungsi"
  | "orang-hilang"
  | "bantuan"
  | "markers"
  | "ringkasan";

const navItems: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: "overview", label: "Overview", icon: <LayoutDashboard size={18} /> },
  { id: "dampak", label: "Data Dampak", icon: <AlertTriangle size={18} /> },
  { id: "pertanian", label: "Pertanian", icon: <Wheat size={18} /> },
  { id: "pengungsi", label: "Pengungsi", icon: <Users size={18} /> },
  { id: "orang-hilang", label: "Orang Hilang", icon: <Search size={18} /> },
  { id: "bantuan", label: "Bantuan Desa", icon: <HandHeart size={18} /> },
  { id: "markers", label: "Peta Marker", icon: <MapPin size={18} /> },
  { id: "ringkasan", label: "Ringkasan KPI", icon: <Settings size={18} /> },
];

export default function AdminPage() {
  const [active, setActive] = useState<Section>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function renderSection() {
    switch (active) {
      case "overview": return <OverviewSection />;
      case "dampak": return <DampakSection />;
      case "pertanian": return <PertanianSection />;
      case "pengungsi": return <PengungsiSection />;
      case "orang-hilang": return <OrangHilangSection />;
      case "bantuan": return <BantuanSection />;
      case "markers": return <MarkersSection />;
      case "ringkasan": return <RingkasanSection />;
    }
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-gray-900 text-white flex flex-col transition-transform duration-200
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-700">
          <div className="w-8 h-8 rounded-md bg-red-600 flex items-center justify-center">
            <AlertTriangle size={16} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm leading-tight">Admin Panel</p>
            <p className="text-xs text-gray-400 truncate">Bencana Aceh</p>
          </div>
          <button
            className="lg:hidden text-gray-400 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActive(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm mb-0.5 transition-colors
                ${active === item.id
                  ? "bg-red-600 text-white font-medium"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="px-2 py-3 border-t border-gray-700">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <LogOut size={18} />
            Kembali ke Dashboard
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 shrink-0">
          <button
            className="lg:hidden p-1.5 rounded-md text-gray-600 hover:bg-gray-100"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-semibold text-gray-800">
              {navItems.find((n) => n.id === active)?.label}
            </h1>
          </div>
          <Link
            href="/"
            className="hidden sm:flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-600 transition-colors"
          >
            <ChevronLeft size={16} />
            Dashboard
          </Link>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {renderSection()}
        </main>
      </div>
    </div>
  );
}
