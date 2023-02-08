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
import { useEffect, useState } from "react";
import { DataGrid, huHU } from "@mui/x-data-grid";
import Searchbar from "./Searchbar";
import Cookies from "js-cookie";
import CustomToolbar from "./CustomToolbar";

function Log() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const cookie = Cookies.get("token");

    const getlogs = () => {
        axios
            .get("http://127.0.0.1/InventorySystem/public/api/logs", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + cookie,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    setLogs(response.data);
                    setLoading(false);
                }
            });
    };

    useEffect(() => {
        getlogs();
    }, []);

    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 10,
        },
        {
            field: "userName",
            headerName: "Dolgozó",
            width: 200,
        },
        {
            field: "description",
            headerName: "Leírás",
            width: 500,
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
                            rows={logs.map((logs) => ({
                                id: logs.id,
                                userName: logs.user.name,
                                description: logs.description,
                                date: logs.date,
                            }))}
                            columns={columns}
                            autoHeight={true}
                            autoPageSize={true}
                            pageSize={12}
                            components={{ Toolbar: CustomToolbar }}
                            localeText={
                                huHU.components.MuiDataGrid.defaultProps
                                    .localeText
                            }
                            disableColumnMenu
                        />
                    </Box>
                </Grid2>
            )}
        </Grid2>
    );
}
export default Log;
