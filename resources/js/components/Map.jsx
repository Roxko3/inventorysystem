import { Error } from "@mui/icons-material";
import { Button, CircularProgress, Typography, useTheme } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect, useState } from "react";
import {
    MapContainer,
    TileLayer,
    useMap,
    Marker,
    Popup,
    FeatureGroup,
    Rectangle,
    Tooltip,
} from "react-leaflet";

function Map(props) {
    const [coords, setCoords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mapHeight, setMapHeight] = useState(0);

    const getCoords = async () => {
        await axios
            .get(
                `https://nominatim.openstreetmap.org/search?q=${props.location}&format=json&polygon=1&addressdetails=1`
            )
            .then((response) => {
                if (response.status === 200) {
                    setCoords(response.data[0]);
                    console.log(response.data);
                    setLoading(false);
                    console.log(props.location);
                }
            });
    };

    useEffect(() => {
        getCoords();
    }, []);

    if (loading) return <CircularProgress />;

    if (coords == null)
        return (
            <Grid2 container direction="row">
                <Error color="error" />
                <Typography sx={{ color: "red" }}>Hiba!</Typography>
            </Grid2>
        );

    const rectangle = [
        [coords.boundingbox[0], coords.boundingbox[2]],
        [coords.boundingbox[1], coords.boundingbox[3]],
    ];
    const purpleOptions = { color: "purple" };

    return (
        <Grid2 height="100%" sx={{ height: props.height }}>
            <MapContainer
                center={[coords.lat, coords.lon]}
                zoom={15}
                scrollWheelZoom={false}
                style={{
                    height: "100%",
                    border: "0.3px black solid",
                    borderRadius: 15,
                }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[coords.lat, coords.lon]}>
                    <Popup>Itt vagy</Popup>
                    <Tooltip>Tooltip for Marker</Tooltip>
                </Marker>
            </MapContainer>
        </Grid2>
    );
}

export default Map;
