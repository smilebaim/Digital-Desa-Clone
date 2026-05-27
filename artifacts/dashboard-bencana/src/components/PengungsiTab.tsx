import { useGetBencanaPengungsi, useGetBencanaOrangHilang, useGetBencanaMarkers } from "@workspace/api-client-react";
import KpiCard from "./KpiCard";
import LeafletMap from "./LeafletMap";
import { useState, useRef, useEffect, useMemo } from "react";

export default function PengungsiTab() {
  const { data: pengungsi, isLoading: loadingPengungsi } = useGetBencanaPengungsi();
  const { data: orangHilang, isLoading: loadingOrang } = useGetBencanaOrangHilang();
  const { data: markers } = useGetBencanaMarkers();

  const chartDisabilitasRef = useRef<any>(null);
  const chartDisabilitasCanvasRef = useRef<HTMLCanvasElement>(null);
  const chartKKRef = useRef<any>(null);
  const chartKKCanvasRef = useRef<HTMLCanvasElement>(null);

  const [orangPage, setOrangPage] = useState(0);

  const summary = useMemo(() => {
    if (!pengungsi) return { penduduk: 0, kk: 0, disabilitas: 0, pengungsi: 0 };
    return pengungsi.reduce((acc, curr) => ({
      penduduk: acc.penduduk + curr.penduduk,
      kk: acc.kk + curr.kk,
      disabilitas: acc.disabilitas + curr.disabilitas,
      pengungsi: acc.pengungsi + curr.pengungsi
    }), { penduduk: 0, kk: 0, disabilitas: 0, pengungsi: 0 });
  }, [pengungsi]);

  const sortedPengungsi = useMemo(() => {
    if (!pengungsi) return [];
    return [...pengungsi].sort((a, b) => a.kabupaten.localeCompare(b.kabupaten));
  }, [pengungsi]);

  const dicari = orangHilang?.filter(o => o.status === "Dicari").length || 0;
  const ditemukan = orangHilang?.filter(o => o.status === "Ditemukan").length || 0;
  const paginatedOrang = orangHilang?.slice(orangPage * 1, (orangPage + 1) * 1) || [];

  useEffect(() => {
    if (!chartDisabilitasCanvasRef.current || !pengungsi) return;
    const ChartJS = (window as any).Chart;
    if (!ChartJS) return;
    if (chartDisabilitasRef.current) chartDisabilitasRef.current.destroy();

    const data = sortedPengungsi.filter(p => p.disabilitas > 0).slice(0, 10);
    
    chartDisabilitasRef.current = new ChartJS(chartDisabilitasCanvasRef.current, {
      type: 'bar',
      data: {
        labels: data.map(d => d.kabupaten),
        datasets: [{
          label: 'Disabilitas',
          data: data.map(d => d.disabilitas),
          backgroundColor: '#a855f7',
          borderRadius: 4
        }]
      },
      options: { 
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 10, family: 'Inter' } } },
          y: { beginAtZero: true, border: { display: false }, ticks: { font: { size: 10, family: 'Inter' } } }
        }
      }
    });

    return () => chartDisabilitasRef.current?.destroy();
  }, [pengungsi, sortedPengungsi]);

  useEffect(() => {
    if (!chartKKCanvasRef.current || !pengungsi) return;
    const ChartJS = (window as any).Chart;
    if (!ChartJS) return;
    if (chartKKRef.current) chartKKRef.current.destroy();

    const data = sortedPengungsi.slice(0, 10);
    
    chartKKRef.current = new ChartJS(chartKKCanvasRef.current, {
      type: 'bar',
      data: {
        labels: data.map(d => d.kabupaten),
        datasets: [{
          label: 'Data KK',
          data: data.map(d => d.kk),
          backgroundColor: '#ef4444',
          borderRadius: 4
        }]
      },
      options: { 
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 10, family: 'Inter' } } },
          y: { beginAtZero: true, border: { display: false }, ticks: { font: { size: 10, family: 'Inter' } } }
        }
      }
    });

    return () => chartKKRef.current?.destroy();
  }, [pengungsi, sortedPengungsi]);

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6 animate-in fade-in duration-300">
      
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {loadingPengungsi ? (
          [...Array(4)].map((_, i) => <div key={i} className="h-28 bg-gray-200 animate-pulse rounded-xl"></div>)
        ) : (
          <>
            <KpiCard title="Total Penduduk" value={summary.penduduk.toLocaleString()} icon="fa-users" colorClass="bg-blue-100 text-blue-600" />
            <KpiCard title="Total KK" value={summary.kk.toLocaleString()} icon="fa-home" colorClass="bg-green-100 text-green-600" />
            <KpiCard title="Disabilitas" value={summary.disabilitas.toLocaleString()} icon="fa-wheelchair" colorClass="bg-purple-100 text-purple-600" />
            <KpiCard title="Jumlah Pengungsi" value={summary.pengungsi.toLocaleString()} icon="fa-campground" colorClass="bg-orange-100 text-orange-600" />
          </>
        )}
      </div>

      {/* 3 Col Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Orang Hilang Panel */}
        <div className="panel p-4 flex flex-col">
          <h3 className="text-sm font-bold text-gray-700 flex items-center justify-between mb-4 border-b pb-2">
            <span className="flex items-center gap-2"><i className="fas fa-user-slash text-red-500"></i> Orang Hilang</span>
            <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs font-bold">{orangHilang?.length || 0} Total</span>
          </h3>
          
          <div className="flex gap-2 mb-4">
            <div className="flex-1 bg-yellow-50 border border-yellow-200 rounded p-2 text-center">
              <div className="text-xs text-yellow-700 font-semibold mb-1">Dicari</div>
              <div className="text-lg font-bold text-yellow-800">{dicari}</div>
            </div>
            <div className="flex-1 bg-green-50 border border-green-200 rounded p-2 text-center">
              <div className="text-xs text-green-700 font-semibold mb-1">Ditemukan</div>
              <div className="text-lg font-bold text-green-800">{ditemukan}</div>
            </div>
          </div>

          <div className="flex-1 bg-gray-50 rounded border border-gray-200 p-4 relative min-h-[140px]">
            {loadingOrang ? (
              <div className="absolute inset-0 flex items-center justify-center"><div className="spinner"></div></div>
            ) : paginatedOrang.length > 0 ? (
              <div className="flex flex-col h-full justify-center">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-gray-800 text-lg">{paginatedOrang[0].nama}</h4>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${
                    paginatedOrang[0].status === 'Dicari' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                  }`}>{paginatedOrang[0].status}</span>
                </div>
                <div className="text-sm text-gray-600 mb-1"><i className="fas fa-id-card w-5 text-center text-gray-400"></i> Usia {paginatedOrang[0].usia} Tahun</div>
                <div className="text-sm text-gray-600 mb-1"><i className="fas fa-map-marker-alt w-5 text-center text-gray-400"></i> {paginatedOrang[0].kecamatan}, {paginatedOrang[0].kabupaten}</div>
                <div className="text-sm text-gray-600"><i className="fas fa-calendar-alt w-5 text-center text-gray-400"></i> Sejak {new Date(paginatedOrang[0].tanggal).toLocaleDateString('id-ID')}</div>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-gray-500">Tidak ada data</div>
            )}
          </div>
          
          <div className="flex justify-between items-center mt-3 pt-3 border-t">
            <span className="text-xs font-semibold text-gray-500">
              {orangHilang?.length ? `${orangPage + 1} / ${orangHilang.length}` : '0 / 0'}
            </span>
            <div className="flex gap-2">
              <button 
                onClick={() => setOrangPage(p => Math.max(0, p - 1))}
                disabled={orangPage === 0}
                className="w-8 h-8 flex items-center justify-center rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-gray-600 transition"
              >
                <i className="fas fa-arrow-left text-xs"></i>
              </button>
              <button 
                onClick={() => setOrangPage(p => Math.min((orangHilang?.length || 1) - 1, p + 1))}
                disabled={orangPage >= (orangHilang?.length || 1) - 1}
                className="w-8 h-8 flex items-center justify-center rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-gray-600 transition"
              >
                <i className="fas fa-arrow-right text-xs"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Chart Disabilitas */}
        <div className="panel p-4">
          <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2 mb-4 border-b pb-2">
            <i className="fas fa-wheelchair text-red-500"></i> Data Disabilitas
          </h3>
          <div className="h-[250px] chart-container relative">
            {loadingPengungsi && <div className="absolute inset-0 flex items-center justify-center"><div className="spinner"></div></div>}
            <canvas ref={chartDisabilitasCanvasRef}></canvas>
          </div>
        </div>

        {/* Chart KK */}
        <div className="panel p-4">
          <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2 mb-4 border-b pb-2">
            <i className="fas fa-home text-red-500"></i> Data KK per Wilayah
          </h3>
          <div className="h-[250px] chart-container relative">
            {loadingPengungsi && <div className="absolute inset-0 flex items-center justify-center"><div className="spinner"></div></div>}
            <canvas ref={chartKKCanvasRef}></canvas>
          </div>
        </div>

      </div>

      {/* Map + Table Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="panel p-0 overflow-hidden relative">
          <div className="absolute top-4 left-4 z-[400] bg-white px-3 py-2 rounded shadow text-sm font-bold text-gray-700 border">
            <i className="fas fa-map-marked-alt text-red-600 mr-2"></i>Peta Persebaran
          </div>
          <LeafletMap markers={markers} height="400px" zoom={8} center={[4.695135, 96.749397]} />
        </div>

        <div className="panel p-0 overflow-hidden flex flex-col">
          <div className="p-4 border-b bg-gray-50">
            <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <i className="fas fa-table text-blue-500"></i> Data Penduduk & Pengungsi
            </h3>
          </div>
          <div className="overflow-auto max-h-[400px] flex-1">
            <table className="data-table">
              <thead className="bg-white sticky top-0 shadow-sm z-10">
                <tr>
                  <th>Kabupaten/Kota</th>
                  <th className="text-right">Penduduk</th>
                  <th className="text-right">KK</th>
                  <th className="text-right">Pengungsi</th>
                </tr>
              </thead>
              <tbody>
                {loadingPengungsi ? (
                  <tr><td colSpan={4} className="text-center py-8"><div className="spinner mx-auto"></div></td></tr>
                ) : sortedPengungsi.length === 0 ? (
                  <tr><td colSpan={4} className="text-center py-8 text-gray-500">Tidak ada data</td></tr>
                ) : (
                  sortedPengungsi.map(p => (
                    <tr key={p.id}>
                      <td className="font-bold text-gray-800">{p.kabupaten}</td>
                      <td className="text-right font-medium text-gray-600">{p.penduduk.toLocaleString()}</td>
                      <td className="text-right font-medium text-gray-600">{p.kk.toLocaleString()}</td>
                      <td className="text-right font-bold text-red-600 bg-red-50/50">{p.pengungsi.toLocaleString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
    </div>
  );
}