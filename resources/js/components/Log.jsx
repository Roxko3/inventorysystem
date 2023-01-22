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
import { DataGrid } from "@mui/x-data-grid";

function Log() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const getlogs = async () => {
        await axios
            .get("http://127.0.0.1/InventorySystem/public/api/logs")
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
            field: "shopName",
            headerName: "Bolt",
            width: 150,
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
                <Box sx={{ height: 400 }}>
                    <DataGrid
                        rows={logs.map((logs) => ({
                            id: logs.id,
                            shopName: logs.shop.name,
                            userName: logs.user.name,
                            description: logs.description,
                            date: logs.date,
                        }))}
                        columns={columns}
                    />
                </Box>
            )}
        </Grid2>
    );
}
export default Log;
