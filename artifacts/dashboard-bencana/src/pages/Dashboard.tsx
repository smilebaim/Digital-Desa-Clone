import { useState } from "react";
import Header from "../components/Header";
import TabBar from "../components/TabBar";
import MobileDrawer from "../components/MobileDrawer";
import DampakTab from "../components/DampakTab";
import PetaOperasiTab from "../components/PetaOperasiTab";
import PengungsiTab from "../components/PengungsiTab";
import BantuanTab from "../components/BantuanTab";
import { useQueryClient } from "@tanstack/react-query";
import { getGetBencanaSummaryQueryKey, getGetBencanaDampakQueryKey, getGetBencanaPengungsiQueryKey, getGetBencanaBantuanQueryKey, getGetBencanaMarkersQueryKey } from "@workspace/api-client-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"dampak" | "peta" | "pengungsi" | "bantuan">("dampak");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const queryClient = useQueryClient();
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: getGetBencanaSummaryQueryKey() });
    queryClient.invalidateQueries({ queryKey: getGetBencanaDampakQueryKey() });
    queryClient.invalidateQueries({ queryKey: getGetBencanaPengungsiQueryKey() });
    queryClient.invalidateQueries({ queryKey: getGetBencanaBantuanQueryKey() });
    queryClient.invalidateQueries({ queryKey: getGetBencanaMarkersQueryKey() });
    setLastUpdate(new Date());
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header 
        onMenuClick={() => setIsMobileMenuOpen(true)} 
        onRefresh={handleRefresh}
        lastUpdate={format(lastUpdate, "dd MMM yyyy HH:mm", { locale: id })}
      />
      
      <div className="sticky top-[60px] md:top-[72px] z-40 bg-card border-b shadow-sm w-full overflow-x-auto no-scrollbar">
        <div className="container mx-auto px-4">
          <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>

      <main className="flex-1 w-full">
        {activeTab === "dampak" && <DampakTab />}
        {activeTab === "peta" && <PetaOperasiTab />}
        {activeTab === "pengungsi" && <PengungsiTab />}
        {activeTab === "bantuan" && <BantuanTab />}
      </main>

      <MobileDrawer 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setIsMobileMenuOpen(false);
        }}
      />
    </div>
  );
}
