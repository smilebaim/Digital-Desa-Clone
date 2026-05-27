import { useGetBencanaSummary, useGetBencanaDampak, useGetBencanaPertanian, useGetBencanaMarkers } from "@workspace/api-client-react";
import KpiCard from "./KpiCard";
import LeafletMap from "./LeafletMap";
import { useState, useRef, useEffect, useMemo } from "react";

export default function DampakTab() {
  const { data: summary, isLoading: loadingSummary } = useGetBencanaSummary();
  const { data: dampak, isLoading: loadingDampak } = useGetBencanaDampak();
  const { data: pertanian, isLoading: loadingPertanian } = useGetBencanaPertanian();
  const { data: markers } = useGetBencanaMarkers();
  
  const chartStatusCanvasRef = useRef<HTMLCanvasElement>(null);
  const chartStatusRef = useRef<any>(null);
  
  const chartTopCanvasRef = useRef<HTMLCanvasElement>(null);
  const chartTopRef = useRef<any>(null);

  const [sektorPage, setSektorPage] = useState(0);

  // Status Chart
  useEffect(() => {
    if (!chartStatusCanvasRef.current || !dampak) return;
    const ChartJS = (window as any).Chart;
    if (!ChartJS) return;
    
    if (chartStatusRef.current) { chartStatusRef.current.destroy(); }
    
    const counts = { Siaga: 0, Waspada: 0, Aman: 0 };
    dampak.forEach(d => {
      if (d.status === "Siaga") counts.Siaga++;
      else if (d.status === "Waspada") counts.Waspada++;
      else counts.Aman++;
    });

    chartStatusRef.current = new ChartJS(chartStatusCanvasRef.current, {
      type: 'doughnut',
      data: {
        labels: ['Siaga', 'Waspada', 'Aman'],
        datasets: [{
          data: [counts.Siaga, counts.Waspada, counts.Aman],
          backgroundColor: ['#dc2626', '#f97316', '#22c55e'],
          borderWidth: 0
        }]
      },
      options: { 
        responsive: true, 
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11, family: 'Inter' } } }
        },
        cutout: '65%'
      }
    });
    
    return () => { chartStatusRef.current?.destroy(); };
  }, [dampak]);

  // Top 5 Chart
  useEffect(() => {
    if (!chartTopCanvasRef.current || !dampak) return;
    const ChartJS = (window as any).Chart;
    if (!ChartJS) return;
    
    if (chartTopRef.current) { chartTopRef.current.destroy(); }
    
    // Aggregate by kabupaten
    const agg = dampak.reduce((acc, curr) => {
      acc[curr.kabupaten] = (acc[curr.kabupaten] || 0) + curr.korbanJiwa + curr.korbanLuka;
      return acc;
    }, {} as Record<string, number>);
    
    const sorted = Object.entries(agg).sort((a, b) => b[1] - a[1]).slice(0, 5);

    chartTopRef.current = new ChartJS(chartTopCanvasRef.current, {
      type: 'bar',
      data: {
        labels: sorted.map(s => s[0]),
        datasets: [{
          label: 'Total Korban',
          data: sorted.map(s => s[1]),
          backgroundColor: '#dc2626',
          borderRadius: 4
        }]
      },
      options: { 
        responsive: true, 
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 10, family: 'Inter' } } },
          y: { beginAtZero: true, border: { display: false }, ticks: { font: { size: 10, family: 'Inter' } } }
        }
      }
    });
    
    return () => { chartTopRef.current?.destroy(); };
  }, [dampak]);

  const sektorItems = summary?.rekapCluster?.perSektor || [];
  const paginatedSektor = sektorItems.slice(sektorPage * 3, (sektorPage + 1) * 3);
  const totalSektorPages = Math.ceil(sektorItems.length / 3);

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6 animate-in fade-in duration-300">
      
      {/* 6 KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {loadingSummary ? (
          [...Array(6)].map((_, i) => <div key={i} className="h-28 bg-gray-200 animate-pulse rounded-xl"></div>)
        ) : (
          <>
            <KpiCard title="Total Korban" value={summary?.totalKorban ?? 0} icon="fa-user-injured" colorClass="bg-red-100 text-red-600" />
            <KpiCard title="Pengungsi" value={summary?.totalPengungsi ?? 0} icon="fa-campground" colorClass="bg-orange-100 text-orange-600" />
            <KpiCard title="Titik Pengungsian" value={summary?.titikPengungsian ?? 0} icon="fa-map-pin" colorClass="bg-blue-100 text-blue-600" />
            <KpiCard title="Rumah Rusak" value={summary?.rumahRusak ?? 0} icon="fa-home" colorClass="bg-red-100 text-red-600" />
            <KpiCard title="Sawah (Ha)" value={summary?.sawahHa ?? 0} icon="fa-seedling" colorClass="bg-green-100 text-green-600" />
            <KpiCard title="Kab. Terdampak" value={summary?.kabupatenTerdampak ?? 0} icon="fa-city" colorClass="bg-purple-100 text-purple-600" />
          </>
        )}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6">
          <div className="panel p-4">
            <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2 mb-4">
              <i className="fas fa-chart-pie text-red-500"></i> Status Wilayah
            </h3>
            <div className="h-[200px] chart-container relative">
              {loadingDampak && <div className="absolute inset-0 flex items-center justify-center"><div className="spinner"></div></div>}
              <canvas ref={chartStatusCanvasRef}></canvas>
            </div>
          </div>
          
          <div className="panel p-4">
            <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2 mb-4">
              <i className="fas fa-chart-bar text-red-500"></i> Top 5 Wilayah Terdampak
            </h3>
            <div className="h-[200px] chart-container relative">
              {loadingDampak && <div className="absolute inset-0 flex items-center justify-center"><div className="spinner"></div></div>}
              <canvas ref={chartTopCanvasRef}></canvas>
            </div>
          </div>
        </div>

        {/* Center Column: Map */}
        <div className="lg:col-span-2 panel p-0 overflow-hidden relative">
          <div className="absolute top-4 left-4 z-[400] bg-white px-3 py-2 rounded shadow text-sm font-bold text-gray-700 border">
            <i className="fas fa-map-marked-alt text-red-600 mr-2"></i>Peta Persebaran Bencana
          </div>
          <LeafletMap markers={markers} height="520px" zoom={8} center={[4.695135, 96.749397]} />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 space-y-6">
          <div className="panel p-4">
            <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2 mb-4 border-b pb-2">
              <i className="fas fa-info-circle text-red-500"></i> Ringkasan Kerusakan
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Fasilitas Umum Rusak</p>
                <div className="text-lg font-bold text-gray-800">{summary?.fasumRusak ?? 0} <span className="text-xs font-normal text-gray-500">Unit</span></div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Kebun Terdampak</p>
                <div className="text-lg font-bold text-gray-800">{summary?.kebunHa ?? 0} <span className="text-xs font-normal text-gray-500">Hektar</span></div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Tambak Terdampak</p>
                <div className="text-lg font-bold text-gray-800">{summary?.tambakHa ?? 0} <span className="text-xs font-normal text-gray-500">Hektar</span></div>
              </div>
            </div>
          </div>

          <div className="panel p-4">
            <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2 mb-4 border-b pb-2">
              <i className="fas fa-layer-group text-red-500"></i> Rekap Cluster
            </h3>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-red-50 p-2 rounded border border-red-100">
                <p className="text-[10px] text-red-600 uppercase font-semibold">Kerusakan</p>
                <p className="text-sm font-bold text-red-800">{summary?.rekapCluster.kerusakan ?? 0}</p>
              </div>
              <div className="bg-orange-50 p-2 rounded border border-orange-100">
                <p className="text-[10px] text-orange-600 uppercase font-semibold">Kerugian</p>
                <p className="text-sm font-bold text-orange-800">{summary?.rekapCluster.kerugian ?? 0}</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded border mb-4 text-center">
              <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Total</p>
              <p className="text-xl font-bold text-gray-800">{summary?.rekapCluster.total ?? 0}</p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-xs font-bold text-gray-600">Per Sektor</h4>
                <div className="flex gap-1">
                  <button 
                    disabled={sektorPage === 0}
                    onClick={() => setSektorPage(p => p - 1)}
                    className="w-6 h-6 rounded bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-50 text-xs flex items-center justify-center transition"
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <button 
                    disabled={sektorPage >= totalSektorPages - 1}
                    onClick={() => setSektorPage(p => p + 1)}
                    className="w-6 h-6 rounded bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-50 text-xs flex items-center justify-center transition"
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                {paginatedSektor.map((s, i) => (
                  <div key={i} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded border border-gray-100">
                    <span className="text-gray-600 font-medium truncate pr-2">{s.nama}</span>
                    <span className="font-bold text-gray-800 shrink-0">{s.nilai}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Data Table */}
      <div className="panel p-0 overflow-hidden">
        <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2">
            <i className="fas fa-tractor text-green-500"></i> Data Kerusakan Pertanian
          </h3>
          <div className="flex gap-2 text-xs font-medium">
            <span className="bg-white px-2 py-1 rounded border shadow-sm text-gray-600">Total: {pertanian?.length || 0}</span>
            <span className="bg-red-50 text-red-700 px-2 py-1 rounded border border-red-100">Berat</span>
            <span className="bg-yellow-50 text-yellow-700 px-2 py-1 rounded border border-yellow-100">Sedang</span>
            <span className="bg-green-50 text-green-700 px-2 py-1 rounded border border-green-100">Ringan</span>
          </div>
        </div>
        
        <div className="overflow-x-auto max-h-64">
          <table className="data-table">
            <thead className="bg-white sticky top-0 z-10">
              <tr>
                <th>Nama Kelompok/Pemilik</th>
                <th>Kabupaten</th>
                <th>Kecamatan</th>
                <th className="text-right">Volume</th>
                <th className="text-right">Kerugian</th>
                <th className="text-center">Kondisi</th>
              </tr>
            </thead>
            <tbody>
              {loadingPertanian ? (
                <tr><td colSpan={6} className="text-center py-8"><div className="spinner mx-auto"></div></td></tr>
              ) : pertanian?.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-8 text-gray-500">Tidak ada data</td></tr>
              ) : (
                pertanian?.map(p => (
                  <tr key={p.id}>
                    <td className="font-medium text-gray-800">{p.nama}</td>
                    <td>{p.kabupaten}</td>
                    <td>{p.kecamatan}</td>
                    <td className="text-right font-medium">{p.volume}</td>
                    <td className="text-right font-medium text-orange-600">{p.kerugian.toLocaleString()}</td>
                    <td className="text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        p.kondisi === 'Berat' ? 'bg-red-100 text-red-700' :
                        p.kondisi === 'Sedang' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {p.kondisi}
                      </span>
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