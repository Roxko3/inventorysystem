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
import BasicModal from "./BasicModal";
import { useContext } from "react";
import { UserContext } from "./App";
import Cookies from "js-cookie";

function Storage() {
    const user = useContext(UserContext);
    const cookie = Cookies.get("token");
    const [storage, setStorage] = useState([]);
    const [loading, setLoading] = useState(true);

    const getStorage = async () => {
        await axios
            .get(
                `http://127.0.0.1/InventorySystem/public/api/shops/getStorage/${user.shop_id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + cookie,
                    },
                }
            )
            .then((response) => {
                if (response.status === 200) {
                    setStorage(response.data.data);
                    console.log(response.data);
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
            field: "productName",
            headerName: "Termék",
        },
        {
            field: "amount",
            headerName: "Mennyiség",
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
                    <BasicModal page="storage" />
                    <Box sx={{ height: 710 }}>
                        <DataGrid
                            rows={storage.map((storage) => ({
                                id: storage.id,
                                productName: storage.product.name,
                                amount: storage.amount,
                                price: storage.price,
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
