import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    useMediaQuery,
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
import axios from "axios";
import { get } from "lodash";

function Storage() {
    const user = useContext(UserContext);
    const cookie = Cookies.get("token");
    const [storage, setStorage] = useState([]);
    const [pValue, setPValue] = useState("");
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editedRow, setEditedRow] = useState({});
    const [deletedRows, setDeletedRows] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const getStorage = async () => {
        const axiosInstance = axios.create({
            baseURL: "http://127.0.0.1/InventorySystem/public/api/",
        });
        setIsLoading(true);
        await axiosInstance
            .get(`shops/getStorage/${user.shop_id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + cookie,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    setStorage(response.data.data);
                    setIsLoading(false);
                }
            });
    };

    const getProducts = async () => {
        axios
            .get("http://127.0.0.1/InventorySystem/public/api/products")
            .then((response) => {
                if (response.status === 200) {
                    setProducts(response.data);
                }
            });
    };

    const deleteSelectedRows = () => {
        console.log(deletedRows);
        setIsLoading(true);
        axios
            .delete(`http://127.0.0.1/InventorySystem/public/api/storages/delete`, {
                ids: deletedRows,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + cookie,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    console.log("félsiker");
                    axiosInstance
                        .get(`shops/ getStorage / ${user.shop_id}`, {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer " + cookie,
                            },
                        })
                        .then((response) => {
                            if (response.status === 200) {
                                setStorage(response.data.data);
                            }
                        });
                    setStorage(response.data.data);
                    setIsLoading(false);
                }
            }).catch(() => {
                console.log("szar van a palacsintában")
            });
    };

    const handleChange = (e) => {
        setPValue(e.target.value);
    };

    useEffect(() => {
        getStorage();
        getProducts();
    }, []);

    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 70,
        },
        {
            field: "product_name",
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
        {
            field: "edit",
            headerName: "",
        },
    ];

    if (isLoading) {
        return (
            <CircularProgress
                disableShrink
                sx={{ animationDuration: "300ms" }}
            />
        );
    }

    return (
        <Grid2>
            <Grid2>
                <Grid2
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent="left"
                >
                    <IconButton
                        onClick={(e) => {
                            setIsAdding(true);
                            setEditedRow(false);
                            setIsDeleting(false);
                        }}
                    >
                        <Add />
                    </IconButton>
                    <IconButton
                        onClick={(e) => {
                            setIsAdding(false);
                            setEditedRow(false);
                            setIsDeleting(true);
                        }}
                    >
                        <Delete />
                    </IconButton>
                    <Searchbar />
                </Grid2>

                <Box sx={{ height: 710 }}>
                    <DataGrid
                        rows={storage.map((storage, i) => {
                            storage["id"] = i + 1;
                            storage["product_name"] = storage["product"].name;
                            storage["edit"] = "Szerkesztés";
                            return storage;
                        })}
                        onCellClick={(e) => {
                            const rowID = e["id"] - 1;
                            const field = e["field"];
                            if (field != "__check__") {
                                setEditedRow(storage[rowID]);
                                setIsEditing(true);
                            }
                        }}
                        onSelectionModelChange={(ids) => {
                            const selectedIDs = [];
                            for (const id of ids) {
                                storage.filter((selectedRow) => {
                                    if (id == selectedRow.id) {
                                        selectedIDs.push(selectedRow.id);
                                    }
                                });
                            }
                            setDeletedRows(selectedIDs);
                        }}
                        columns={columns}
                        disableSelectionOnClick
                        autoHeight={true}
                        autoPageSize={true}
                        pageSize={10}
                        checkboxSelection
                    />
                </Box>

                {isAdding && (
                    <Dialog
                        open={isAdding}
                        onClose={(e) => {
                            setIsAdding(false);
                            setEditedRow(null);
                        }}
                    >
                        <Grid2
                            container
                            spacing={2}
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Grid2>
                                <Typography variant="h5">
                                    Termék hozzáadása a raktárhoz
                                </Typography>
                            </Grid2>
                            <Grid2>
                                <FormControl fullWidth>
                                    <InputLabel>Termék</InputLabel>
                                    <Select
                                        value={pValue}
                                        label="Termék"
                                        onChange={handleChange}
                                    >
                                        {products.map((products) => (
                                            <MenuItem
                                                value={products.id}
                                                key={products.id}
                                            >
                                                {products.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid2>
                            <Grid2>
                                <TextField
                                    fullWidth
                                    label="Mennyiség"
                                    variant="outlined"
                                    type="number"
                                />
                            </Grid2>
                            <Grid2>
                                <TextField
                                    fullWidth
                                    label="Ár"
                                    variant="outlined"
                                    type="number"
                                />
                            </Grid2>
                            <Grid2>
                                <TextField
                                    fullWidth
                                    label="Lejárat"
                                    variant="outlined"
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid2>
                            <Grid2>
                                <Button variant="contained">Hozzáadás</Button>
                            </Grid2>
                        </Grid2>
                    </Dialog>
                )}
                {isEditing && (
                    <Dialog
                        open={isEditing}
                        onClose={(e) => {
                            setIsEditing(false);
                            setEditedRow(null);
                        }}
                    >

                        {`ID: ${editedRow.id}, Termék: ${editedRow.product_name}, Mennyiség: ${editedRow.amount}, Ár: ${editedRow.price}, Lejárat: ${editedRow.expiration}`}
                    </Dialog>
                )}
                {isDeleting && (
                    <Dialog
                        open={isDeleting}
                        onClose={() => setIsDeleting(false)}
                        aria-labelledby="confirm-dialog"
                    >
                        <DialogTitle id="confirm-dialog">Törlés</DialogTitle>
                        <DialogContent>Biztosan törölni szeretné a kiválaszott tételeket?</DialogContent>
                        <DialogActions>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    deleteSelectedRows();
                                    setIsDeleting(false);
                                    return;
                                }}
                                color="success"
                            >
                                Yes
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    setIsDeleting(false);
                                    return;
                                }}
                                color="error"
                            >
                                No
                            </Button>
                        </DialogActions>
                    </Dialog>
                )}
            </Grid2>
        </Grid2>
    );
}
export default Storage;
