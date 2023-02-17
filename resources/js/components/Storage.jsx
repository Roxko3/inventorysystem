import {
    Alert,
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
    Snackbar,
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
import { DataGrid, GridToolbar, huHU } from "@mui/x-data-grid";
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
import CustomToolbar from "./CustomToolbar";

function Storage() {
    const user = useContext(UserContext);
    const cookie = Cookies.get("token");
    const [storage, setStorage] = useState([]); // minden
    const [storageDeleted, setStorageDeleted] = useState([]); // töröltek
    const [storageAvailable, setStorageAvailable] = useState([]); // nem töröltek
    const [filter, setFilter] = useState([]);
    const [pagination, setPagination] = useState({});
    const [rowCountState, setRowCountState] = useState(pagination.total);
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
    const [alignment, setAlignment] = useState(2);
    const [open, setOpen] = useState(false);
    const [alertMessage, setalertMessage] = useState("");
    const [severity, setSeverity] = useState("success");
    const [order, setOrder] = useState("");
    const [field, setField] = useState("");
    const [search, setSearch] = useState("");
    const [isGridLoading, setIsGridLoading] = useState(true);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const handleAlignment = (event, newAlignment) => {
        if (newAlignment !== null) {
            if (newAlignment === 2) {
                setFilter(storageAvailable);
            }
            if (newAlignment === 0) {
                setFilter(storage);
            }
            if (newAlignment === 1) {
                setFilter(storageDeleted);
            }
            setAlignment(newAlignment);
        }
    };

    const getStorage = async (url, index) => {
        const axiosInstance = axios.create({
            baseURL: "http://127.0.0.1/InventorySystem/public/api/",
        });
        //setIsLoading(true);
        await axiosInstance
            .get(url, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + cookie,
                },
                params: {
                    searchString: search,
                    order: order,
                    column: field,
                    is_deleted: 2,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data);
                    setPagination(response.data);
                    const all = response.data.data;
                    const deleted = all.filter((a) => a.is_deleted == 1);
                    const available = all.filter((a) => a.is_deleted == 0);
                    const options = [all, deleted, available];
                    setStorage(options[0]);
                    setStorageDeleted(options[1]);
                    setStorageAvailable(options[2]);
                    setFilter(all);
                    setIsLoading(false);
                    setIsGridLoading(false);
                }
            });
    };

    const getProducts = async () => {
        axios
            .get("http://127.0.0.1/InventorySystem/public/api/products")
            .then((response) => {
                if (response.status === 200) {
                    setProducts(response.data);
                    //console.log(response.data);
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
                    expiration: expiration.current.value,
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
                    setPValue("");
                    product.current.value = "";
                    amount.current.value = "";
                    price.current.value = "";
                    expiration.current.value = "";
                    setErrors([]);
                    //console.log(response);
                    getStorage(
                        `shops/searchStorage/${user.shop_id}`,
                        alignment
                    );
                    setIsAdding(false);
                    setOpen(true);
                    setalertMessage("Termék sikeresen hozzáadva.");
                    setSeverity("success");
                }
            })
            .catch((response) => {
                if (response.response.status === 409) {
                    setOpen(true);
                    setalertMessage(response.response.data);
                    setSeverity("warning");
                }
                if (response.response.status === 422) {
                    setErrors(response.response.data);
                    //console.log(response.response);
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
                    expiration: expiration.current.value,
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
                    //console.log(response.data);
                    getStorage(
                        `shops/searchStorage/${user.shop_id}`,
                        alignment
                    );
                    setIsEditing(false);
                    setOpen(true);
                    setalertMessage("Termék sikeresen módosítva.");
                    setSeverity("success");
                }
            })
            .catch((response) => {
                if (response.response.status === 422) {
                    setErrors(response.response.data);
                    //console.log(response.response);
                }
            });
    };

    const deleteSelectedRows = () => {
        //console.log(deletedRows);
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
                    //console.log("félsiker");
                    //setStorage(response.data.data);
                    getStorage(
                        `shops/searchStorage/${user.shop_id}`,
                        alignment
                    );
                    setIsLoading(false);
                    setIsGridLoading(false);
                    setOpen(true);
                    setalertMessage("Termék sikeresen törölve.");
                    setDeletedRows([]);
                    setSeverity("success");
                }
            })
            .catch(() => {
                //console.log("szar van a palacsintában");
            });
    };

    const handleChange = (e) => {
        setPValue(e.target.value);
        //console.log(e.target);
    };

    useEffect(() => {
        getStorage(`shops/searchStorage/${user.shop_id}`);
        getProducts();
        setRowCountState((prevRowCountState) =>
            pagination.total !== undefined
                ? pagination.total
                : prevRowCountState
        );
    }, [order, field, search, setRowCountState]);

    const columns = [
        {
            field: "name",
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
            width: 100,
        },
        {
            field: "packaging",
            headerName: "Csomagolás",
        },
        {
            field: "unit_of_measure",
            headerName: "Mennyiség",
        },
        {
            field: "type",
            headerName: "Típus",
        },
        {
            field: "is_deleted",
            headerName: "Törölt",
            renderCell: (params) => {
                return params.value == 1 ? (
                    <b style={{ color: "red" }}>Igen</b>
                ) : (
                    <b style={{ color: "green" }}>Nem</b>
                );
            },
        },
        {
            field: "edit",
            headerName: "",
            renderCell: (params) => {
                return (
                    <Tooltip
                        title="Kattintson a sorra szerkesztéshez"
                        placement="top"
                        followCursor
                    >
                        <b style={{ color: "#1976d2" }}>{params.value}</b>
                    </Tooltip>
                );
            },
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
                    <Tooltip
                        title="Termék hozzáadása"
                        placement="top"
                        followCursor
                    >
                        <IconButton
                            color="primary"
                            onClick={(e) => {
                                setIsAdding(true);
                                setEditedRow(false);
                                setIsDeleting(false);
                            }}
                        >
                            <Add />
                        </IconButton>
                    </Tooltip>
                    <Tooltip
                        title="Kijelölt termékek törlése"
                        placement="top"
                        followCursor
                    >
                        <span>
                            <IconButton
                                color="primary"
                                disabled={deletedRows.length === 0}
                                onClick={(e) => {
                                    setIsAdding(false);
                                    setEditedRow(false);
                                    setIsDeleting(true);
                                }}
                            >
                                <Delete />
                            </IconButton>
                        </span>
                    </Tooltip>
                    <ToggleButtonGroup
                        value={alignment}
                        exclusive
                        onChange={handleAlignment}
                    >
                        <Tooltip title="Elérhető" placement="top" followCursor>
                            <ToggleButton value={2} selected={alignment === 2}>
                                <FilterList />
                            </ToggleButton>
                        </Tooltip>
                        <Tooltip title="Minden" placement="top" followCursor>
                            <ToggleButton value={0} selected={alignment === 0}>
                                <FilterNone />
                            </ToggleButton>
                        </Tooltip>
                        <Tooltip title="Törölt" placement="top" followCursor>
                            <ToggleButton value={1} selected={alignment === 1}>
                                <FilterListOff />
                            </ToggleButton>
                        </Tooltip>
                    </ToggleButtonGroup>
                </Grid2>

                <Box>
                    <DataGrid
                        rows={filter.map((storage) => {
                            storage["edit"] = "Szerkesztés";
                            return storage;
                        })}
                        onCellClick={(e) => {
                            //(e);
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
                            //console.log(ids);
                            setDeletedRows(ids);
                        }}
                        columns={columns}
                        disableSelectionOnClick
                        autoHeight={true}
                        autoPageSize={true}
                        pageSize={pagination.per_page}
                        checkboxSelection
                        page={pagination.current_page - 1}
                        loading={isGridLoading}
                        isRowSelectable={(params) => params.row.is_deleted != 1}
                        paginationMode="server"
                        rowCount={pagination.total}
                        onPageChange={(e) => {
                            //console.log(filter);
                            if (pagination.next_page_url == null) {
                                getStorage(
                                    pagination.prev_page_url
                                        .split("api")[1]
                                        .split("=")[0] + `=${e + 1}`,
                                    alignment
                                );
                            } else {
                                getStorage(
                                    pagination.next_page_url
                                        .split("api")[1]
                                        .split("=")[0] + `=${e + 1}`,
                                    alignment
                                );
                            }
                            setIsGridLoading(true);
                        }}
                        components={{ Toolbar: CustomToolbar }}
                        localeText={
                            huHU.components.MuiDataGrid.defaultProps.localeText
                        }
                        disableColumnMenu
                        filterMode="server"
                        onFilterModelChange={(e) => {
                            if (e.quickFilterValues.length != 0) {
                                setSearch(
                                    e.quickFilterValues
                                        .toString()
                                        .replaceAll(",", " ")
                                );
                                /*getStorage(
                                    `/shops/searchStorage/${
                                        user.shop_id
                                    }?searchString=${e.quickFilterValues
                                        .toString()
                                        .replaceAll(",", " ")}`,
                                    alignment
                                );*/
                            } else {
                                setSearch("");
                                /*getStorage(
                                    `shops/getStorage/${user.shop_id}`,
                                    alignment
                                );*/
                            }
                            setIsGridLoading(true);
                        }}
                        sortingMode="server"
                        onSortModelChange={(e) => {
                            //console.log(e);
                            if (e.length != 0) {
                                setOrder(e[0].sort);
                                setField(e[0].field.replace("name", "id"));
                                /*getStorage(
                                    `shops/searchStorage/${user.shop_id}`,
                                    alignment
                                );*/
                            } else {
                                setOrder("");
                                setField("");
                                /*getStorage(
                                    `shops/searchStorage/${user.shop_id}`,
                                    alignment
                                );*/
                            }
                            setIsGridLoading(true);
                        }}
                    />
                </Box>

                {isAdding && (
                    <Dialog
                        open={isAdding}
                        onClose={(e) => {
                            setIsAdding(false);
                            setEditedRow(null);
                            setErrors([]);
                            setPValue("");
                        }}
                    >
                        <DialogTitle>Termék hozzáadása a raktárhoz</DialogTitle>
                        <DialogContent>
                            <Grid2 m={2}>
                                <FormControl
                                    fullWidth
                                    error={errors.product_id != null}
                                    required
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
                                    required
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
                                    required
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
                                    setPValue("");
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
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={severity}
                    sx={{ width: "100%" }}
                >
                    {alertMessage}
                </Alert>
            </Snackbar>
        </Grid2>
    );
}
export default Storage;
