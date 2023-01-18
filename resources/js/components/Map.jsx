import { Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";

function Map() {
    const [coords, setCoords] = useState([]);
    const [loading, setLoading] = useState(true);

    const getCoords = async () => {
        axios
            .get(
                "https://nominatim.openstreetmap.org/search?q=9730+koszeg+tesco&format=json&polygon=1&addressdetails=1"
            )
            .then((response) => {
                if (response.status === 200) {
                    setCoords(response.data[0]);
                    console.log(response.data);
                    setLoading(false);
                }
            });
    };

    useEffect(() => {
        getCoords();
    }, []);

    if (loading) return <CircularProgress />;

    return (
        <>
            <MapContainer
                center={[coords.lat, coords.lon]}
                zoom={15}
                scrollWheelZoom={false}
                style={{ height: 300, width: 300 }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[coords.lat, coords.lon]}>
                    <Popup>Itt vagy</Popup>
                </Marker>
            </MapContainer>
        </>
    );
}

export default Map;
