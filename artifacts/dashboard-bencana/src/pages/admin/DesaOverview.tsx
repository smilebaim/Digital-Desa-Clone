"use client";

import { useGetDesaSummary, useGetDesaProfil, useGetDesaDana, useGetDesaIDM, useGetDesaPelayanan } from "@workspace/api-client-react";

function StatCard({ icon, value, label, color }: { icon: string; value: string | number; label: string; color: string }) {
  return (
    <div className={`${color} rounded-xl p-4 text-white`}>
      <div className="flex items-center gap-3">
        <i className={`fas ${icon} text-2xl opacity-80`}></i>
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm opacity-80">{label}</p>
        </div>
      </div>
    </div>
  );
}

function CountCard({ icon, value, label, color }: { icon: string; value: number; label: string; color: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3">
      <div className={`${color} text-white p-2.5 rounded-lg`}>
        <i className={`fas ${icon} text-lg`}></i>
      </div>
      <div>
        <p className="text-xl font-bold text-gray-800">{value}</p>
        <p className="text-xs text-gray-500">{label}</p>
      </div>
    </div>
  );
}

export default function DesaOverview() {
  const { data: summary } = useGetDesaSummary();
  const { data: profil = [] } = useGetDesaProfil();
  const { data: dana = [] } = useGetDesaDana();
  const { data: idm = [] } = useGetDesaIDM();
  const { data: pelayanan = [] } = useGetDesaPelayanan();

  const fmt = (n: number) => n.toLocaleString("id-ID");
  const rp = (n: number) => n >= 1e9 ? `Rp ${(n / 1e9).toFixed(2)} M` : `Rp ${fmt(n)}`;
  const totalDana = dana.reduce((a: number, d: any) => a + d.alokasi, 0);

  return (
    <div className="space-y-6">
      {/* KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon="fa-house-chimney" value={summary?.totalDesa ?? 0} label="Total Gampong" color="bg-green-600" />
        <StatCard icon="fa-users" value={fmt(summary?.totalPenduduk ?? 0)} label="Total Penduduk" color="bg-blue-600" />
        <StatCard icon="fa-sack-dollar" value={rp(totalDana)} label="Total Dana Desa" color="bg-teal-600" />
        <StatCard icon="fa-star" value={(summary?.rataSkorIDM ?? 0).toFixed(4)} label="Rata-rata IDM" color="bg-emerald-600" />
      </div>

      {/* Record Counts */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <CountCard icon="fa-map-location-dot" value={profil.length} label="Rekaman Profil" color="bg-green-500" />
        <CountCard icon="fa-coins" value={dana.length} label="Rekaman Dana" color="bg-blue-500" />
        <CountCard icon="fa-chart-line" value={idm.length} label="Rekaman IDM" color="bg-purple-500" />
        <CountCard icon="fa-hand-holding-heart" value={pelayanan.length} label="Rekaman Pelayanan" color="bg-orange-500" />
      </div>

      {/* IDM Status Summary */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h3 className="font-semibold text-gray-800 mb-4">Distribusi Status IDM</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { label: "Mandiri",          count: summary?.desaMandiri ?? 0,          color: "bg-green-500" },
            { label: "Maju",             count: summary?.desaMaju ?? 0,             color: "bg-blue-500" },
            { label: "Berkembang",       count: summary?.desaBerkembang ?? 0,       color: "bg-yellow-500" },
            { label: "Tertinggal",       count: summary?.desaTertinggal ?? 0,       color: "bg-orange-500" },
            { label: "Sangat Tertinggal", count: summary?.desaSangatTertinggal ?? 0, color: "bg-red-500" },
          ].map((item) => (
            <div key={item.label} className="text-center p-3 bg-gray-50 rounded-lg">
              <p className={`text-2xl font-bold ${item.color.replace("bg-", "text-")}`}>{item.count}</p>
              <p className="text-xs text-gray-500 mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
        <i className="fas fa-circle-info mr-2"></i>
        Data tersimpan di memori server dan akan reset saat server restart. Hubungkan database untuk penyimpanan permanen.
      </div>
    </div>
  );
}
