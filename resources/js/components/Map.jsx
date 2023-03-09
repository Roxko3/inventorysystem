import { Error, KeyboardReturnOutlined } from "@mui/icons-material";
import {
    Button,
    CircularProgress,
    LinearProgress,
    Typography,
    useTheme,
} from "@mui/material";
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
import { OpenStreetMapProvider } from "leaflet-geosearch";

const provider = new OpenStreetMapProvider();

function Map(props) {
    const [coords, setCoords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [shopsLoading, setShopsLoading] = useState(true);
    const [mapHeight, setMapHeight] = useState(0);
    const [shopCoords, setShopCoords] = useState([]);
    const [progress, setProgress] = useState(0);

    const getCoords = async (location) => {
        await axios
            .get(`https://geocode.maps.co/search?q=${location}`)
            .then((response) => {
                //console.log(response);
                if (response.status === 200) {
                    setCoords(response.data[0]);
                    //console.log("map response", response.data);
                    setLoading(false);
                    //console.log("map location", location);
                }
            });
    };

    let i = 0;
    const getShopsCoords = async (location, data) => {
        setTimeout(() => {
            axios
                .get(`https://geocode.maps.co/search?q=${location}`)
                .then((response) => {
                    if (response.status === 200) {
                        //shopCoords.push(response.data[0]);
                        setShopCoords((oldArray) => [
                            ...oldArray,
                            [response.data[0], data],
                        ]);
                        //console.log("boltok", shopCoords);
                        //console.log(i);
                        i++;
                        setProgress((i / props.shops.length) * 100);
                        if (i == props.shops.length) {
                            setShopsLoading(false);
                        }
                    }
                });
        }, 1000);
    };

    useEffect(() => {
        if (props.location == null) {
            setCoords({
                place_id: 307735273,
                licence:
                    "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
                osm_type: "relation",
                osm_id: 21335,
                boundingbox: [
                    "45.737128",
                    "48.585257",
                    "16.1138866",
                    "22.8977094",
                ],
                lat: "47.1817585",
                lon: "19.5060937",
                display_name: "Magyarország",
                class: "boundary",
                type: "administrative",
                importance: 0.8082845952630475,
                icon: "https://nominatim.openstreetmap.org/ui/mapicons/poi_boundary_administrative.p.20.png",
                address: {
                    country: "Magyarország",
                    country_code: "hu",
                },
            });
            setLoading(false);
        } else {
            getCoords(props.location);
        }
        if (props.shops != undefined) {
            props.shops.map((shops) => {
                setTimeout(() => {
                    getShopsCoords(`${shops.city}+${shops.address}`, shops);
                }, 1000);
            });
        } else {
            setShopsLoading(false);
        }
    }, []);

    if (loading || shopsLoading)
        return (
            <Grid2>
                {props.shops != null ? (
                    <Grid2>
                        <LinearProgress
                            variant="determinate"
                            value={progress}
                        />
                    </Grid2>
                ) : (
                    <Grid2
                        container
                        justifyContent="center"
                        alignItems="center"
                    >
                        <CircularProgress />
                    </Grid2>
                )}
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
                <Grid2
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Error color="error" />
                    <Typography
                        sx={{ color: "red" }}
                        variant="h4"
                        align="center"
                    >
                        Nem található a megadott hely!
                    </Typography>
                </Grid2>
            </Grid2>
        );

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
                        //console.log(coords);
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
                                                to={{
                                                    pathname: `/shops/${coords[1].id}`,
                                                    search: `?page=${props.currentPage}`,
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
                        {props.location != null
                            ? `${
                                  props.shop == undefined || null
                                      ? ""
                                      : props.shop
                              } ${props.location.replace("+", ", ")}`
                            : `${coords.display_name}`}
                    </Popup>
                </Marker>
            </MapContainer>
        </Grid2>
    );
}

export default Map;
