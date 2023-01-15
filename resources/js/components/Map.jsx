import { useEffect, useMemo, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Button, CircularProgress } from "@mui/material";

function Map() {
    const [coords, setCoords] = useState([]);

    const getCoords = async () => {
        await axios
            .get(
                "https://maps.googleapis.com/maps/api/geocode/json?address=9730hu&key=AIzaSyAtHEbpGIWq2uv-YKbSOftzZhpxy4TCr-4"
            )
            .then((response) => {
                if (response.status === 200) {
                    setCoords(response.data.results);
                }
            });
    };

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyAtHEbpGIWq2uv-YKbSOftzZhpxy4TCr-4",
    });

    const containerStyle = {
        width: "400px",
        height: "400px",
    };

    useEffect(() => {
        getCoords();
    }, []);

    if (!isLoaded) return <CircularProgress />;

    return (
        <>
            {coords.map((coords) => (
                <GoogleMap
                    key={coords.place_id}
                    zoom={13}
                    center={{
                        lat: coords.geometry.location.lat,
                        lng: coords.geometry.location.lng,
                    }}
                    mapContainerStyle={containerStyle}
                >
                    <Marker
                        position={{
                            lat: coords.geometry.location.lat,
                            lng: coords.geometry.location.lng,
                        }}
                    />
                </GoogleMap>
            ))}
        </>
    );
}

export default Map;
