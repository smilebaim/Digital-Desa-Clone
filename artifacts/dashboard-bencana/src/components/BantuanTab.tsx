import { useGetBencanaBantuan } from "@workspace/api-client-react";
import { useState, useMemo } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default function BantuanTab() {
  const { data: bantuan, isLoading } = useGetBencanaBantuan();
  const [filterKabupaten, setFilterKabupaten] = useState<string>("all");
  const [filterLogistik, setFilterLogistik] = useState<string>("all");

  const uniqueKabupaten = useMemo(() => {
    if (!bantuan) return [];
    return Array.from(new Set(bantuan.map(b => b.kabupaten))).sort();
  }, [bantuan]);

  const uniqueLogistik = useMemo(() => {
    if (!bantuan) return [];
    return Array.from(new Set(bantuan.map(b => b.jenisLogistik))).sort();
  }, [bantuan]);

  const filteredBantuan = useMemo(() => {
    if (!bantuan) return [];
    return bantuan.filter(b => {
      const matchKab = filterKabupaten === "all" || b.kabupaten === filterKabupaten;
      const matchLog = filterLogistik === "all" || b.jenisLogistik === filterLogistik;
      return matchKab && matchLog;
    });
  }, [bantuan, filterKabupaten, filterLogistik]);

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <i className="fa-solid fa-truck-loading text-muted-foreground"></i>
          Distribusi Logistik Bantuan
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="w-full sm:w-48">
            <Select value={filterLogistik} onValueChange={setFilterLogistik}>
              <SelectTrigger>
                <SelectValue placeholder="Jenis Logistik" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Logistik</SelectItem>
                {uniqueLogistik.map(log => (
                  <SelectItem key={log} value={log}>{log}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full sm:w-48">
            <Select value={filterKabupaten} onValueChange={setFilterKabupaten}>
              <SelectTrigger>
                <SelectValue placeholder="Kabupaten" />
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
      </div>

      <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[50px] text-center">No</TableHead>
                <TableHead>Kabupaten</TableHead>
                <TableHead>Jenis Logistik</TableHead>
                <TableHead className="text-right">Jumlah</TableHead>
                <TableHead>Satuan</TableHead>
                <TableHead>Sumber Bantuan</TableHead>
                <TableHead>Tanggal Distribusi</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={8} className="h-12 bg-muted/20 animate-pulse"></TableCell>
                  </TableRow>
                ))
              ) : filteredBantuan.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">Tidak ada data ditemukan.</TableCell>
                </TableRow>
              ) : (
                filteredBantuan.map((row, index) => (
                  <TableRow key={row.id} className="hover:bg-muted/30">
                    <TableCell className="text-center font-medium">{index + 1}</TableCell>
                    <TableCell className="font-semibold">{row.kabupaten}</TableCell>
                    <TableCell className="font-medium">{row.jenisLogistik}</TableCell>
                    <TableCell className="text-right font-bold">{row.jumlah.toLocaleString()}</TableCell>
                    <TableCell className="text-muted-foreground">{row.satuan}</TableCell>
                    <TableCell>{row.sumberBantuan}</TableCell>
                    <TableCell className="whitespace-nowrap text-muted-foreground">
                      {format(new Date(row.tanggalDistribusi), "dd MMM yyyy", { locale: id })}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className={
                        row.status === 'Disalurkan' ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500 hover:bg-yellow-600'
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
