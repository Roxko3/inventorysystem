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

    const columns = [
        {
            field: "id",
            headerName: "ID",
        },
        {
            field: "name",
            headerName: "Név",
        },
        {
            field: "packaging",
            headerName: "Csomagolás",
        },
        {
            field: "unit_of_measure",
            headerName: "Mérték",
        },
        {
            field: "type",
            headerName: "Típus",
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
                        rows={products.map((products) => ({
                            id: products.id,
                            name: products.name,
                            packaging: products.packaging,
                            unit_of_measure: products.unit_of_measure,
                            type: products.type,
                        }))}
                        columns={columns}
                        columnVisibilityModel={{
                            id: false,
                        }}
                    />
                </Box>
            )}
        </Grid2>
    );
}
export default Products;
