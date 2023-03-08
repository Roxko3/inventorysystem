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
            .get(`${process.env.MIX_BACKEND_URL}/products`)
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
            width: 150,
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
                <Grid2 container justifyContent="center" alignItems="center">
                    <CircularProgress />
                </Grid2>
            ) : (
                <Box sx={{ height: 735 }}>
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
                        autoHeight={true}
                        autoPageSize={true}
                        pageSize={12}
                    />
                </Box>
            )}
        </Grid2>
    );
}
export default Products;
