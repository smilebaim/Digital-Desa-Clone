import { useEffect, useRef } from "react";
import { useGetDesaSummary, useGetDesaProfil } from "@workspace/api-client-react";

declare const L: any;

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

const STATUS_COLORS: Record<string, string> = {
  Mandiri: "bg-green-100 text-green-800",
  Maju: "bg-blue-100 text-blue-800",
  Berkembang: "bg-yellow-100 text-yellow-800",
  Tertinggal: "bg-orange-100 text-orange-800",
  "Sangat Tertinggal": "bg-red-100 text-red-800",
};

const MARKER_COLORS: Record<string, string> = {
  Mandiri: "#16a34a",
  Maju: "#2563eb",
  Berkembang: "#d97706",
  Tertinggal: "#ea580c",
  "Sangat Tertinggal": "#dc2626",
};

export default function ProfilDesaTab() {
  const { data: summary } = useGetDesaSummary();
  const { data: profil = [] } = useGetDesaProfil();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current || profil.length === 0) return;
    const map = L.map(mapRef.current).setView([5.41, 95.63], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    profil.forEach((d: any) => {
      const color = MARKER_COLORS[d.jenis_desa] ?? "#6b7280";
      const marker = L.circleMarker([d.lat, d.lng], {
        radius: 9,
        fillColor: color,
        color: "#fff",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.9,
      }).addTo(map);
      marker.bindPopup(`
        <div style="min-width:160px">
          <p style="font-weight:700;font-size:13px;margin:0 0 4px">${d.nama}</p>
          <p style="font-size:11px;color:#555;margin:0">Kades: ${d.kepala_desa}</p>
          <p style="font-size:11px;color:#555;margin:0">Penduduk: ${d.jumlah_penduduk.toLocaleString("id-ID")} jiwa</p>
          <p style="font-size:11px;color:#555;margin:0">KK: ${d.jumlah_kk.toLocaleString("id-ID")}</p>
          <p style="font-size:11px;margin:4px 0 0;font-weight:600;color:${color}">${d.jenis_desa}</p>
        </div>
      `);
    });
    mapInstanceRef.current = map;
    return () => { map.remove(); mapInstanceRef.current = null; };
  }, [profil]);

  const fmt = (n: number) => n.toLocaleString("id-ID");

  return (
    <div className="container mx-auto px-4 md:px-6 py-6 space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard icon="fa-house-chimney" value={summary?.totalDesa ?? 0} label="Total Gampong" color="bg-green-600" />
        <KpiCard icon="fa-users" value={fmt(summary?.totalPenduduk ?? 0)} label="Total Penduduk" color="bg-blue-600" />
        <KpiCard icon="fa-house-user" value={fmt(summary?.totalKK ?? 0)} label="Jumlah KK" color="bg-teal-600" />
        <KpiCard icon="fa-ruler-combined" value={`${(summary?.totalLuasHa ?? 0).toLocaleString("id-ID")} Ha`} label="Total Luas Wilayah" color="bg-emerald-600" />
      </div>

      {/* Map + Status Badges */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 border-b flex items-center gap-2">
            <i className="fas fa-map-location-dot text-green-600"></i>
            <h3 className="font-semibold text-gray-800">Peta Sebaran Gampong</h3>
          </div>
          <div ref={mapRef} style={{ height: 340 }} />
          <div className="px-4 py-2 border-t flex flex-wrap gap-3 text-xs">
            {Object.entries(MARKER_COLORS).map(([s, c]) => (
              <span key={s} className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full inline-block" style={{ background: c }} />
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <i className="fas fa-layer-group text-green-600"></i> Status Gampong
          </h3>
          <div className="space-y-3">
            {[
              { label: "Mandiri", count: summary?.desaMandiri ?? 0, color: "bg-green-500" },
              { label: "Maju", count: summary?.desaMaju ?? 0, color: "bg-blue-500" },
              { label: "Berkembang", count: summary?.desaBerkembang ?? 0, color: "bg-yellow-500" },
              { label: "Tertinggal", count: summary?.desaTertinggal ?? 0, color: "bg-orange-500" },
              { label: "Sangat Tertinggal", count: summary?.desaSangatTertinggal ?? 0, color: "bg-red-500" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className={`${item.color} text-white text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0`}>
                  {item.count}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">{item.label}</p>
                  <div className="h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
                    <div
                      className={`${item.color} h-full rounded-full`}
                      style={{ width: `${((item.count / (summary?.totalDesa ?? 1)) * 100).toFixed(0)}%` }}
                    />
                  </div>
                </div>
                <span className="text-xs text-gray-400">{(((item.count) / (summary?.totalDesa ?? 1)) * 100).toFixed(0)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b flex items-center gap-2">
          <i className="fas fa-list text-green-600"></i>
          <h3 className="font-semibold text-gray-800">Daftar Profil Gampong</h3>
          <span className="ml-auto text-xs text-gray-400">{profil.length} gampong</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
              <tr>
                <th className="text-left px-4 py-3">Nama Gampong</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Kepala Desa</th>
                <th className="text-right px-4 py-3">Penduduk</th>
                <th className="text-right px-4 py-3 hidden sm:table-cell">KK</th>
                <th className="text-right px-4 py-3 hidden lg:table-cell">Luas (Ha)</th>
                <th className="text-center px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {profil.map((d: any) => (
                <tr key={d.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-medium text-gray-800">{d.nama}</td>
                  <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{d.kepala_desa}</td>
                  <td className="px-4 py-3 text-right text-gray-700">{fmt(d.jumlah_penduduk)}</td>
                  <td className="px-4 py-3 text-right text-gray-700 hidden sm:table-cell">{fmt(d.jumlah_kk)}</td>
                  <td className="px-4 py-3 text-right text-gray-700 hidden lg:table-cell">{d.luas_ha.toFixed(1)}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[d.jenis_desa] ?? "bg-gray-100 text-gray-700"}`}>
                      {d.jenis_desa}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
