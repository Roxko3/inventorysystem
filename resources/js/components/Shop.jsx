import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import Cookies from "js-cookie";
import {
    Box,
    Button,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    Rating,
    Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Link } from "react-router-dom";
import Image from "mui-image";
import { borderRadius } from "@mui/system";
import Map from "./Map";
import { UserContext } from "./App";
import { DataGrid, huHU } from "@mui/x-data-grid";
import CustomToolbar from "./CustomToolbar";

function Shop() {
    const user = useContext(UserContext);
    const [shop, setShop] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFound, setIsFound] = useState(false);
    const [pagination, setPagination] = useState({});
    const [storage, setStorage] = useState([]);
    const [order, setOrder] = useState("");
    const [field, setField] = useState("");
    const [search, setSearch] = useState("");
    const [rating, setRating] = useState([]);
    const [value, setValue] = useState(null);
    const [isGridLoading, setIsGridLoading] = useState(true);
    const [gridLoading, setGridLoading] = useState(true);
    const { id } = useParams();
    const cookie = Cookies.get("token");

    const getShop = async () => {
        await axios
            .get(`http://127.0.0.1/InventorySystem/public/api/getShop/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + cookie,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data);
                    setShop(response.data.shop);
                    setRating(response.data.ratings);
                    setIsFound(true);
                    setLoading(false);
                }
            })
            .catch((response) => {
                if (response.response.status === 404) {
                    setIsFound(false);
                    setLoading(false);
                }
            });
    };

    const getStorage = async (url) => {
        const axiosInstance = axios.create({
            baseURL: "http://127.0.0.1/InventorySystem/public/api/",
        });
        await axiosInstance
            .get(url, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + cookie,
                },
                params: {
                    searchString: search,
                    order: order,
                    column: field,
                    is_deleted: 0,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data);
                    setPagination(response.data);
                    setStorage(response.data.data);
                    setGridLoading(false);
                    setIsGridLoading(false);
                }
            })
            .catch((response) => {
                if (response.response.status === 404) {
                    setIsFound(false);
                    setGridLoading(false);
                }
            });
    };

    const rate = (value) => {
        axios
            .post(
                `http://127.0.0.1/InventorySystem/public/api/shops/rate/${id}`,
                {
                    rating: value,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + cookie,
                    },
                }
            )
            .then((response) => {
                console.log(response.response.data);
            });
    };

    useEffect(() => {
        document.title = "Inventory System - Boltok";
        getShop();
        getStorage(`shops/searchStorage/${id}`);
    }, [order, field, search, value]);

    const columns = [
        {
            field: "name",
            headerName: "Termék",
        },
        {
            field: "price",
            headerName: "Ár",
        },
        {
            field: "expiration",
            headerName: "Lejárat",
            width: 100,
        },
        {
            field: "packaging",
            headerName: "Csomagolás",
        },
        {
            field: "unit_of_measure",
            headerName: "Mennyiség",
        },
        {
            field: "type",
            headerName: "Típus",
        },
    ];

    if (loading || gridLoading) return <CircularProgress />;

    if (!isFound)
        return (
            <Grid2>
                <Link to="/shops">
                    <Button>Vissza</Button>
                </Link>
                <Grid2 container alignItems="center" justifyContent="center">
                    <Typography variant="h4">
                        Nem található ilyen bolt!
                    </Typography>
                </Grid2>
            </Grid2>
        );

    return (
        <Grid2>
            <Link to="/shops">
                <Button>Vissza</Button>
            </Link>
            <Grid2
                container
                spacing={1}
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="h4" textAlign="center">
                    {shop.name} | {shop.shop_type.name}
                </Typography>
                <Typography variant="subtitle2">
                    {shop.postal_code}, {shop.address}
                </Typography>
                <Grid2 container direction="row" mt={2}>
                    <Grid2 container direction="column">
                        <List dense>
                            <ListItem disablePadding>
                                <ListItemText primary="Hétfő 6:00-21:00"></ListItemText>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemText primary="Kedd 6:00-21:00"></ListItemText>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemText primary="Szerda 6:00-21:00"></ListItemText>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemText primary="Csütörtök 6:00-21:00"></ListItemText>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemText primary="Péntek 6:00-21:00"></ListItemText>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemText primary="Szombat 6:00-21:00"></ListItemText>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemText primary="Vasárnap 8:00-18:00"></ListItemText>
                            </ListItem>
                        </List>
                    </Grid2>
                    <Grid2 container direction="column">
                        <Rating
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                                rate(newValue);
                            }}
                        />
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Rating
                                value={shop.rating}
                                readOnly
                                precision={0.1}
                            />
                            <Box sx={{ ml: 2 }}>{shop.rating}</Box>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Rating value={5} readOnly />
                            <Box sx={{ ml: 2 }}>{rating.star5} db</Box>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Rating value={4} readOnly />
                            <Box sx={{ ml: 2 }}>{rating.star4} db</Box>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Rating value={3} readOnly />
                            <Box sx={{ ml: 2 }}>{rating.star3} db</Box>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Rating value={2} readOnly />
                            <Box sx={{ ml: 2 }}>{rating.star2} db</Box>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Rating value={1} readOnly />
                            <Box sx={{ ml: 2 }}>{rating.star1} db</Box>
                        </Box>
                    </Grid2>
                </Grid2>
                <Grid2
                    mt={2}
                    container
                    direction={{ sm: "column", md: "row" }}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Grid2
                        container
                        direction={{ sm: "row", md: "column" }}
                        alignItems="center"
                        justifyContent="center"
                        m={2}
                    >
                        <Grid2 sx={{ width: { xs: 300, sm: 376, lg: 500 } }}>
                            <Image
                                src={
                                    shop.image_path == null
                                        ? "/InventorySystem/storage/images/template.png"
                                        : shop.image_path
                                }
                                duration={1500}
                                alt="Bolt képe"
                                style={{
                                    border: "1px solid black",
                                    borderRadius: 16,
                                }}
                                height={330}
                            />
                        </Grid2>
                        <Grid2 sx={{ width: { xs: 300, sm: 376, lg: 500 } }}>
                            <Map
                                key={shop.postal_code}
                                location={`${shop.address}+${shop.postal_code}`}
                                height={330}
                            />
                        </Grid2>
                    </Grid2>
                    <DataGrid
                        rows={storage.map((storage) => {
                            return storage;
                        })}
                        columns={columns}
                        disableSelectionOnClick
                        autoHeight={true}
                        autoPageSize={true}
                        pageSize={pagination.per_page}
                        page={pagination.current_page - 1}
                        loading={isGridLoading}
                        isRowSelectable={(params) => params.row.is_deleted != 1}
                        paginationMode="server"
                        rowCount={pagination.total}
                        onPageChange={(e) => {
                            if (pagination.next_page_url == null) {
                                getStorage(
                                    pagination.prev_page_url
                                        .split("api")[1]
                                        .split("=")[0] + `=${e + 1}`
                                );
                            } else {
                                getStorage(
                                    pagination.next_page_url
                                        .split("api")[1]
                                        .split("=")[0] + `=${e + 1}`
                                );
                            }
                            setIsGridLoading(true);
                        }}
                        components={{ Toolbar: CustomToolbar }}
                        localeText={
                            huHU.components.MuiDataGrid.defaultProps.localeText
                        }
                        disableColumnMenu
                        filterMode="server"
                        onFilterModelChange={(e) => {
                            if (e.quickFilterValues.length != 0) {
                                setSearch(
                                    e.quickFilterValues
                                        .toString()
                                        .replaceAll(",", " ")
                                );
                            } else {
                                setSearch("");
                            }
                            setIsGridLoading(true);
                        }}
                        sortingMode="server"
                        onSortModelChange={(e) => {
                            if (e.length != 0) {
                                setOrder(e[0].sort);
                                setField(e[0].field.replace("name", "id"));
                            } else {
                                setOrder("");
                                setField("");
                            }
                            setIsGridLoading(true);
                        }}
                    />
                </Grid2>
            </Grid2>
        </Grid2>
    );
}

export default Shop;
