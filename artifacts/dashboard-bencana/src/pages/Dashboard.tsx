import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { 
  getGetBencanaSummaryQueryKey, 
  getGetBencanaDampakQueryKey, 
  getGetBencanaPengungsiQueryKey, 
  getGetBencanaBantuanQueryKey, 
  getGetBencanaMarkersQueryKey,
  useGetBencanaSummary
} from "@workspace/api-client-react";
import Header from "../components/Header";
import TabBar from "../components/TabBar";
import MobileDrawer from "../components/MobileDrawer";
import DampakTab from "../components/DampakTab";
import PetaOperasiTab from "../components/PetaOperasiTab";
import PengungsiTab from "../components/PengungsiTab";
import BantuanTab from "../components/BantuanTab";
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"dampak" | "peta" | "pengungsi" | "bantuan">("dampak");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: summary } = useGetBencanaSummary();

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: getGetBencanaSummaryQueryKey() });
    queryClient.invalidateQueries({ queryKey: getGetBencanaDampakQueryKey() });
    queryClient.invalidateQueries({ queryKey: getGetBencanaPengungsiQueryKey() });
    queryClient.invalidateQueries({ queryKey: getGetBencanaBantuanQueryKey() });
    queryClient.invalidateQueries({ queryKey: getGetBencanaMarkersQueryKey() });
  };

  const formattedUpdate = summary?.lastUpdate ?? "-";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header 
        onMenuClick={() => setIsMobileMenuOpen(true)} 
        onRefresh={handleRefresh}
        lastUpdate={formattedUpdate}
      />
      
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 w-full bg-gray-50 pb-12 relative z-0">
        {activeTab === "dampak" && <DampakTab />}
        {activeTab === "peta" && <PetaOperasiTab />}
        {activeTab === "pengungsi" && <PengungsiTab />}
        {activeTab === "bantuan" && <BantuanTab />}
      </main>

      <footer className="bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 text-gray-700 py-6 mt-auto">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <i className="fas fa-shield-alt text-xl text-gray-500"></i>
            <div>
              <p className="font-bold text-sm">Dashboard Monitoring Bencana Hidrometeorologi</p>
              <p className="text-xs text-gray-500">Sistem Informasi Spasial</p>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm font-medium">Dalam Pengembangan Tim Spatial</p>
            <p className="text-xs text-gray-500">&copy; 2026 Spatial Research</p>
          </div>
        </div>
      </footer>

      <MobileDrawer 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setIsMobileMenuOpen(false);
        }}
        lastUpdate={formattedUpdate}
      />
    </div>
  );
}