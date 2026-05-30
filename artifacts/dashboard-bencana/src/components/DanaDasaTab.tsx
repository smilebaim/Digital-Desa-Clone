import { useEffect, useRef } from "react";
import { useGetDesaSummary, useGetDesaDana } from "@workspace/api-client-react";

declare const Chart: any;

function KpiCard({ icon, value, label, sub, color }: { icon: string; value: string; label: string; sub?: string; color: string }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-start gap-4">
      <div className={`${color} text-white rounded-xl p-3 flex-shrink-0`}>
        <i className={`fas ${icon} text-xl`}></i>
      </div>
      <div className="min-w-0">
        <p className="text-xl font-bold text-gray-800 truncate">{value}</p>
        <p className="text-xs text-gray-500 mt-0.5">{label}</p>
        {sub && <p className="text-xs text-green-600 font-medium mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

function rp(n: number) {
  if (n >= 1_000_000_000) return `Rp ${(n / 1_000_000_000).toFixed(2)} M`;
  if (n >= 1_000_000) return `Rp ${(n / 1_000_000).toFixed(0)} Jt`;
  return `Rp ${n.toLocaleString("id-ID")}`;
}

export default function DanaDasaTab() {
  const { data: summary } = useGetDesaSummary();
  const { data: dana = [] } = useGetDesaDana();
  const barRef = useRef<HTMLCanvasElement>(null);
  const pieRef = useRef<HTMLCanvasElement>(null);
  const barChart = useRef<any>(null);
  const pieChart = useRef<any>(null);

  useEffect(() => {
    if (!barRef.current || dana.length === 0) return;
    if (barChart.current) barChart.current.destroy();
    const labels = dana.map((d: any) => d.nama_desa.replace("Gampong ", ""));
    barChart.current = new Chart(barRef.current, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Alokasi",
            data: dana.map((d: any) => d.alokasi),
            backgroundColor: "rgba(37,99,235,0.7)",
            borderRadius: 4,
          },
          {
            label: "Realisasi",
            data: dana.map((d: any) => d.realisasi),
            backgroundColor: "rgba(22,163,74,0.8)",
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: "top" } },
        scales: {
          y: {
            ticks: {
              callback: (v: number) => `Rp ${(v / 1_000_000).toFixed(0)} Jt`,
            },
          },
          x: { ticks: { font: { size: 10 } } },
        },
      },
    });
    return () => { barChart.current?.destroy(); };
  }, [dana]);

  useEffect(() => {
    if (!pieRef.current || dana.length === 0) return;
    if (pieChart.current) pieChart.current.destroy();
    const avgInfra = dana.reduce((a: number, d: any) => a + d.infra_pct, 0) / dana.length;
    const avgPemberdayaan = dana.reduce((a: number, d: any) => a + d.pemberdayaan_pct, 0) / dana.length;
    const avgOperasional = dana.reduce((a: number, d: any) => a + d.operasional_pct, 0) / dana.length;
    pieChart.current = new Chart(pieRef.current, {
      type: "doughnut",
      data: {
        labels: ["Infrastruktur", "Pemberdayaan", "Operasional"],
        datasets: [{
          data: [avgInfra, avgPemberdayaan, avgOperasional],
          backgroundColor: ["#2563eb", "#16a34a", "#d97706"],
          borderWidth: 2,
          borderColor: "#fff",
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom" },
          tooltip: {
            callbacks: { label: (ctx: any) => ` ${ctx.label}: ${ctx.raw.toFixed(1)}%` },
          },
        },
      },
    });
    return () => { pieChart.current?.destroy(); };
  }, [dana]);

  const totalAlokasi = dana.reduce((a: number, d: any) => a + d.alokasi, 0);
  const totalRealisasi = dana.reduce((a: number, d: any) => a + d.realisasi, 0);
  const desaDiAtas90 = dana.filter((d: any) => d.persen_realisasi >= 90).length;

  return (
    <div className="container mx-auto px-4 md:px-6 py-6 space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard icon="fa-sack-dollar" value={rp(totalAlokasi)} label="Total Alokasi 2024" color="bg-blue-600" />
        <KpiCard icon="fa-circle-check" value={rp(totalRealisasi)} label="Total Realisasi" sub={`${((totalRealisasi / totalAlokasi) * 100).toFixed(1)}% terserap`} color="bg-green-600" />
        <KpiCard icon="fa-percent" value={`${summary?.rataRealisasiPct?.toFixed(1) ?? 0}%`} label="Rata-rata Realisasi" color="bg-teal-600" />
        <KpiCard icon="fa-trophy" value={String(desaDiAtas90)} label="Gampong ≥90% Realisasi" color="bg-emerald-600" />
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <i className="fas fa-chart-bar text-blue-600"></i> Alokasi vs Realisasi per Gampong (Rp)
          </h3>
          <div style={{ height: 300 }}>
            <canvas ref={barRef} />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <i className="fas fa-chart-pie text-green-600"></i> Distribusi Penggunaan
          </h3>
          <div style={{ height: 220 }}>
            <canvas ref={pieRef} />
          </div>
          <p className="text-xs text-gray-400 text-center mt-2">Rata-rata proporsi seluruh gampong</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b flex items-center gap-2">
          <i className="fas fa-coins text-green-600"></i>
          <h3 className="font-semibold text-gray-800">Rincian Dana Desa 2024</h3>
          <span className="ml-auto text-xs text-gray-400">{dana.length} gampong</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
              <tr>
                <th className="text-left px-4 py-3">Gampong</th>
                <th className="text-right px-4 py-3">Alokasi</th>
                <th className="text-right px-4 py-3">Realisasi</th>
                <th className="text-right px-4 py-3">%</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[...dana].sort((a: any, b: any) => b.persen_realisasi - a.persen_realisasi).map((d: any) => {
                const pct = d.persen_realisasi;
                const barColor = pct >= 90 ? "bg-green-500" : pct >= 75 ? "bg-yellow-500" : "bg-red-500";
                return (
                  <tr key={d.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 font-medium text-gray-800">{d.nama_desa.replace("Gampong ", "")}</td>
                    <td className="px-4 py-3 text-right text-gray-600">{rp(d.alokasi)}</td>
                    <td className="px-4 py-3 text-right text-gray-700 font-medium">{rp(d.realisasi)}</td>
                    <td className="px-4 py-3 text-right font-bold" style={{ color: pct >= 90 ? "#16a34a" : pct >= 75 ? "#d97706" : "#dc2626" }}>
                      {pct.toFixed(1)}%
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden w-32">
                        <div className={`${barColor} h-full rounded-full`} style={{ width: `${Math.min(pct, 100)}%` }} />
                      </div>
                    </td>
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
