"use client";

import { useEffect, useRef } from "react";
import { useGetDesaSummary, useGetDesaIDM } from "@workspace/api-client-react";

declare const Chart: any;

function KpiCard({ icon, value, label, color, textColor }: { icon: string; value: string | number; label: string; color: string; textColor?: string }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-4">
      <div className={`${color} text-white rounded-xl p-3 flex-shrink-0`}>
        <i className={`fas ${icon} text-xl`}></i>
      </div>
      <div>
        <p className={`text-2xl font-bold ${textColor ?? "text-gray-800"}`}>{value}</p>
        <p className="text-xs text-gray-500 mt-0.5">{label}</p>
      </div>
    </div>
  );
}

const STATUS_META: Record<string, { color: string; bg: string; badge: string; dot: string }> = {
  Mandiri:          { color: "#16a34a", bg: "bg-green-50",  badge: "bg-green-100 text-green-800",  dot: "bg-green-500" },
  Maju:             { color: "#2563eb", bg: "bg-blue-50",   badge: "bg-blue-100 text-blue-800",    dot: "bg-blue-500" },
  Berkembang:       { color: "#d97706", bg: "bg-yellow-50", badge: "bg-yellow-100 text-yellow-800", dot: "bg-yellow-500" },
  Tertinggal:       { color: "#ea580c", bg: "bg-orange-50", badge: "bg-orange-100 text-orange-800", dot: "bg-orange-500" },
  "Sangat Tertinggal": { color: "#dc2626", bg: "bg-red-50", badge: "bg-red-100 text-red-800",      dot: "bg-red-500" },
};

export default function IDMTab() {
  const { data: summary } = useGetDesaSummary();
  const { data: idm = [] } = useGetDesaIDM();
  const barRef = useRef<HTMLCanvasElement>(null);
  const donutRef = useRef<HTMLCanvasElement>(null);
  const barChart = useRef<any>(null);
  const donutChart = useRef<any>(null);

  const sorted = [...idm].sort((a: any, b: any) => b.skor_idm - a.skor_idm);

  useEffect(() => {
    if (!barRef.current || sorted.length === 0) return;
    if (barChart.current) barChart.current.destroy();
    barChart.current = new Chart(barRef.current, {
      type: "bar",
      data: {
        labels: sorted.map((d: any) => d.nama_desa.replace("Desa ", "")),
        datasets: [
          {
            label: "Skor IDM 2024",
            data: sorted.map((d: any) => d.skor_idm),
            backgroundColor: sorted.map((d: any) => {
              const c = STATUS_META[d.status_idm]?.color ?? "#6b7280";
              return c + "cc";
            }),
            borderRadius: 5,
          },
          {
            label: "Skor Sebelumnya",
            data: sorted.map((d: any) => d.skor_sebelumnya),
            backgroundColor: "rgba(156,163,175,0.4)",
            borderRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: "top" } },
        scales: {
          y: { min: 0.4, max: 0.9, ticks: { callback: (v: number) => v.toFixed(2) } },
          x: { ticks: { font: { size: 10 } } },
        },
      },
    });
    return () => { barChart.current?.destroy(); };
  }, [idm]);

  useEffect(() => {
    if (!donutRef.current || !summary) return;
    if (donutChart.current) donutChart.current.destroy();
    donutChart.current = new Chart(donutRef.current, {
      type: "doughnut",
      data: {
        labels: ["Mandiri", "Maju", "Berkembang", "Tertinggal", "Sangat Tertinggal"],
        datasets: [{
          data: [
            summary.desaMandiri, summary.desaMaju, summary.desaBerkembang,
            summary.desaTertinggal, summary.desaSangatTertinggal,
          ],
          backgroundColor: ["#16a34a", "#2563eb", "#d97706", "#ea580c", "#dc2626"],
          borderWidth: 2,
          borderColor: "#fff",
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: "bottom" } },
      },
    });
    return () => { donutChart.current?.destroy(); };
  }, [summary]);

  const avgIDM = sorted.length ? sorted.reduce((a: number, d: any) => a + d.skor_idm, 0) / sorted.length : 0;
  const avgDelta = sorted.length ? sorted.reduce((a: number, d: any) => a + d.delta, 0) / sorted.length : 0;

  return (
    <div className="container mx-auto px-4 md:px-6 py-6 space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard icon="fa-star" value={avgIDM.toFixed(4)} label="Rata-rata Skor IDM" color="bg-green-600" />
        <KpiCard icon="fa-circle-up" value={`+${avgDelta.toFixed(4)}`} label="Rata-rata Kenaikan" color="bg-blue-600" textColor="text-blue-700" />
        <KpiCard icon="fa-award" value={(summary?.desaMandiri ?? 0) + (summary?.desaMaju ?? 0)} label="Mandiri + Maju" color="bg-emerald-600" />
        <KpiCard icon="fa-triangle-exclamation" value={(summary?.desaTertinggal ?? 0) + (summary?.desaSangatTertinggal ?? 0)} label="Butuh Intervensi" color="bg-orange-500" />
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <i className="fas fa-chart-bar text-green-600"></i> Perbandingan Skor IDM per Desa
          </h3>
          <div style={{ height: 300 }}>
            <canvas ref={barRef} />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <i className="fas fa-chart-pie text-blue-600"></i> Distribusi Status IDM
          </h3>
          <div style={{ height: 220 }}>
            <canvas ref={donutRef} />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b flex items-center gap-2">
          <i className="fas fa-chart-line text-green-600"></i>
          <h3 className="font-semibold text-gray-800">Rincian IDM per Desa — Tahun 2024</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
              <tr>
                <th className="text-left px-4 py-3">Gampong</th>
                <th className="text-center px-4 py-3">Status</th>
                <th className="text-right px-4 py-3">Skor IDM</th>
                <th className="text-right px-4 py-3 hidden md:table-cell">IKS</th>
                <th className="text-right px-4 py-3 hidden md:table-cell">IKE</th>
                <th className="text-right px-4 py-3 hidden md:table-cell">IKL</th>
                <th className="text-right px-4 py-3">Δ Naik</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {sorted.map((d: any) => {
                const meta = STATUS_META[d.status_idm] ?? STATUS_META["Berkembang"];
                return (
                  <tr key={d.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 font-medium text-gray-800">{d.nama_desa.replace("Desa ", "")}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${meta.badge}`}>{d.status_idm}</span>
                    </td>
                    <td className="px-4 py-3 text-right font-bold" style={{ color: meta.color }}>{d.skor_idm.toFixed(4)}</td>
                    <td className="px-4 py-3 text-right text-gray-600 hidden md:table-cell">{d.iks.toFixed(4)}</td>
                    <td className="px-4 py-3 text-right text-gray-600 hidden md:table-cell">{d.ike.toFixed(4)}</td>
                    <td className="px-4 py-3 text-right text-gray-600 hidden md:table-cell">{d.ikl.toFixed(4)}</td>
                    <td className="px-4 py-3 text-right text-green-600 font-semibold">+{d.delta.toFixed(4)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t bg-gray-50 text-xs text-gray-500">
          IKS = Indeks Ketahanan Sosial · IKE = Indeks Ketahanan Ekonomi · IKL = Indeks Ketahanan Lingkungan (Ekologi)
        </div>
      </div>
    </div>
  );
}
