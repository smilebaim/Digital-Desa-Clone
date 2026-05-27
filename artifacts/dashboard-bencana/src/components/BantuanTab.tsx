import { useGetBencanaBantuan, useGetBencanaSummary } from "@workspace/api-client-react";
import KpiCard from "./KpiCard";
import LeafletMap from "./LeafletMap";
import { useState, useRef, useEffect, useMemo } from "react";

export default function BantuanTab() {
  const { data: summary, isLoading: loadingSummary } = useGetBencanaSummary();
  const { data: bantuan, isLoading: loadingBantuan } = useGetBencanaBantuan();
  
  const [filterKab, setFilterKab] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const chartStatusRef = useRef<any>(null);
  const chartStatusCanvasRef = useRef<HTMLCanvasElement>(null);
  const chartKabRef = useRef<any>(null);
  const chartKabCanvasRef = useRef<HTMLCanvasElement>(null);

  const kabs = useMemo(() => Array.from(new Set(bantuan?.map(b => b.kabupaten) || [])).sort(), [bantuan]);
  const statuses = [
    { value: "kuning", label: "Sudah Distribusi" },
    { value: "biru", label: "Dalam Proses" },
    { value: "biru_keabuan", label: "Tertunda" },
    { value: "putih", label: "Belum Distribusi" }
  ];

  const filteredBantuan = useMemo(() => {
    if (!bantuan) return [];
    return bantuan.filter(b => 
      (filterKab === "all" || b.kabupaten === filterKab) &&
      (filterStatus === "all" || b.warna === filterStatus)
    );
  }, [bantuan, filterKab, filterStatus]);

  useEffect(() => {
    if (!chartStatusCanvasRef.current || !summary) return;
    const ChartJS = (window as any).Chart;
    if (!ChartJS) return;
    if (chartStatusRef.current) chartStatusRef.current.destroy();

    const data = summary.bantuan;
    chartStatusRef.current = new ChartJS(chartStatusCanvasRef.current, {
      type: 'doughnut',
      data: {
        labels: ['Selesai', 'Proses', 'Tertunda', 'Pending'],
        datasets: [{
          data: [data.kuning, data.biru, data.abu, data.putih],
          backgroundColor: ['#eab308', '#3b82f6', '#9ca3af', '#f3f4f6'],
          borderWidth: 1,
          borderColor: '#ffffff'
        }]
      },
      options: { 
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 10, family: 'Inter' } } } },
        cutout: '65%'
      }
    });

    return () => chartStatusRef.current?.destroy();
  }, [summary]);

  useEffect(() => {
    if (!chartKabCanvasRef.current || !bantuan) return;
    const ChartJS = (window as any).Chart;
    if (!ChartJS) return;
    if (chartKabRef.current) chartKabRef.current.destroy();

    const counts = bantuan.reduce((acc, curr) => {
      acc[curr.kabupaten] = (acc[curr.kabupaten] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5);

    chartKabRef.current = new ChartJS(chartKabCanvasRef.current, {
      type: 'bar',
      data: {
        labels: sorted.map(s => s[0]),
        datasets: [{
          label: 'Jumlah Desa',
          data: sorted.map(s => s[1]),
          backgroundColor: '#3b82f6',
          borderRadius: 4
        }]
      },
      options: { 
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 10, family: 'Inter' }, maxRotation: 45, minRotation: 45 } },
          y: { beginAtZero: true, border: { display: false }, ticks: { font: { size: 10, family: 'Inter' } } }
        }
      }
    });

    return () => chartKabRef.current?.destroy();
  }, [bantuan]);

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6 animate-in fade-in duration-300">
      
      {/* Horizontal KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {loadingSummary ? (
          [...Array(5)].map((_, i) => <div key={i} className="h-16 bg-gray-200 animate-pulse rounded-xl"></div>)
        ) : (
          <>
            <KpiCard horizontal title="Total Desa" value={summary?.bantuan.totalDesa || 0} icon="fa-map-marker-alt" colorClass="bg-gray-100 text-gray-600" />
            <KpiCard horizontal title="Selesai" value={summary?.bantuan.kuning || 0} icon="fa-check-circle" colorClass="bg-yellow-100 text-yellow-600" />
            <KpiCard horizontal title="Proses" value={summary?.bantuan.biru || 0} icon="fa-clock" colorClass="bg-blue-100 text-blue-600" />
            <KpiCard horizontal title="Tertunda" value={summary?.bantuan.abu || 0} icon="fa-pause-circle" colorClass="bg-gray-200 text-gray-600" />
            <KpiCard horizontal title="Pending" value={summary?.bantuan.putih || 0} icon="fa-hourglass-start" colorClass="bg-white border-2 border-gray-200 text-gray-400" />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Col */}
        <div className="lg:col-span-1 space-y-6">
          <div className="panel p-4">
            <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2 mb-4 border-b pb-2">
              <i className="fas fa-chart-pie text-blue-500"></i> Status Distribusi
            </h3>
            <div className="h-[200px] chart-container relative">
              {loadingSummary && <div className="absolute inset-0 flex items-center justify-center"><div className="spinner"></div></div>}
              <canvas ref={chartStatusCanvasRef}></canvas>
            </div>
          </div>
          
          <div className="panel p-4">
            <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2 mb-4 border-b pb-2">
              <i className="fas fa-chart-bar text-blue-500"></i> Top Kabupaten
            </h3>
            <div className="h-[180px] chart-container relative">
              {loadingBantuan && <div className="absolute inset-0 flex items-center justify-center"><div className="spinner"></div></div>}
              <canvas ref={chartKabCanvasRef}></canvas>
            </div>
          </div>
        </div>

        {/* Center Map */}
        <div className="lg:col-span-2 panel p-0 overflow-hidden relative min-h-[500px]">
          <div className="absolute top-4 left-4 z-[400] bg-white px-3 py-2 rounded shadow text-sm font-bold text-gray-700 border">
            <i className="fas fa-map-marked-alt text-blue-600 mr-2"></i>Peta Persebaran Bantuan
          </div>
          {/* Map needs to support bantuan markers coloring. We rely on LeafletMap doing nothing extra for now since we don't have lat/lng in BantuanDesaRecord. But we place the map container. */}
          <LeafletMap height="100%" zoom={8} center={[4.695135, 96.749397]} />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[400] bg-white/40">
            <span className="bg-white/90 px-4 py-2 rounded-full shadow text-sm font-medium text-gray-600 backdrop-blur-sm border">
              <i className="fas fa-info-circle mr-2 text-blue-500"></i>Data Spasial Desa Dalam Penyiapan
            </span>
          </div>
        </div>

        {/* Right Col */}
        <div className="lg:col-span-1 space-y-6">
          <div className="panel p-4">
            <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2 mb-4 border-b pb-2">
              <i className="fas fa-palette text-blue-500"></i> Legenda Warna
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <div className="w-5 h-5 rounded-full bg-yellow-500 shrink-0 mt-0.5 shadow-sm border border-yellow-200"></div>
                <div>
                  <p className="text-sm font-bold text-gray-800">Kuning</p>
                  <p className="text-xs text-gray-500">Sudah distribusi ke sasaran</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="w-5 h-5 rounded-full bg-blue-500 shrink-0 mt-0.5 shadow-sm border border-blue-200"></div>
                <div>
                  <p className="text-sm font-bold text-gray-800">Biru</p>
                  <p className="text-xs text-gray-500">Dalam proses perjalanan / penyiapan</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="w-5 h-5 rounded-full bg-gray-400 shrink-0 mt-0.5 shadow-sm border border-gray-300"></div>
                <div>
                  <p className="text-sm font-bold text-gray-800">Abu-abu</p>
                  <p className="text-xs text-gray-500">Tertunda / Gagal distribusi</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="w-5 h-5 rounded-full bg-white shrink-0 mt-0.5 shadow-sm border-2 border-gray-300"></div>
                <div>
                  <p className="text-sm font-bold text-gray-800">Putih</p>
                  <p className="text-xs text-gray-500">Belum distribusi (Pending)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Table */}
      <div className="panel p-0 overflow-hidden">
        <div className="p-4 border-b bg-gray-50 flex flex-col md:flex-row items-center justify-between gap-4">
          <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2 shrink-0">
            <i className="fas fa-table text-blue-500"></i> Data Bantuan Logistik
          </h3>
          
          <div className="flex gap-3 w-full md:w-auto">
            <select 
              value={filterKab} 
              onChange={e => setFilterKab(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 md:w-48"
            >
              <option value="all">Semua Kabupaten</option>
              {kabs.map(k => <option key={k} value={k}>{k}</option>)}
            </select>
            <select 
              value={filterStatus} 
              onChange={e => setFilterStatus(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 md:w-48"
            >
              <option value="all">Semua Status</option>
              {statuses.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto max-h-80">
          <table className="data-table relative">
            <thead className="bg-white sticky top-0 z-10 shadow-sm">
              <tr>
                <th className="text-center w-12">No</th>
                <th>Desa</th>
                <th>Kecamatan</th>
                <th>Kabupaten</th>
                <th>Satuan</th>
                <th className="text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {loadingBantuan ? (
                <tr><td colSpan={6} className="text-center py-8"><div className="spinner mx-auto"></div></td></tr>
              ) : filteredBantuan.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-8 text-gray-500">Tidak ada data bantuan</td></tr>
              ) : (
                filteredBantuan.map((b, i) => (
                  <tr key={b.id}>
                    <td className="text-center font-medium text-gray-500">{i + 1}</td>
                    <td className="font-bold text-gray-800">{b.desa}</td>
                    <td>{b.kecamatan}</td>
                    <td>{b.kabupaten}</td>
                    <td className="text-gray-600 font-medium">{b.satuan}</td>
                    <td className="text-center">
                      {b.warna === "kuning" && <span className="bg-yellow-100 text-yellow-800 border border-yellow-200 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide inline-flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>Selesai</span>}
                      {b.warna === "biru" && <span className="bg-blue-100 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide inline-flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>Proses</span>}
                      {b.warna === "biru_keabuan" && <span className="bg-gray-100 text-gray-700 border border-gray-300 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide inline-flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div>Tertunda</span>}
                      {b.warna === "putih" && <span className="bg-white text-gray-600 border border-gray-300 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide inline-flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>Pending</span>}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}