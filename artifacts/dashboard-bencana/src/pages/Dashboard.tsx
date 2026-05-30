import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  getGetDesaSummaryQueryKey,
  getGetDesaProfilQueryKey,
  getGetDesaDanaQueryKey,
  getGetDesaIDMQueryKey,
  getGetDesaPelayananQueryKey,
  useGetDesaSummary,
} from "@workspace/api-client-react";
import Header from "../components/Header";
import TabBar, { type TabKey } from "../components/TabBar";
import MobileDrawer from "../components/MobileDrawer";
import ProfilDesaTab from "../components/ProfilDesaTab";
import DanaDasaTab from "../components/DanaDasaTab";
import IDMTab from "../components/IDMTab";
import PelayananTab from "../components/PelayananTab";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabKey>("profil");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const queryClient = useQueryClient();
  const { data: summary } = useGetDesaSummary();

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: getGetDesaSummaryQueryKey() });
    queryClient.invalidateQueries({ queryKey: getGetDesaProfilQueryKey() });
    queryClient.invalidateQueries({ queryKey: getGetDesaDanaQueryKey() });
    queryClient.invalidateQueries({ queryKey: getGetDesaIDMQueryKey() });
    queryClient.invalidateQueries({ queryKey: getGetDesaPelayananQueryKey() });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header
        onMenuClick={() => setIsMobileMenuOpen(true)}
        onRefresh={handleRefresh}
        lastUpdate={summary?.lastUpdate ?? "-"}
        kecamatan={summary?.kecamatan ?? "Kuta Malaka"}
        kabupaten={summary?.kabupaten ?? "Aceh Besar"}
      />

      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 w-full pb-12">
        {activeTab === "profil"    && <ProfilDesaTab />}
        {activeTab === "dana"      && <DanaDasaTab />}
        {activeTab === "idm"       && <IDMTab />}
        {activeTab === "pelayanan" && <PelayananTab />}
      </main>

      <footer className="bg-gradient-to-r from-green-900 via-green-800 to-emerald-800 text-green-100 py-5 mt-auto">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <i className="fas fa-building-columns text-xl text-green-300"></i>
            <div>
              <p className="font-bold text-sm text-white">Dashboard Data Desa</p>
              <p className="text-xs text-green-300">Kecamatan Kuta Malaka · Aceh Besar</p>
            </div>
          </div>
          <p className="text-xs text-green-300">&copy; 2026 Sistem Informasi Desa</p>
        </div>
      </footer>

      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeTab={activeTab}
        onTabChange={(tab) => { setActiveTab(tab); setIsMobileMenuOpen(false); }}
        lastUpdate={summary?.lastUpdate ?? "-"}
      />
    </div>
  );
}
