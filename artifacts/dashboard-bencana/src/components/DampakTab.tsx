import { useGetBencanaSummary, useGetBencanaDampak } from "@workspace/api-client-react";
import KpiCard from "./KpiCard";
import { useState, useMemo } from "react";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default function DampakTab() {
  const { data: summary, isLoading: isLoadingSummary } = useGetBencanaSummary();
  const { data: dampak, isLoading: isLoadingDampak } = useGetBencanaDampak();
  
  const [filterKabupaten, setFilterKabupaten] = useState<string>("all");
  
  const uniqueKabupaten = useMemo(() => {
    if (!dampak) return [];
    return Array.from(new Set(dampak.map(d => d.kabupaten))).sort();
  }, [dampak]);

  const filteredDampak = useMemo(() => {
    if (!dampak) return [];
    if (filterKabupaten === "all") return dampak;
    return dampak.filter(d => d.kabupaten === filterKabupaten);
  }, [dampak, filterKabupaten]);

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      
      {/* KPI Section */}
      <section>
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <i className="fa-solid fa-chart-pie text-muted-foreground"></i>
          Ringkasan Dampak Provinsi
        </h2>
        
        {isLoadingSummary ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-24 bg-muted animate-pulse rounded-xl"></div>
            ))}
          </div>
        ) : summary ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
            <KpiCard 
              title="Total Korban" 
              value={summary.totalKorban} 
              icon="fa-user-injured" 
              colorClass="bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400" 
            />
            <KpiCard 
              title="Pengungsi" 
              value={summary.totalPengungsi} 
              icon="fa-campground" 
              colorClass="bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400" 
            />
            <KpiCard 
              title="Titik Pengungsian" 
              value={summary.titikPengungsian} 
              icon="fa-map-pin" 
              colorClass="bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400" 
            />
            <KpiCard 
              title="Rumah Rusak" 
              value={summary.rumahRusak} 
              icon="fa-home" 
              colorClass="bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400" 
            />
            <KpiCard 
              title="Sawah (Ha)" 
              value={summary.sawahHa} 
              icon="fa-seedling" 
              colorClass="bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400" 
            />
            <KpiCard 
              title="Kab. Terdampak" 
              value={summary.kabupatenTerdampak} 
              icon="fa-map-marked-alt" 
              colorClass="bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400" 
            />
          </div>
        ) : null}
      </section>

      {/* Table Section */}
      <section className="bg-card rounded-xl border shadow-sm overflow-hidden">
        <div className="p-4 md:p-6 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <i className="fa-solid fa-list text-muted-foreground"></i>
            Rincian Dampak per Wilayah
          </h2>
          
          <div className="w-full sm:w-64">
            <Select value={filterKabupaten} onValueChange={setFilterKabupaten}>
              <SelectTrigger>
                <SelectValue placeholder="Semua Kabupaten" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kabupaten</SelectItem>
                {uniqueKabupaten.map(kab => (
                  <SelectItem key={kab} value={kab}>{kab}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[50px] text-center">No</TableHead>
                <TableHead>Kabupaten</TableHead>
                <TableHead>Kecamatan</TableHead>
                <TableHead>Jenis Kejadian</TableHead>
                <TableHead className="text-right">Korban Jiwa</TableHead>
                <TableHead className="text-right">Korban Luka</TableHead>
                <TableHead className="text-right">RB</TableHead>
                <TableHead className="text-right">RR</TableHead>
                <TableHead className="text-right">Sawah (Ha)</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingDampak ? (
                [...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={11} className="h-12 bg-muted/20 animate-pulse"></TableCell>
                  </TableRow>
                ))
              ) : filteredDampak.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={11} className="text-center py-8 text-muted-foreground">Tidak ada data ditemukan.</TableCell>
                </TableRow>
              ) : (
                filteredDampak.map((row, index) => (
                  <TableRow key={row.id} className="hover:bg-muted/30">
                    <TableCell className="text-center font-medium">{index + 1}</TableCell>
                    <TableCell className="font-semibold">{row.kabupaten}</TableCell>
                    <TableCell>{row.kecamatan}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-normal border-muted-foreground/30">
                        {row.jenisKejadian}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-red-600 font-medium">{row.korbanJiwa}</TableCell>
                    <TableCell className="text-right text-orange-600 font-medium">{row.korbanLuka}</TableCell>
                    <TableCell className="text-right">{row.rumahRusakBerat}</TableCell>
                    <TableCell className="text-right">{row.rumahRusakRingan}</TableCell>
                    <TableCell className="text-right">{row.sawahTerdampakHa}</TableCell>
                    <TableCell className="whitespace-nowrap text-muted-foreground">
                      {format(new Date(row.tanggal), "dd MMM yyyy", { locale: id })}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className={
                        row.status === 'Siaga' ? 'bg-red-500 hover:bg-red-600' :
                        row.status === 'Waspada' ? 'bg-orange-500 hover:bg-orange-600' :
                        'bg-green-500 hover:bg-green-600'
                      }>
                        {row.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
}
