import { Error, KeyboardReturnOutlined } from "@mui/icons-material";
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
import { Link } from "react-router-dom";

function Map(props) {
    const [coords, setCoords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [shopsLoading, setShopsLoading] = useState(true);
    const [mapHeight, setMapHeight] = useState(0);
    const [shopCoords, setShopCoords] = useState([]);

    const getCoords = async (location) => {
        await axios
            .get(
                `https://nominatim.openstreetmap.org/search?q=${location}&format=json&polygon=1&addressdetails=1`
            )
            .then((response) => {
                if (response.status === 200) {
                    setCoords(response.data[0]);
                    console.log("map response", response.data);
                    setLoading(false);
                    console.log("map location", location);
                }
            });
    };

    let i = 0;
    const getShopsCoords = async (location, data) => {
        await axios
            .get(
                `https://nominatim.openstreetmap.org/search?q=${location}&format=json&polygon=1&addressdetails=1`
            )
            .then((response) => {
                if (response.status === 200) {
                    //shopCoords.push(response.data[0]);
                    setShopCoords((oldArray) => [
                        ...oldArray,
                        [response.data[0], data],
                    ]);
                    console.log("boltok", shopCoords);
                    console.log(i);
                    i++;
                    if (i == props.shops.length) {
                        setShopsLoading(false);
                    }
                }
            });
    };

    useEffect(() => {
        getCoords(props.location);
        if (props.shops != undefined) {
            props.shops.map((shops) => {
                getShopsCoords(`${shops.city}+${shops.address}`, shops);
            });
        } else {
            setShopsLoading(false);
        }
    }, []);

    if (loading || shopsLoading)
        return (
            <Grid2 container justifyContent="center" alignItems="center">
                <CircularProgress />
            </Grid2>
        );

    if (coords == null)
        return (
            <Grid2
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{
                    border: "1px solid red",
                    borderRadius: 5,
                    height: props.height,
                }}
                height="100%"
            >
                <Error color="error" />
                <Typography sx={{ color: "red" }} variant="h4">
                    Nem található a megadott hely!
                </Typography>
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
                //scrollWheelZoom={false}
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
                {shopCoords.length > 0 &&
                    shopCoords.map((coords) => {
                        console.log(coords);
                        if (coords[0] == undefined) {
                            return;
                        }
                        return (
                            <Marker
                                position={[coords[0].lat, coords[0].lon]}
                                key={coords[0].lat + coords[0].lon}
                            >
                                <Popup>
                                    {
                                        <div>
                                            <Typography variant="subtitle1">
                                                {coords[1].name}
                                            </Typography>
                                            <Typography variant="body2">
                                                {coords[1].city},{" "}
                                                {coords[1].address}
                                            </Typography>
                                            <Link
                                                to={`/shops/${coords[1].id}`}
                                                state={{
                                                    page: props.currentPage,
                                                }}
                                            >
                                                <Typography
                                                    variant="button"
                                                    color="blue"
                                                >
                                                    Megtekintés
                                                </Typography>
                                            </Link>
                                        </div>
                                    }
                                </Popup>
                            </Marker>
                        );
                    })}
                <Marker position={[coords.lat, coords.lon]}>
                    <Popup>
                        {`${
                            props.shop == undefined ? "" : props.shop
                        } ${props.location.replace("+", ", ")}`}
                    </Popup>
                </Marker>
            </MapContainer>
        </Grid2>
    );
}

export default Map;
