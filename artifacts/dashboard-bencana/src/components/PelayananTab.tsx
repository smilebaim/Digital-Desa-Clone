"use client";

import { useEffect, useRef } from "react";
import { useGetDesaPelayanan } from "@workspace/api-client-react";

declare const Chart: any;

const JENIS_META: Record<string, { icon: string; color: string; bg: string; badge: string }> = {
  Pendidikan:    { icon: "fa-graduation-cap", color: "#2563eb", bg: "bg-blue-50",   badge: "bg-blue-100 text-blue-800" },
  Kesehatan:     { icon: "fa-heart-pulse",    color: "#dc2626", bg: "bg-red-50",    badge: "bg-red-100 text-red-800" },
  Ekonomi:       { icon: "fa-store",          color: "#d97706", bg: "bg-yellow-50", badge: "bg-yellow-100 text-yellow-800" },
  Administrasi:  { icon: "fa-file-signature", color: "#16a34a", bg: "bg-green-50",  badge: "bg-green-100 text-green-800" },
};

function KpiCard({ icon, value, label, color }: { icon: string; value: string | number; label: string; color: string }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-4">
      <div className={`${color} text-white rounded-xl p-3 flex-shrink-0`}>
        <i className={`fas ${icon} text-xl`}></i>
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className="text-xs text-gray-500 mt-0.5">{label}</p>
      </div>
    </div>
  );
}

export default function PelayananTab() {
  const { data: pelayanan = [] } = useGetDesaPelayanan();
  const barRef = useRef<HTMLCanvasElement>(null);
  const barChart = useRef<any>(null);

  const countByJenis = Object.keys(JENIS_META).reduce((acc, j) => {
    acc[j] = pelayanan.filter((p: any) => p.jenis === j).length;
    return acc;
  }, {} as Record<string, number>);

  const totalPengguna = pelayanan.reduce((a: number, p: any) => a + p.pengguna_bulan, 0);
  const aktif = pelayanan.filter((p: any) => p.status === "Aktif").length;

  useEffect(() => {
    if (!barRef.current || pelayanan.length === 0) return;
    if (barChart.current) barChart.current.destroy();
    const categories = Object.keys(JENIS_META);
    barChart.current = new Chart(barRef.current, {
      type: "bar",
      data: {
        labels: categories,
        datasets: [
          {
            label: "Jumlah Fasilitas",
            data: categories.map((c) => countByJenis[c] ?? 0),
            backgroundColor: ["#2563eb", "#dc2626", "#d97706", "#16a34a"],
            borderRadius: 6,
          },
          {
            label: "Pengguna/Bulan (÷10)",
            data: categories.map((c) =>
              Math.round(pelayanan.filter((p: any) => p.jenis === c).reduce((a: number, p: any) => a + p.pengguna_bulan, 0) / 10)
            ),
            backgroundColor: ["rgba(37,99,235,0.3)", "rgba(220,38,38,0.3)", "rgba(217,119,6,0.3)", "rgba(22,163,74,0.3)"],
            borderRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: "top" } },
        scales: { y: { ticks: { stepSize: 1 } } },
      },
    });
    return () => { barChart.current?.destroy(); };
  }, [pelayanan]);

  return (
    <div className="container mx-auto px-4 md:px-6 py-6 space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard icon="fa-hand-holding-heart" value={pelayanan.length} label="Total Fasilitas" color="bg-green-600" />
        <KpiCard icon="fa-circle-check" value={aktif} label="Aktif Beroperasi" color="bg-blue-600" />
        <KpiCard icon="fa-users" value={totalPengguna.toLocaleString("id-ID")} label="Total Pengguna/Bulan" color="bg-teal-600" />
        <KpiCard icon="fa-triangle-exclamation" value={pelayanan.length - aktif} label="Tidak Aktif / Perlu Perhatian" color="bg-orange-500" />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <i className="fas fa-chart-bar text-green-600"></i> Fasilitas & Pengguna per Kategori
          </h3>
          <div style={{ height: 260 }}>
            <canvas ref={barRef} />
          </div>
        </div>

        {/* Summary cards per jenis */}
        <div className="space-y-3">
          {Object.entries(JENIS_META).map(([jenis, meta]) => {
            const jumlah = countByJenis[jenis] ?? 0;
            const penggunanya = pelayanan.filter((p: any) => p.jenis === jenis).reduce((a: number, p: any) => a + p.pengguna_bulan, 0);
            return (
              <div key={jenis} className={`${meta.bg} rounded-xl p-4 flex items-center gap-3`}>
                <div className="text-2xl font-bold flex-shrink-0" style={{ color: meta.color }}>
                  {jumlah}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 text-sm">{jenis}</p>
                  <p className="text-xs text-gray-500">{penggunanya.toLocaleString("id-ID")} pengguna/bln</p>
                </div>
                <i className={`fas ${meta.icon} text-2xl opacity-30`} style={{ color: meta.color }} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b flex items-center gap-2">
          <i className="fas fa-list-check text-green-600"></i>
          <h3 className="font-semibold text-gray-800">Daftar Fasilitas & Layanan</h3>
          <span className="ml-auto text-xs text-gray-400">{pelayanan.length} fasilitas</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
              <tr>
                <th className="text-left px-4 py-3">Nama Fasilitas</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Gampong</th>
                <th className="text-center px-4 py-3">Kategori</th>
                <th className="text-center px-4 py-3">Status</th>
                <th className="text-right px-4 py-3 hidden sm:table-cell">Pengguna/Bln</th>
                <th className="text-left px-4 py-3 hidden lg:table-cell">Keterangan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {pelayanan.map((p: any) => {
                const meta = JENIS_META[p.jenis] ?? JENIS_META["Administrasi"];
                return (
                  <tr key={p.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 font-medium text-gray-800">{p.nama_fasilitas}</td>
                    <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{p.nama_desa.replace("Gampong ", "")}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${meta.badge}`}>
                        <i className={`fas ${meta.icon} mr-1`}></i>{p.jenis}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${p.status === "Aktif" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-700"}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-gray-700 hidden sm:table-cell">{p.pengguna_bulan.toLocaleString("id-ID")}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs hidden lg:table-cell">{p.keterangan}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
