import { useEffect, useRef } from "react";
import { MapMarker, BantuanDesaRecord } from "@workspace/api-client-react";

interface LeafletMapProps {
  markers?: MapMarker[];
  bantuanMarkers?: BantuanDesaRecord[];
  height?: string;
  zoom?: number;
  center?: [number, number];
}

export default function LeafletMap({ 
  markers, 
  bantuanMarkers,
  height = "400px", 
  zoom = 8, 
  center = [4.695135, 96.749397] 
}: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const layerRef = useRef<any>(null);

  const centerLat = center[0];
  const centerLng = center[1];

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;
    const L = (window as any).L;
    if (!L) return;
    
    const map = L.map(mapRef.current, { center: [centerLat, centerLng], zoom });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    mapInstanceRef.current = map;
    layerRef.current = L.layerGroup().addTo(map);
    
    return () => { 
      map.remove(); 
      mapInstanceRef.current = null; 
      layerRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [centerLat, centerLng, zoom]);

  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const L = (window as any).L;
    if (!L) return;

    if (layerRef.current) {
      layerRef.current.clearLayers();
    }

    if (markers && markers.length > 0) {
      const colorMap: Record<string, string> = {
        critical: "#dc2626",
        warning: "#f97316",
        normal: "#22c55e",
      };

      markers.forEach(marker => {
        const color = colorMap[marker.severity] || colorMap.normal;
        const icon = L.divIcon({
          className: "",
          html: `<div style="background-color:${color};width:16px;height:16px;border-radius:50%;border:2px solid white;box-shadow:0 0 4px rgba(0,0,0,0.4);"></div>`,
          iconSize: [16, 16],
          iconAnchor: [8, 8],
          popupAnchor: [0, -8],
        });

        const popup = L.popup().setContent(`
          <div style="min-width:180px;font-family:Inter,sans-serif;font-size:12px;">
            <div style="font-weight:700;font-size:14px;border-bottom:1px solid #e5e7eb;padding-bottom:4px;margin-bottom:6px;">
              ${marker.kecamatan}, ${marker.kabupaten}
            </div>
            <div style="margin-bottom:6px;font-weight:600;">
              ${marker.jenisBencana}
            </div>
            <div style="display:flex;gap:8px;">
              <div>Korban: <b>${marker.korban}</b></div>
              <div>Pengungsi: <b>${marker.pengungsi}</b></div>
            </div>
          </div>
        `);

        L.marker([marker.lat, marker.lng], { icon }).bindPopup(popup).addTo(layerRef.current);
      });
    }

    if (bantuanMarkers && bantuanMarkers.length > 0) {
      const colorMap: Record<string, string> = {
        kuning: "#eab308",
        biru: "#3b82f6",
        abu: "#9ca3af",
        putih: "#ffffff",
        biru_keabuan: "#9ca3af",
      };

      bantuanMarkers.forEach(marker => {
        // Mock coordinates for bantuan records since they don't have lat/lng in the type
        // Just for visual representation if needed, or we might need actual lat/lng.
        // If they don't have coordinates, this is skipped, but usually we would use a geocoder or pre-defined mapping.
        // Assuming there's some mapping or we just skip placing them if no lat/lng.
      });
    }

  }, [markers, bantuanMarkers]);

  return <div ref={mapRef} style={{ height, width: "100%", zIndex: 0 }} className="rounded-lg" data-testid="leaflet-map" />;
}