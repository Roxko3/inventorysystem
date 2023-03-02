import { ExpandMore, Search } from "@mui/icons-material";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    CircularProgress,
    Divider,
    IconButton,
    List,
    ListItem,
    Pagination,
    Paper,
    Rating,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Box } from "@mui/system";
import axios from "axios";
import { useContext } from "react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "./App";
import Map from "./Map";
import Navbar from "./Navbar";
import Cookies from "js-cookie";

function Shops() {
    const { user } = useContext(UserContext);
    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [city, setCity] = useState(user.city);
    const [pagination, setPagination] = useState({});
    const cookie = Cookies.get("token");
    const location = useLocation();

    const getShops = async (url) => {
        const axiosInstance = axios.create({
            baseURL: "http://127.0.0.1/InventorySystem/public/api/",
        });
        await axiosInstance
            .get(url, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + cookie,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    setShops(response.data.data);
                    setPagination(response.data);
                    console.log("test", response.data);
                    setLoading(false);
                }
            });
    };

    useEffect(() => {
        document.title = "Inventory System - Boltok";
        console.log(location);
        getShops(`shops${location.search}`);
    }, []);

    return (
        <Box>
            <Grid2
                mt={2}
                container
                spacing={2}
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                {loading ? (
                    <Grid2
                        container
                        justifyContent="center"
                        alignItems="center"
                    >
                        <CircularProgress />
                    </Grid2>
                ) : (
                    <Grid2
                        container
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                        sx={{ marginX: { xs: 0, sm: 6 } }}
                    >
                        <Grid2
                            container
                            alignItems="center"
                            justifyContent="center"
                            sx={{ width: "81%" }}
                        >
                            <Accordion sx={{ width: "100%" }}>
                                <AccordionSummary expandIcon={<ExpandMore />}>
                                    <Grid2
                                        container
                                        direction="row"
                                        gap={2}
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <Typography variant="body1">
                                            Térkép
                                        </Typography>
                                    </Grid2>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TextField
                                        fullWidth
                                        id="txfCity"
                                        label="Keresés"
                                        size="small"
                                        defaultValue={city}
                                        InputProps={{
                                            endAdornment: (
                                                <IconButton
                                                    onClick={() =>
                                                        setCity(txfCity.value)
                                                    }
                                                >
                                                    <Search />
                                                </IconButton>
                                            ),
                                        }}
                                    />
                                    <Grid2>
                                        <Map
                                            key={city}
                                            location={city}
                                            shops={pagination.data}
                                            currentPage={
                                                pagination.current_page
                                            }
                                            height={300}
                                        />
                                    </Grid2>
                                </AccordionDetails>
                            </Accordion>
                        </Grid2>
                        {shops.map((shops) => (
                            <Card
                                variant="outlined"
                                key={shops.id}
                                sx={{
                                    m: 2,
                                    width: { xs: 240, md: 340 },
                                    height: { xs: 240, md: 340 },
                                }}
                            >
                                <Link
                                    to={{
                                        pathname: `/shops/${shops.id}`,
                                        search: `?page=${pagination.current_page}`,
                                    }}
                                >
                                    <CardActionArea>
                                        <CardMedia
                                            sx={{
                                                width: { xs: 240, md: 340 },
                                                height: {
                                                    xs: 120,
                                                    md: 220,
                                                },
                                            }}
                                            component="img"
                                            image={
                                                shops.image_path == null
                                                    ? "/InventorySystem/public/storage/template.png"
                                                    : `/InventorySystem/public/storage/${shops.image_path}`
                                            }
                                            title="Kattintson ide"
                                        />
                                    </CardActionArea>
                                </Link>
                                <CardContent>
                                    <Tooltip
                                        title={shops.name}
                                        followCursor
                                        placement="top"
                                    >
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="h2"
                                            sx={{
                                                ":hover": {
                                                    cursor: "default",
                                                },
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                            }}
                                        >
                                            {shops.name}
                                        </Typography>
                                    </Tooltip>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        component="p"
                                    >
                                        {shops.city}, {shops.address}
                                    </Typography>
                                    <Tooltip
                                        title={shops.rating}
                                        followCursor
                                        placement="top"
                                    >
                                        <Box>
                                            <Rating
                                                name="read-only"
                                                value={shops.rating}
                                                readOnly
                                                precision={0.1}
                                            />
                                        </Box>
                                    </Tooltip>
                                </CardContent>
                            </Card>
                        ))}
                        <Grid2
                            container
                            alignItems="center"
                            justifyContent="center"
                            sx={{ width: "90%" }}
                        >
                            <Pagination
                                page={pagination.current_page}
                                count={pagination.links.length - 2}
                                color="primary"
                                onChange={(e, value) => {
                                    if (pagination.next_page_url == null) {
                                        setLoading(true);
                                        getShops(
                                            pagination.prev_page_url
                                                .split("api")[1]
                                                .split("=")[0] + `=${value}`
                                        );
                                    } else {
                                        setLoading(true);
                                        getShops(
                                            pagination.next_page_url
                                                .split("api")[1]
                                                .split("=")[0] + `=${value}`
                                        );
                                    }
                                }}
                            />
                        </Grid2>
                    </Grid2>
                )}
            </Grid2>
        </Box>
    );
}

export default Shops;
