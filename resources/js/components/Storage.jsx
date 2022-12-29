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

function Storage() {
    const [storage, setStorage] = useState([]);
    const [loading, setLoading] = useState(true);

    const getStorage = async () => {
        await axios
            .get("http://127.0.0.1/InventorySystem/public/api/storage")
            .then((response) => {
                if (response.status === 200) {
                    setStorage(response.data);
                    setLoading(false);
                }
            });
    };

    useEffect(() => {
        getStorage();
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
                                <TableCell>Termék</TableCell>
                                <TableCell>Mennyiség</TableCell>
                                <TableCell>Ár</TableCell>
                                <TableCell>Lejárat</TableCell>
                                <TableCell>Törölt</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {storage.map((storage) => (
                                <TableRow
                                    key={storage.shop_id + storage.product_id}
                                >
                                    <TableCell>{storage.shop.name}</TableCell>
                                    <TableCell>
                                        {storage.product.name}
                                    </TableCell>
                                    <TableCell>{storage.amount}</TableCell>
                                    <TableCell>{storage.prize}</TableCell>
                                    <TableCell>{storage.expiration}</TableCell>
                                    <TableCell>
                                        {storage.is_deleted === 1
                                            ? "igen"
                                            : "nem"}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Grid2>
    );
}
export default Storage;
