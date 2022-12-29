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
                                <TableCell>Email</TableCell>
                                <TableCell>Név</TableCell>
                                <TableCell>Rang</TableCell>
                                <TableCell>Irányítószám</TableCell>
                                <TableCell>Bolt</TableCell>
                                <TableCell>Hitelesített</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((users) => (
                                <TableRow key={users.id}>
                                    <TableCell>{users.email}</TableCell>
                                    <TableCell>{users.name}</TableCell>
                                    <TableCell>{users.permission}</TableCell>
                                    <TableCell>{users.potal_code}</TableCell>
                                    <TableCell>
                                        {users.shop_id !== null
                                            ? users.shop.name
                                            : ""}
                                    </TableCell>
                                    <TableCell>{users.verified}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Grid2>
    );
}
export default Users;
