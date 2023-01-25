import {
    Box,
    Button,
    CircularProgress,
    IconButton,
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
import { Add, Delete, Edit } from "@mui/icons-material";
import Searchbar from "./Searchbar";

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

    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 70,
        },
        {
            field: "shopName",
            headerName: "Bolt",
        },
        {
            field: "productName",
            headerName: "Termék",
        },
        {
            field: "amount",
            headerName: "Mennyiség",
        },
        {
            field: "prize",
            headerName: "Ár",
        },
        {
            field: "expiration",
            headerName: "Lejárat",
            width: 200,
        },
        {
            field: "is_deleted",
            headerName: "Törölt",
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
                    <Grid2
                        container
                        direction="row"
                        alignItems="center"
                        justifyContent="left"
                    >
                        <IconButton>
                            <Add />
                        </IconButton>
                        <IconButton>
                            <Edit />
                        </IconButton>
                        <IconButton>
                            <Delete />
                        </IconButton>
                        <Searchbar />
                    </Grid2>
                    <Box sx={{ height: 710 }}>
                        <DataGrid
                            rows={storage.map((storage) => ({
                                id: `${storage.shop_id}-${storage.product_id}`,
                                shopName: storage.shop.name,
                                productName: storage.product.name,
                                amount: storage.amount,
                                prize: storage.prize,
                                expiration: storage.expiration,
                                is_deleted:
                                    storage.is_deleted === 1 ? "igen" : "nem",
                            }))}
                            columns={columns}
                            disableSelectionOnClick
                            autoHeight={true}
                            autoPageSize={true}
                            pageSize={12}
                        />
                    </Box>
                </Grid2>
            )}
        </Grid2>
    );
}
export default Storage;
