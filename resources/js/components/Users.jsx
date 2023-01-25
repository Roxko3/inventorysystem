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
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const getUsers = async () => {
        await axios
            .get("http://127.0.0.1/InventorySystem/public/api/users")
            .then((response) => {
                if (response.status === 200) {
                    setUsers(response.data);
                    setLoading(false);
                }
            });
    };

    useEffect(() => {
        getUsers();
    }, []);

    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 10,
        },
        {
            field: "email",
            headerName: "Email",
            width: 200,
        },
        {
            field: "name",
            headerName: "Név",
            width: 200,
        },
        {
            field: "permission",
            headerName: "Rang",
        },
        {
            field: "potal_code",
            headerName: "Irányítószám",
        },
        {
            field: "shop_id",
            headerName: "Bolt",
            width: 150,
        },
        {
            field: "verified",
            headerName: "Hitelesített",
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
                <Box sx={{ height: 735 }}>
                    <DataGrid
                        rows={users.map((users) => ({
                            id: users.id,
                            email: users.email,
                            name: users.name,
                            permission: users.permission,
                            potal_code: users.potal_code,
                            shop_id:
                                users.shop_id !== null ? users.shop.name : "",
                            verified: users.verified === 1 ? "Igen" : "Nem",
                        }))}
                        columns={columns}
                        disableSelectionOnClick
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
export default Users;
