import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import Cookies from "js-cookie";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Divider,
    List,
    ListItem,
    ListItemText,
    Paper,
    Rating,
    Snackbar,
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
import moment from "moment/moment";

function Shop() {
    const { user } = useContext(UserContext);
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
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setalertMessage] = useState("");
    const [isGridLoading, setIsGridLoading] = useState(true);
    const [gridLoading, setGridLoading] = useState(true);
    const [ratingDisabled, setRatingDisabled] = useState(false);
    const { id } = useParams();
    const cookie = Cookies.get("token");
    const location = useLocation();

    const handleCloseAlert = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenAlert(false);
    };

    const getShop = async () => {
        await axios
            .get(`${process.env.MIX_BACKEND_URL}/shops/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + cookie,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    //console.log(response.data);
                    setShop(response.data.shop);
                    setRating(response.data.ratings);
                    setValue(response.data.your_rating);
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
            baseURL: `${process.env.MIX_BACKEND_URL}/`,
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
                    //console.log(response.data);
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

    const rate = async (value) => {
        setRatingDisabled(true);
        axios
            .post(
                `${process.env.MIX_BACKEND_URL}/shops/rate/${id}`,
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
                if (response.status === 200) {
                    setTimeout(() => {
                        setRatingDisabled(false);
                    }, 5000);
                }
            })
            .catch((response) => {
                setOpenAlert(true);
                setalertMessage(response.response.data);
            });
    };

    useEffect(() => {
        document.title = `Inventory System - ${shop.name || "Nincs találat"}`;
        getShop();
        getStorage(`shops/searchStorage/${id}`);
    }, [order, field, search, value, ratingDisabled]);

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

    if (loading || gridLoading)
        return (
            <Grid2 container justifyContent="center" alignItems="center">
                <CircularProgress />
            </Grid2>
        );

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
            <Link
                to={
                    location.search == "?page=profile"
                        ? { pathname: "/profile" }
                        : { pathname: "/shops", search: `${location.search}` }
                }
            >
                <Button>Vissza</Button>
            </Link>
            <Link to="/home">
                <Button
                    sx={
                        user.shop_id == id
                            ? { display: "inline" }
                            : { display: "none" }
                    }
                >
                    Szerkesztés
                </Button>
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
                    {shop.city}, {shop.address}
                </Typography>
                <Grid2 container direction="row" m={2}>
                    <Grid2
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid2 container direction="column">
                            {shop.opening_hours[0] == undefined ? (
                                <Typography m={1}>
                                    Nincs nyitvatartás
                                </Typography>
                            ) : (
                                <>
                                    <Typography variant="h6">
                                        Nyitvatartás
                                    </Typography>
                                    <Grid2 item>
                                        <Grid2
                                            container
                                            direction="row"
                                            justifyContent="flex-start"
                                            alignItems="center"
                                            gap={2}
                                        >
                                            <Typography sx={{ width: 180 }}>
                                                Hétfő:{" "}
                                                {shop.opening_hours[0]
                                                    .is_open == 0 ? (
                                                    "Zárva"
                                                ) : (
                                                    <>
                                                        {moment(
                                                            shop
                                                                .opening_hours[0]
                                                                .open,
                                                            "HH:mm:ss"
                                                        ).format("HH:mm")}{" "}
                                                        -{" "}
                                                        {moment(
                                                            shop
                                                                .opening_hours[0]
                                                                .close,
                                                            "HH:mm:ss"
                                                        ).format("HH:mm")}
                                                    </>
                                                )}
                                            </Typography>
                                        </Grid2>
                                    </Grid2>
                                    <Grid2 item>
                                        <Grid2
                                            container
                                            direction="row"
                                            justifyContent="flex-start"
                                            alignItems="center"
                                            gap={2}
                                        >
                                            <Typography sx={{ width: 180 }}>
                                                Kedd:{" "}
                                                {shop.opening_hours[1]
                                                    .is_open == 0 ? (
                                                    "Zárva"
                                                ) : (
                                                    <>
                                                        {moment(
                                                            shop
                                                                .opening_hours[1]
                                                                .open,
                                                            "HH:mm:ss"
                                                        ).format("HH:mm")}{" "}
                                                        -{" "}
                                                        {moment(
                                                            shop
                                                                .opening_hours[1]
                                                                .close,
                                                            "HH:mm:ss"
                                                        ).format("HH:mm")}
                                                    </>
                                                )}
                                            </Typography>
                                        </Grid2>
                                    </Grid2>
                                    <Grid2 item>
                                        <Grid2
                                            container
                                            direction="row"
                                            justifyContent="flex-start"
                                            alignItems="center"
                                            gap={2}
                                        >
                                            <Typography sx={{ width: 180 }}>
                                                Szerda:{" "}
                                                {shop.opening_hours[2]
                                                    .is_open == 0 ? (
                                                    "Zárva"
                                                ) : (
                                                    <>
                                                        {moment(
                                                            shop
                                                                .opening_hours[2]
                                                                .open,
                                                            "HH:mm:ss"
                                                        ).format("HH:mm")}{" "}
                                                        -{" "}
                                                        {moment(
                                                            shop
                                                                .opening_hours[2]
                                                                .close,
                                                            "HH:mm:ss"
                                                        ).format("HH:mm")}
                                                    </>
                                                )}
                                            </Typography>
                                        </Grid2>
                                    </Grid2>
                                    <Grid2 item>
                                        <Grid2
                                            container
                                            direction="row"
                                            justifyContent="flex-start"
                                            alignItems="center"
                                            gap={2}
                                        >
                                            <Typography sx={{ width: 180 }}>
                                                Csütörtök:{" "}
                                                {shop.opening_hours[3]
                                                    .is_open == 0 ? (
                                                    "Zárva"
                                                ) : (
                                                    <>
                                                        {moment(
                                                            shop
                                                                .opening_hours[3]
                                                                .open,
                                                            "HH:mm:ss"
                                                        ).format("HH:mm")}{" "}
                                                        -{" "}
                                                        {moment(
                                                            shop
                                                                .opening_hours[3]
                                                                .close,
                                                            "HH:mm:ss"
                                                        ).format("HH:mm")}
                                                    </>
                                                )}
                                            </Typography>
                                        </Grid2>
                                    </Grid2>
                                    <Grid2 item>
                                        <Grid2
                                            container
                                            direction="row"
                                            justifyContent="flex-start"
                                            alignItems="center"
                                            gap={2}
                                        >
                                            <Typography sx={{ width: 180 }}>
                                                Péntek:{" "}
                                                {shop.opening_hours[4]
                                                    .is_open == 0 ? (
                                                    "Zárva"
                                                ) : (
                                                    <>
                                                        {moment(
                                                            shop
                                                                .opening_hours[4]
                                                                .open,
                                                            "HH:mm:ss"
                                                        ).format("HH:mm")}{" "}
                                                        -{" "}
                                                        {moment(
                                                            shop
                                                                .opening_hours[4]
                                                                .close,
                                                            "HH:mm:ss"
                                                        ).format("HH:mm")}
                                                    </>
                                                )}
                                            </Typography>
                                        </Grid2>
                                    </Grid2>
                                    <Grid2 item>
                                        <Grid2
                                            container
                                            direction="row"
                                            justifyContent="flex-start"
                                            alignItems="center"
                                            gap={2}
                                        >
                                            <Typography sx={{ width: 180 }}>
                                                Szombat:{" "}
                                                {shop.opening_hours[5]
                                                    .is_open == 0 ? (
                                                    "Zárva"
                                                ) : (
                                                    <>
                                                        {moment(
                                                            shop
                                                                .opening_hours[5]
                                                                .open,
                                                            "HH:mm:ss"
                                                        ).format("HH:mm")}{" "}
                                                        -{" "}
                                                        {moment(
                                                            shop
                                                                .opening_hours[5]
                                                                .close,
                                                            "HH:mm:ss"
                                                        ).format("HH:mm")}
                                                    </>
                                                )}
                                            </Typography>
                                        </Grid2>
                                    </Grid2>
                                    <Grid2 item>
                                        <Grid2
                                            container
                                            direction="row"
                                            justifyContent="flex-start"
                                            alignItems="center"
                                            gap={2}
                                        >
                                            <Typography sx={{ width: 180 }}>
                                                Vasárnap:{" "}
                                                {shop.opening_hours[6]
                                                    .is_open == 0 ? (
                                                    "Zárva"
                                                ) : (
                                                    <>
                                                        {moment(
                                                            shop
                                                                .opening_hours[6]
                                                                .open,
                                                            "HH:mm:ss"
                                                        ).format("HH:mm")}{" "}
                                                        -{" "}
                                                        {moment(
                                                            shop
                                                                .opening_hours[6]
                                                                .close,
                                                            "HH:mm:ss"
                                                        ).format("HH:mm")}
                                                    </>
                                                )}
                                            </Typography>
                                        </Grid2>
                                    </Grid2>
                                </>
                            )}
                        </Grid2>
                        <Divider
                            orientation="vertical"
                            sx={{
                                borderRightWidth: 5,
                                m: 2,
                                display: { xs: "none", sm: "flex" },
                            }}
                        />
                        <Grid2 container direction="column">
                            <Typography variant="h6">Értékelések</Typography>
                            <Grid2 item>
                                <Grid2
                                    container
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    gap={2}
                                >
                                    {user.shop_id == id ? (
                                        <Typography>
                                            Dolgozók nem értékelhetnek
                                        </Typography>
                                    ) : (
                                        <Grid2 item>
                                            <Grid2
                                                container
                                                direction="row"
                                                justifyContent="flex-start"
                                                alignItems="center"
                                                gap={2}
                                            >
                                                <Rating
                                                    disabled={ratingDisabled}
                                                    value={value}
                                                    onChange={(
                                                        event,
                                                        newValue
                                                    ) => {
                                                        setValue(newValue);
                                                        if (newValue == null) {
                                                            rate(0);
                                                        } else {
                                                            rate(newValue);
                                                        }
                                                    }}
                                                />
                                                <Typography>
                                                    Saját Értékelés
                                                </Typography>
                                            </Grid2>
                                        </Grid2>
                                    )}
                                </Grid2>
                            </Grid2>
                            <Grid2 item>
                                <Grid2
                                    container
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    gap={2}
                                >
                                    <Rating
                                        value={shop.rating}
                                        readOnly
                                        precision={0.1}
                                    />
                                    <Typography>
                                        Átlag: {shop.rating.toFixed(2)}
                                    </Typography>
                                </Grid2>
                            </Grid2>
                            <Grid2 item>
                                <Grid2
                                    container
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    gap={2}
                                >
                                    <Rating value={5} readOnly />
                                    <Typography>{rating.star5} db</Typography>
                                </Grid2>
                            </Grid2>
                            <Grid2 item>
                                <Grid2
                                    container
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    gap={2}
                                >
                                    <Rating value={4} readOnly />
                                    <Typography>{rating.star4} db</Typography>
                                </Grid2>
                            </Grid2>
                            <Grid2 item>
                                <Grid2
                                    container
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    gap={2}
                                >
                                    <Rating value={3} readOnly />
                                    <Typography>{rating.star3} db</Typography>
                                </Grid2>
                            </Grid2>
                            <Grid2 item>
                                <Grid2
                                    container
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    gap={2}
                                >
                                    <Rating value={2} readOnly />
                                    <Typography>{rating.star2} db</Typography>
                                </Grid2>
                            </Grid2>
                            <Grid2 item>
                                <Grid2
                                    container
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    gap={2}
                                >
                                    <Rating value={1} readOnly />
                                    <Typography>{rating.star1} db</Typography>
                                </Grid2>
                            </Grid2>
                        </Grid2>
                    </Grid2>
                </Grid2>
                <Grid2
                    mt={2}
                    container
                    //direction={{ sm: "column", md: "row" }}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Grid2
                        container
                        //direction={{ sm: "row", md: "column" }}
                        alignItems="center"
                        justifyContent="center"
                        m={2}
                    >
                        <Paper elevation={0}>
                            <Grid2 //sx={{ width: { xs: 300, sm: 376, lg: 500 } }}
                            >
                                <Image
                                    src={
                                        shop.image_path == null
                                            ? "/storage/template.png"
                                            : `/storage/${shop.image_path}`
                                    }
                                    duration={1500}
                                    alt="Bolt képe"
                                    style={{
                                        border: "1px solid black",
                                        borderRadius: 16,
                                        minWidth: "30vw",
                                    }}
                                    height={330}
                                    fit="cover"
                                    //width="40vw"
                                />
                            </Grid2>
                            <Grid2 //sx={{ width: { xs: 300, sm: 376, lg: 500 } }}
                            >
                                <Map
                                    key={shop.city}
                                    location={`${shop.city}+${shop.address}`}
                                    shop={shop.name}
                                    height={330}
                                />
                            </Grid2>
                        </Paper>
                    </Grid2>
                    <Paper elevation={0}>
                        <DataGrid
                            sx={{ minWidth: "40vw", margin: "20px" }}
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
                            isRowSelectable={(params) =>
                                params.row.is_deleted != 1
                            }
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
                                huHU.components.MuiDataGrid.defaultProps
                                    .localeText
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
                    </Paper>
                </Grid2>
            </Grid2>
            <Snackbar
                open={openAlert}
                autoHideDuration={6000}
                onClose={handleCloseAlert}
            >
                <Alert
                    onClose={handleCloseAlert}
                    severity="error"
                    sx={{ width: "100%" }}
                >
                    {alertMessage}
                </Alert>
            </Snackbar>
        </Grid2>
    );
}

export default Shop;
