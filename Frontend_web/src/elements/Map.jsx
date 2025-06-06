import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(139.753);
  const [lat] = useState(35.6844);
  const [zoom] = useState(14);
  const [API_KEY] = useState(`7xT0E9C4cqcesfGsDV0a`);

  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.addControl(new maplibregl.NavigationControl(), "top-right");
    new maplibregl.Marker({ color: "#FF0000" })
      .setLngLat([139.7525, 35.6846])
      .addTo(map.current);
  }, [API_KEY, lng, lat, zoom]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute w-full h-full" />
    </div>
  );
}