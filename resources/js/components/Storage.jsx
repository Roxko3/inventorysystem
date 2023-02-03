import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Tooltip,
    Typography,
    useMediaQuery,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
    Add,
    Check,
    Delete,
    DeleteForever,
    Edit,
    FilterList,
    FilterListOff,
    FilterNone,
    SelectAll,
} from "@mui/icons-material";
import Searchbar from "./Searchbar";
import BasicModal from "./BasicModal";
import { useContext } from "react";
import { UserContext } from "./App";
import Cookies from "js-cookie";
import axios from "axios";
import { get } from "lodash";
import { useRef } from "react";
import { color } from "@mui/system";
import moment from "moment";

function Storage() {
    const user = useContext(UserContext);
    const cookie = Cookies.get("token");
    const [storage, setStorage] = useState([]); // minden
    const [storageDeleted, setStorageDeleted] = useState([]); // töröltek
    const [storageAvailable, setStorageAvailable] = useState([]); // nem töröltek
    const [filter, setFilter] = useState([]);
    const [pValue, setPValue] = useState("");
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editedRow, setEditedRow] = useState({});
    const [deletedRows, setDeletedRows] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [errors, setErrors] = useState([]);
    const product = useRef(0);
    const amount = useRef(-1);
    const price = useRef(-1);
    const expiration = useRef("");
    const [alignment, setAlignment] = useState("left");

    const handleAlignment = (event, newAlignment) => {
        if (newAlignment !== null) {
            if (newAlignment === "left") {
                setFilter(storage);
            }
            if (newAlignment === "center") {
                setFilter(storageDeleted);
            }
            if (newAlignment === "right") {
                setFilter(storageAvailable);
            }
            setAlignment(newAlignment);
        }
    };

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
                    const all = response.data.data;
                    const deleted = all.filter((a) => a.is_deleted == 1);
                    const available = all.filter((a) => a.is_deleted == 0);
                    setStorage(all);
                    setStorageDeleted(deleted);
                    setStorageAvailable(available);
                    setFilter(all);
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

    const addProduct = async () => {
        axios
            .post(
                "http://127.0.0.1/InventorySystem/public/api/storages/add",
                {
                    shop_id: user.shop_id,
                    product_id: product.current.value,
                    amount: amount.current.value,
                    price: price.current.value,
                    expiration: expiration.current.value + " 00:00:00",
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + cookie,
                    },
                }
            )
            .then((response) => {
                if (response.status === 200) {
                    product.current.value = "";
                    amount.current.value = "";
                    price.current.value = "";
                    expiration.current.value = "";
                    setErrors([]);
                    console.log("siker");
                }
            })
            .catch((response) => {
                if (response.response.status === 422) {
                    setErrors(response.response.data);
                }
            });
    };

    const editProduct = async () => {
        axios
            .put(
                `http://127.0.0.1/InventorySystem/public/api/storages/${editedRow.id}`,
                {
                    shop_id: user.shop_id,
                    product_id: product.current.value,
                    amount: amount.current.value,
                    price: price.current.value,
                    expiration: expiration.current.value + " 00:00:00",
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + cookie,
                    },
                }
            )
            .then((response) => {
                if (response.status === 200) {
                    product.current.value = "";
                    amount.current.value = "";
                    price.current.value = "";
                    expiration.current.value = "";
                    setErrors([]);
                    console.log(response.data);
                }
            })
            .catch((response) => {
                if (response.response.status === 422) {
                    setErrors(response.response.data);
                }
            });
    };

    const deleteSelectedRows = () => {
        console.log(deletedRows);
        setIsLoading(true);
        axios
            .delete(
                `http://127.0.0.1/InventorySystem/public/api/storages/delete`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + cookie,
                    },
                    data: {
                        ids: deletedRows,
                    },
                }
            )
            .then((response) => {
                if (response.status === 200) {
                    console.log("félsiker");
                    //setStorage(response.data.data);
                    setIsLoading(false);
                }
            })
            .catch(() => {
                console.log("szar van a palacsintában");
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

    /*if (isLoading) {
        return (
            <CircularProgress
                disableShrink
                sx={{ animationDuration: "300ms" }}
            />
        );
    }*/

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
                    <ToggleButtonGroup
                        value={alignment}
                        exclusive
                        onChange={handleAlignment}
                    >
                        <Tooltip title="Minden" placement="top" followCursor>
                            <ToggleButton value="left">
                                <FilterNone />
                            </ToggleButton>
                        </Tooltip>
                        <Tooltip title="Törölt" placement="top" followCursor>
                            <ToggleButton value="center">
                                <FilterListOff />
                            </ToggleButton>
                        </Tooltip>
                        <Tooltip title="Elérhető" placement="top" followCursor>
                            <ToggleButton value="right">
                                <FilterList />
                            </ToggleButton>
                        </Tooltip>
                    </ToggleButtonGroup>
                </Grid2>

                <Box>
                    <DataGrid
                        rows={filter.map((storage) => {
                            storage["product_name"] = storage["product"].name;
                            storage["edit"] = "Szerkesztés";
                            return storage;
                        })}
                        onCellClick={(e) => {
                            const rowID = storage.findIndex(
                                (a) => a.id == e["id"]
                            );
                            const field = e["field"];
                            if (field != "__check__") {
                                setEditedRow(storage[rowID]);
                                setIsEditing(true);
                            }
                        }}
                        onSelectionModelChange={(ids) => {
                            console.log(ids);
                            setDeletedRows(ids);
                        }}
                        columns={columns}
                        disableSelectionOnClick
                        autoHeight={true}
                        autoPageSize={true}
                        pageSize={10}
                        checkboxSelection
                        loading={isLoading}
                    />
                </Box>

                {isAdding && (
                    <Dialog
                        open={isAdding}
                        onClose={(e) => {
                            setIsAdding(false);
                            setEditedRow(null);
                            setErrors([]);
                        }}
                    >
                        <DialogTitle>Termék hozzáadása a raktárhoz</DialogTitle>
                        <DialogContent>
                            <Grid2 m={2}>
                                <FormControl
                                    fullWidth
                                    error={errors.product_id != null}
                                >
                                    <InputLabel>Termék</InputLabel>
                                    <Select
                                        value={pValue}
                                        label="Termék"
                                        onChange={handleChange}
                                        inputRef={product}
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
                                    <FormHelperText>
                                        {errors.product_id}
                                    </FormHelperText>
                                </FormControl>
                            </Grid2>
                            <Grid2 m={2}>
                                <TextField
                                    fullWidth
                                    label="Mennyiség"
                                    variant="outlined"
                                    type="number"
                                    inputRef={amount}
                                    helperText={errors.amount}
                                    error={errors.amount != null}
                                />
                            </Grid2>
                            <Grid2 m={2}>
                                <TextField
                                    fullWidth
                                    label="Ár"
                                    variant="outlined"
                                    type="number"
                                    inputRef={price}
                                    helperText={errors.price}
                                    error={errors.price != null}
                                />
                            </Grid2>
                            <Grid2 m={2}>
                                <TextField
                                    fullWidth
                                    label="Lejárat"
                                    variant="outlined"
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputRef={expiration}
                                    helperText={errors.expiration}
                                    error={errors.expiration != null}
                                />
                            </Grid2>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" onClick={addProduct}>
                                Hozzáadás
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => {
                                    setIsAdding(false);
                                    setEditedRow(null);
                                    setErrors([]);
                                }}
                            >
                                Mégse
                            </Button>
                        </DialogActions>
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
                        <DialogTitle>Termék szerkesztése</DialogTitle>
                        <DialogContent>
                            <Grid2 m={2}>
                                <FormControl
                                    fullWidth
                                    error={errors.product_id != null}
                                >
                                    <InputLabel>Termék</InputLabel>
                                    <Select
                                        value={editedRow.product_id}
                                        label="Termék"
                                        inputRef={product}
                                        readOnly
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
                                    <FormHelperText>
                                        {errors.product_id}
                                    </FormHelperText>
                                </FormControl>
                            </Grid2>
                            <Grid2 m={2}>
                                <TextField
                                    fullWidth
                                    label="Mennyiség"
                                    variant="outlined"
                                    type="number"
                                    inputRef={amount}
                                    defaultValue={editedRow.amount}
                                    helperText={errors.amount}
                                    error={errors.amount != null}
                                />
                            </Grid2>
                            <Grid2 m={2}>
                                <TextField
                                    fullWidth
                                    label="Ár"
                                    variant="outlined"
                                    type="number"
                                    inputRef={price}
                                    defaultValue={editedRow.price}
                                    helperText={errors.price}
                                    error={errors.price != null}
                                />
                            </Grid2>
                            <Grid2 m={2}>
                                <TextField
                                    fullWidth
                                    label="Lejárat"
                                    variant="outlined"
                                    type="date"
                                    defaultValue={moment(
                                        editedRow.expiration
                                    ).format("YYYY-MM-DD")}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputRef={expiration}
                                    helperText={errors.expiration}
                                    error={errors.expiration != null}
                                />
                            </Grid2>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" onClick={editProduct}>
                                Szerkesztés
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => {
                                    setIsEditing(false);
                                    setEditedRow(null);
                                    setErrors([]);
                                }}
                            >
                                Mégse
                            </Button>
                        </DialogActions>
                    </Dialog>
                )}
                {isDeleting && (
                    <Dialog
                        open={isDeleting}
                        onClose={() => setIsDeleting(false)}
                        aria-labelledby="confirm-dialog"
                    >
                        <DialogTitle id="confirm-dialog">Törlés</DialogTitle>
                        <DialogContent>
                            Biztosan törölni szeretne {deletedRows.length}{" "}
                            tételt?
                        </DialogContent>
                        <DialogActions>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    deleteSelectedRows();
                                    setIsDeleting(false);
                                    return;
                                }}
                            >
                                Törlés
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    setIsDeleting(false);
                                    return;
                                }}
                                color="error"
                            >
                                Mégse
                            </Button>
                        </DialogActions>
                    </Dialog>
                )}
            </Grid2>
        </Grid2>
    );
}
export default Storage;
