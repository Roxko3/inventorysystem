import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import Cookies from "js-cookie";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
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
                    //console.log(response.data[0]);
                    setShop(response.data[0]);
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
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    //console.log(response.data);
                    setPagination(response.data);
                    setStorage(
                        response.data.data.filter((a) => a.is_deleted == 0)
                    );
                    setGridLoading(false);
                    setIsGridLoading(false);
                }
            });
    };

    useEffect(() => {
        document.title = "Inventory System - Boltok";
        getShop();
        getStorage(`shops/searchStorage/${id}`);
    }, [order, field, search]);

    const columns = [
        {
            field: "product_name",
            headerName: "Termék",
        },
        {
            field: "price",
            headerName: "Ár",
        },
        {
            field: "expiration",
            headerName: "Lejárat",
            width: 200,
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
                <Grid2
                    mt={2}
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Grid2 sx={{ width: { xs: 300, sm: 400 } }}>
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
                            height={290}
                        />
                    </Grid2>
                    <Grid2 sx={{ width: { xs: 300, sm: 500 } }}>
                        <Map
                            key={shop.postal_code}
                            location={`${shop.address}+${shop.postal_code}`}
                            height={300}
                        />
                    </Grid2>
                </Grid2>
                <Box>
                    <DataGrid
                        rows={storage.map((storage) => {
                            storage["product_name"] = storage["product"].name;
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
                </Box>
            </Grid2>
        </Grid2>
    );
}

export default Shop;
