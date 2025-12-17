import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix leaflet marker icon (important for React)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const LAT = 32.7789;
const LNG = 35.3729;

export default function LocationMap() {
  const openGoogleMaps = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${LAT},${LNG}`,
      "_blank"
    );
  };

  const openWaze = () => {
    window.open(
      `https://waze.com/ul?ll=${LAT},${LNG}&navigate=yes`,
      "_blank"
    );
  };

  return (
    <MapContainer
      center={[LAT, LNG]}
      zoom={14}
      style={{ height: "400px", width: "100%", borderRadius: "12px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={[LAT, LNG]}>
        <Popup>
          <div style={{ textAlign: "center", minWidth: "180px" }}>
            <strong>📍 Turan, Israel</strong>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                marginTop: "10px",
              }}
            >
              <button onClick={openGoogleMaps} style={btnStyle}>
                🗺 Google Maps
              </button>

              <button onClick={openWaze} style={btnStyle}>
                🚗 Waze
              </button>
            </div>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}

const btnStyle = {
  padding: "6px 10px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  fontWeight: "700",
  background: "#ff9800",
  color: "#fff",
};