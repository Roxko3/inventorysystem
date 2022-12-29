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

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const getProducts = async () => {
        await axios
            .get("http://127.0.0.1/InventorySystem/public/api/products")
            .then((response) => {
                if (response.status === 200) {
                    setProducts(response.data);
                    setLoading(false);
                }
            });
    };

    useEffect(() => {
        getProducts();
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
                                <TableCell>Név</TableCell>
                                <TableCell>Csomagolás</TableCell>
                                <TableCell>Mérték</TableCell>
                                <TableCell>Típus</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((products) => (
                                <TableRow key={products.id}>
                                    <TableCell>{products.name}</TableCell>
                                    <TableCell>{products.packaging}</TableCell>
                                    <TableCell>
                                        {products.unit_of_measure}
                                    </TableCell>
                                    <TableCell>{products.type}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Grid2>
    );
}
export default Products;
