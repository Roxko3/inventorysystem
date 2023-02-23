import {
    Box,
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useContext, useEffect, useState } from "react";
import { DataGrid, huHU } from "@mui/x-data-grid";
import Searchbar from "./Searchbar";
import Cookies from "js-cookie";
import CustomToolbar from "./CustomToolbar";
import { UserContext } from "./App";

function Log() {
    const { user } = useContext(UserContext);
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [order, setOrder] = useState("");
    const [field, setField] = useState("");
    const [pagination, setPagination] = useState({});
    const [isGridLoading, setIsGridLoading] = useState(true);
    const cookie = Cookies.get("token");

    const getlogs = (url) => {
        const axiosInstance = axios.create({
            baseURL: "http://127.0.0.1/InventorySystem/public/api/",
        });
        axiosInstance
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
                    setLogs(response.data.data);
                    setLoading(false);
                    setIsGridLoading(false);
                }
            });
    };

    useEffect(() => {
        getlogs(`logs/searchLogs/${user.shop_id}`);
    }, [order, field, search]);

    const columns = [
        {
            field: "name",
            headerName: "Dolgozó",
            width: 200,
        },
        {
            field: "description",
            headerName: "Leírás",
            width: 1000,
        },
        {
            field: "date",
            headerName: "Dátum",
            width: 200,
        },
    ];

    return (
        <Grid2>
            {loading ? (
                <CircularProgress
                    disableShrink
                    sx={{ animationDuration: "300ms" }}
                />
            ) : (
                <Grid2>
                    <Box sx={{ height: 735 }}>
                        <DataGrid
                            rows={logs.map((logs) => {
                                return logs;
                            })}
                            columns={columns}
                            disableSelectionOnClick
                            autoHeight={true}
                            autoPageSize={true}
                            pageSize={pagination.per_page}
                            page={pagination.current_page - 1}
                            loading={isGridLoading}
                            paginationMode="server"
                            rowCount={pagination.total}
                            onPageChange={(e) => {
                                if (pagination.next_page_url == null) {
                                    getlogs(
                                        pagination.prev_page_url
                                            .split("api")[1]
                                            .split("=")[0] + `=${e + 1}`
                                    );
                                } else {
                                    getlogs(
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
                                    setField(e[0].field);
                                } else {
                                    setOrder("");
                                    setField("");
                                }
                                setIsGridLoading(true);
                            }}
                        />
                    </Box>
                </Grid2>
            )}
        </Grid2>
    );
}
export default Log;
