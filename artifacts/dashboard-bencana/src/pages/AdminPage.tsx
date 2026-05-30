"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard, MapPin, Coins, BarChart2, HeartHandshake,
  ChevronLeft, Menu, X,
} from "lucide-react";
import DesaOverview from "./admin/DesaOverview";
import DesaProfilSection from "./admin/DesaProfilSection";
import DesaDanaSection from "./admin/DesaDanaSection";
import DesaIDMSection from "./admin/DesaIDMSection";
import DesaPelayananSection from "./admin/DesaPelayananSection";

type Section = "overview" | "profil" | "dana" | "idm" | "pelayanan";

const navItems: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: "overview",   label: "Overview",       icon: <LayoutDashboard size={18} /> },
  { id: "profil",     label: "Profil Desa",    icon: <MapPin size={18} /> },
  { id: "dana",       label: "Dana Desa",      icon: <Coins size={18} /> },
  { id: "idm",        label: "IDM",            icon: <BarChart2 size={18} /> },
  { id: "pelayanan",  label: "Pelayanan",      icon: <HeartHandshake size={18} /> },
];

export default function AdminPage() {
  const [active, setActive] = useState<Section>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNav = (id: Section) => {
    setActive(id);
    setSidebarOpen(false);
  };

  const SidebarContent = () => (
    <>
      <div className="h-14 flex items-center gap-3 px-4 border-b border-gray-700 flex-shrink-0">
        <div className="bg-green-500 p-1.5 rounded-lg">
          <LayoutDashboard size={18} className="text-white" />
        </div>
        <div className="min-w-0">
          <p className="text-white font-bold text-sm truncate">Admin Panel</p>
          <p className="text-gray-400 text-xs truncate">Data Desa</p>
        </div>
        <button
          className="ml-auto text-gray-400 hover:text-white md:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <X size={18} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-2 px-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNav(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 text-sm transition-colors ${
              active === item.id
                ? "bg-green-600 text-white font-semibold"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      <div className="border-t border-gray-700 p-3">
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-400 hover:text-white text-sm px-2 py-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <ChevronLeft size={16} />
          Kembali ke Dashboard
        </Link>
      </div>
    </>
  );

  const currentLabel = navItems.find((n) => n.id === active)?.label ?? "";

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <aside className="hidden md:flex flex-col w-60 bg-gray-900 flex-shrink-0">
        <SidebarContent />
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 w-60 bg-gray-900 z-50 flex flex-col md:hidden transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 bg-white border-b flex items-center px-4 gap-3 flex-shrink-0">
          <button
            className="md:hidden text-gray-500 hover:text-gray-800"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>
          <h2 className="font-semibold text-gray-800 flex-1">{currentLabel}</h2>
          <Link href="/" className="hidden md:flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-600 transition-colors">
            <ChevronLeft size={16} /> Dashboard
          </Link>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {active === "overview"   && <DesaOverview />}
          {active === "profil"     && <DesaProfilSection />}
          {active === "dana"       && <DesaDanaSection />}
          {active === "idm"        && <DesaIDMSection />}
          {active === "pelayanan"  && <DesaPelayananSection />}
        </main>
      </div>
    </div>
  );
}
