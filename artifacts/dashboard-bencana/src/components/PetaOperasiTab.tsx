import { useGetBencanaMarkers, useGetBencanaSummary } from "@workspace/api-client-react";
import { useEffect, useRef, useState } from "react";

export default function PetaOperasiTab() {
  const { data: markers, isLoading: loadingMarkers } = useGetBencanaMarkers();
  const { data: summary } = useGetBencanaSummary();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersLayerRef = useRef<any>(null);
  const poskoLayerRef = useRef<any>(null);

  const [showPosko, setShowPosko] = useState(true);
  const [showJaringan, setShowJaringan] = useState(true); // purely visual for toggles

  useEffect(() => {
    if (!mapRef.current) return;
    if (mapInstanceRef.current) return;

    const L = (window as any).L;
    if (!L) return;

    const map = L.map(mapRef.current, {
      center: [4.695135, 96.749397],
      zoom: 8,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    mapInstanceRef.current = map;
    markersLayerRef.current = L.layerGroup().addTo(map);
    poskoLayerRef.current = L.layerGroup().addTo(map);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markersLayerRef.current = null;
        poskoLayerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current || !markers) return;
    const L = (window as any).L;
    if (!L) return;

    markersLayerRef.current?.clearLayers();
    poskoLayerRef.current?.clearLayers();

    const colorMap: Record<string, string> = {
      critical: "#dc2626",
      warning: "#f97316",
      normal: "#22c55e",
    };

    markers.forEach((marker) => {
      const color = colorMap[marker.severity] || colorMap.normal;
      
      const icon = L.divIcon({
        className: "",
        html: `<div style="background-color:${color};width:20px;height:20px;border-radius:50%;border:3px solid white;box-shadow:0 0 6px rgba(0,0,0,0.4);"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        popupAnchor: [0, -12],
      });

      const severityLabel = marker.severity === "critical" ? "Siaga Darurat" : marker.severity === "warning" ? "Waspada" : "Aman";

      const popup = L.popup().setContent(`
        <div style="min-width:200px;font-family:Inter,sans-serif;font-size:13px;">
          <div style="font-weight:700;font-size:14px;border-bottom:1px solid #e5e7eb;padding-bottom:6px;margin-bottom:8px;">
            ${marker.kecamatan}, ${marker.kabupaten}
          </div>
          <div style="margin-bottom:8px;">
            <span style="background:${color};color:white;padding:2px 8px;border-radius:999px;font-size:11px;font-weight:600;">${severityLabel}</span>
            <span style="background:#f3f4f6;color:#374151;padding:2px 8px;border-radius:999px;font-size:11px;margin-left:4px;">${marker.jenisBencana}</span>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <div style="background:#fef2f2;padding:8px;border-radius:6px;border:1px solid #fecaca;">
              <div style="color:#dc2626;font-size:11px;font-weight:600;margin-bottom:2px;"><i class="fas fa-user-injured" style="margin-right:4px;"></i>Korban</div>
              <div style="color:#991b1b;font-weight:700;font-size:16px;">${marker.korban}</div>
            </div>
            <div style="background:#fff7ed;padding:8px;border-radius:6px;border:1px solid #fed7aa;">
              <div style="color:#f97316;font-size:11px;font-weight:600;margin-bottom:2px;"><i class="fas fa-campground" style="margin-right:4px;"></i>Pengungsi</div>
              <div style="color:#c2410c;font-weight:700;font-size:16px;">${marker.pengungsi}</div>
            </div>
          </div>
        </div>
      `);

      L.marker([marker.lat, marker.lng], { icon }).bindPopup(popup).addTo(markersLayerRef.current);
    });

  }, [markers]);

  useEffect(() => {
    if (!mapInstanceRef.current || !poskoLayerRef.current) return;
    if (showPosko) {
      mapInstanceRef.current.addLayer(poskoLayerRef.current);
    } else {
      mapInstanceRef.current.removeLayer(poskoLayerRef.current);
    }
  }, [showPosko]);

  return (
    <div className="relative w-full overflow-hidden animate-in fade-in duration-300" style={{ height: "calc(100vh - 130px)" }}>
      {loadingMarkers && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-[500]">
          <div className="flex flex-col items-center gap-3">
            <div className="spinner"></div>
            <span className="text-gray-500 font-medium">Memuat Peta Operasi...</span>
          </div>
        </div>
      )}

      <div ref={mapRef} className="w-full h-full z-0" />

      {/* Right Overlays */}
      <div className="absolute top-4 right-4 z-[400] space-y-3 w-64 max-w-[calc(100vw-32px)]">
        
        {/* Faskes */}
        <div className="panel p-3">
          <h3 className="text-xs font-bold text-gray-700 flex items-center gap-2 mb-2 border-b pb-2">
            <i className="fas fa-hospital text-green-500"></i> Faskes
          </h3>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-[10px] text-gray-500 font-semibold mb-1">PKM</p>
              <p className="text-sm font-bold text-green-600">{summary?.faskes.puskesmas ?? 0}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-500 font-semibold mb-1">RSUD</p>
              <p className="text-sm font-bold text-blue-600">{summary?.faskes.rsud ?? 0}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-500 font-semibold mb-1">V2</p>
              <p className="text-sm font-bold text-purple-600">{summary?.faskes.fasyankes ?? 0}</p>
            </div>
          </div>
        </div>

        {/* Jaringan */}
        <div className="panel p-3">
          <h3 className="text-xs font-bold text-gray-700 flex items-center gap-2 mb-2 border-b pb-2">
            <i className="fas fa-signal text-red-500"></i> Status Jaringan
          </h3>
          <div className="flex justify-between items-center text-center">
            <div className="flex-1">
              <p className="text-[10px] text-red-600 font-semibold mb-1">Critical</p>
              <p className="text-sm font-bold text-red-700">{summary?.jaringan.critical ?? 0}</p>
            </div>
            <div className="w-px h-6 bg-gray-200"></div>
            <div className="flex-1">
              <p className="text-[10px] text-yellow-600 font-semibold mb-1">Warning</p>
              <p className="text-sm font-bold text-yellow-700">{summary?.jaringan.warning ?? 0}</p>
            </div>
            <div className="w-px h-6 bg-gray-200"></div>
            <div className="flex-1">
              <p className="text-[10px] text-green-600 font-semibold mb-1">Normal</p>
              <p className="text-sm font-bold text-green-700">{summary?.jaringan.normal ?? 0}</p>
            </div>
          </div>
        </div>

        {/* Posko */}
        <div className="panel p-3">
          <h3 className="text-xs font-bold text-gray-700 flex items-center gap-2 mb-2 border-b pb-2">
            <i className="fas fa-campground text-indigo-500"></i> Posko Pengungsian
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500 font-medium">Total Posko</span>
              <span className="font-bold text-gray-800 bg-gray-100 px-2 py-0.5 rounded">{summary?.posko.totalPosko ?? 0}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500 font-medium">Pengungsi</span>
              <span className="font-bold text-gray-800 bg-orange-100 text-orange-700 px-2 py-0.5 rounded">{summary?.posko.totalPengungsi ?? 0}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500 font-medium">Titik Pengungsian</span>
              <span className="font-bold text-gray-800 bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{summary?.posko.titikPengungsian ?? 0}</span>
            </div>
          </div>
        </div>

        {/* Legenda */}
        <div className="panel p-3">
          <h3 className="text-xs font-bold text-gray-700 flex items-center gap-2 mb-2 border-b pb-2">
            <i className="fas fa-info-circle text-red-500"></i> Legenda
          </h3>
          <div className="grid grid-cols-2 gap-y-2 text-[10px] font-medium text-gray-600">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-600 shadow-sm border border-white"></div>
              <span>Critical</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-sm border border-white"></div>
              <span>Warning</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-sm border border-white"></div>
              <span>Normal</span>
            </div>
            <div className="flex items-center gap-1.5">
              <i className="fas fa-map-pin text-blue-500"></i>
              <span>Posko</span>
            </div>
            <div className="flex items-center gap-1.5">
              <i className="fas fa-hospital text-green-500"></i>
              <span>Faskes</span>
            </div>
          </div>
        </div>

      </div>

      {/* Layer Toggles */}
      <div className="absolute bottom-6 left-6 z-[400] w-64 max-w-[calc(100vw-32px)] panel p-3">
        <h3 className="text-xs font-bold text-gray-700 flex items-center gap-2 mb-3 border-b pb-2">
          <i className="fas fa-layer-group text-blue-600"></i> Layer Kontrol
        </h3>
        <div className="space-y-3">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-xs font-medium text-gray-700">Posko Pengungsian</span>
            <div className={`w-8 h-4 rounded-full transition-colors relative ${showPosko ? 'bg-blue-500' : 'bg-gray-300'}`}>
              <div className={`absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-white transition-transform ${showPosko ? 'translate-x-4' : 'translate-x-0'}`}></div>
            </div>
            <input type="checkbox" className="hidden" checked={showPosko} onChange={e => setShowPosko(e.target.checked)} />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-xs font-medium text-gray-700">Infrastruktur Jaringan</span>
            <div className={`w-8 h-4 rounded-full transition-colors relative ${showJaringan ? 'bg-red-500' : 'bg-gray-300'}`}>
              <div className={`absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-white transition-transform ${showJaringan ? 'translate-x-4' : 'translate-x-0'}`}></div>
            </div>
            <input type="checkbox" className="hidden" checked={showJaringan} onChange={e => setShowJaringan(e.target.checked)} />
          </label>
        </div>
      </div>
    </div>
  );
}