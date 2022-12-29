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

    return (
        <Grid2>
            {loading ? (
                <CircularProgress
                    disableShrink
                    sx={{ animationDuration: "300ms" }}
                />
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Bolt</TableCell>
                                <TableCell>Dolgozó</TableCell>
                                <TableCell>Leírás</TableCell>
                                <TableCell>Dátum</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {logs.map((logs) => (
                                <TableRow key={logs.id}>
                                    <TableCell>{logs.shop.name}</TableCell>
                                    <TableCell>{logs.user.name}</TableCell>
                                    <TableCell>{logs.description}</TableCell>
                                    <TableCell>{logs.date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Grid2>
    );
}
export default Log;
