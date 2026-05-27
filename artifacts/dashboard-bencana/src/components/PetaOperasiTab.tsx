import { useGetBencanaMarkers } from "@workspace/api-client-react";
import { useEffect, useRef } from "react";

export default function PetaOperasiTab() {
  const { data: markers, isLoading } = useGetBencanaMarkers();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersLayerRef = useRef<any>(null);

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

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markersLayerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current || !markers) return;
    const L = (window as any).L;
    if (!L) return;

    markersLayerRef.current?.clearLayers();

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
      const severityColor = colorMap[marker.severity] || colorMap.normal;

      const popup = L.popup().setContent(`
        <div style="min-width:200px;font-family:Inter,sans-serif;font-size:13px;">
          <div style="font-weight:700;font-size:14px;border-bottom:1px solid #e5e7eb;padding-bottom:6px;margin-bottom:8px;">
            ${marker.kecamatan}, ${marker.kabupaten}
          </div>
          <div style="margin-bottom:8px;">
            <span style="background:${severityColor};color:white;padding:2px 8px;border-radius:999px;font-size:11px;font-weight:600;">${severityLabel}</span>
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

  return (
    <div className="relative w-full" style={{ height: "calc(100vh - 130px)" }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-[500]">
          <div className="flex flex-col items-center gap-3">
            <i className="fas fa-circle-notch fa-spin text-4xl text-red-600"></i>
            <span className="text-gray-500 font-medium">Memuat Peta Operasi...</span>
          </div>
        </div>
      )}

      <div ref={mapRef} className="w-full h-full z-0" />

      <div className="absolute bottom-6 left-6 z-[400] bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <h3 className="font-bold text-xs mb-3 uppercase tracking-wider text-gray-500 border-b pb-2">Status Area</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-600 border-2 border-white shadow-sm flex-shrink-0"></div>
            <span className="font-medium text-gray-700">Siaga Darurat (Kritis)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500 border-2 border-white shadow-sm flex-shrink-0"></div>
            <span className="font-medium text-gray-700">Waspada</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500 border-2 border-white shadow-sm flex-shrink-0"></div>
            <span className="font-medium text-gray-700">Terkendali / Aman</span>
          </div>
        </div>
      </div>
    </div>
  );
}
