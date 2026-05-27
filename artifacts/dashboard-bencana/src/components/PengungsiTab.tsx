import { useGetBencanaPengungsi } from "@workspace/api-client-react";
import KpiCard from "./KpiCard";
import { useState, useMemo } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";

export default function PengungsiTab() {
  const { data: pengungsi, isLoading } = useGetBencanaPengungsi();
  const [filterKabupaten, setFilterKabupaten] = useState<string>("all");

  const uniqueKabupaten = useMemo(() => {
    if (!pengungsi) return [];
    return Array.from(new Set(pengungsi.map(p => p.kabupaten))).sort();
  }, [pengungsi]);

  const filteredPengungsi = useMemo(() => {
    if (!pengungsi) return [];
    if (filterKabupaten === "all") return pengungsi;
    return pengungsi.filter(p => p.kabupaten === filterKabupaten);
  }, [pengungsi, filterKabupaten]);

  const summary = useMemo(() => {
    if (!filteredPengungsi.length) return { kk: 0, jiwa: 0, l: 0, p: 0, a: 0, lansia: 0 };
    return filteredPengungsi.reduce((acc, curr) => ({
      kk: acc.kk + curr.jumlahKepalaKeluarga,
      jiwa: acc.jiwa + curr.jumlahJiwa,
      l: acc.l + curr.lakiLaki,
      p: acc.p + curr.perempuan,
      a: acc.a + curr.anakAnak,
      lansia: acc.lansia + curr.lansia
    }), { kk: 0, jiwa: 0, l: 0, p: 0, a: 0, lansia: 0 });
  }, [filteredPengungsi]);

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <i className="fa-solid fa-users text-muted-foreground"></i>
          Data Pengungsi
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

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        <KpiCard 
          title="Total KK" 
          value={summary.kk} 
          icon="fa-home" 
          colorClass="bg-blue-100 text-blue-600" 
        />
        <KpiCard 
          title="Total Jiwa" 
          value={summary.jiwa} 
          icon="fa-users" 
          colorClass="bg-red-100 text-red-600" 
        />
        <KpiCard 
          title="Laki-laki" 
          value={summary.l} 
          icon="fa-male" 
          colorClass="bg-cyan-100 text-cyan-600" 
        />
        <KpiCard 
          title="Perempuan" 
          value={summary.p} 
          icon="fa-female" 
          colorClass="bg-pink-100 text-pink-600" 
        />
        <KpiCard 
          title="Anak-anak" 
          value={summary.a} 
          icon="fa-child" 
          colorClass="bg-yellow-100 text-yellow-600" 
        />
        <KpiCard 
          title="Lansia" 
          value={summary.lansia} 
          icon="fa-blind" 
          colorClass="bg-purple-100 text-purple-600" 
        />
      </div>

      <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[50px] text-center">No</TableHead>
                <TableHead>Kabupaten</TableHead>
                <TableHead>Lokasi Pengungsian</TableHead>
                <TableHead className="text-right">KK</TableHead>
                <TableHead className="text-right font-bold text-foreground">Jiwa</TableHead>
                <TableHead className="text-right">L</TableHead>
                <TableHead className="text-right">P</TableHead>
                <TableHead className="text-right">Anak</TableHead>
                <TableHead className="text-right">Lansia</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={10} className="h-12 bg-muted/20 animate-pulse"></TableCell>
                  </TableRow>
                ))
              ) : filteredPengungsi.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">Tidak ada data ditemukan.</TableCell>
                </TableRow>
              ) : (
                filteredPengungsi.map((row, index) => (
                  <TableRow key={row.id} className="hover:bg-muted/30">
                    <TableCell className="text-center font-medium">{index + 1}</TableCell>
                    <TableCell className="font-semibold">{row.kabupaten}</TableCell>
                    <TableCell>{row.lokasi}</TableCell>
                    <TableCell className="text-right">{row.jumlahKepalaKeluarga}</TableCell>
                    <TableCell className="text-right font-bold">{row.jumlahJiwa}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{row.lakiLaki}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{row.perempuan}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{row.anakAnak}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{row.lansia}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className={
                        row.status === 'Aktif' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-green-50 text-green-700 border-green-200'
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
      </div>
    </div>
  );
}
