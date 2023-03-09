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
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Snackbar,
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
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useContext, useEffect, useRef, useState } from "react";
import { DataGrid, huHU } from "@mui/x-data-grid";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import Cookies from "js-cookie";
import {
    Add,
    Delete,
    FilterList,
    FilterListOff,
    FilterNone,
} from "@mui/icons-material";
import CustomToolbar from "./CustomToolbar";
import moment from "moment";
import { UserContext } from "./App";

function Users() {
    const { user } = useContext(UserContext);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editedRow, setEditedRow] = useState({});
    const [deletedRows, setDeletedRows] = useState([]);
    const [pagination, setPagination] = useState({});
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isGridLoading, setIsGridLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [order, setOrder] = useState("");
    const [field, setField] = useState("");
    const [alertMessage, setalertMessage] = useState("");
    const [role, setRole] = useState("");
    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState([]);
    const [severity, setSeverity] = useState("");
    const email = useRef("");
    const permission = useRef("");
    const cookie = Cookies.get("token");

    const getUsers = (url) => {
        const axiosInstance = axios.create({
            baseURL: `${process.env.MIX_BACKEND_URL}/`,
        });
        axiosInstance
            .get(url, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + cookie,
                },
                params: {
                    searchString: search,
                    order: order,
                    column: field,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    //console.log(response.data);
                    setPagination(response.data);
                    setUsers(response.data.data);
                    setIsLoading(false);
                    setIsGridLoading(false);
                }
            });
    };

    const addWorker = async () => {
        axios
            .post(
                `${process.env.MIX_BACKEND_URL}/workers/add`,
                {
                    email: email.current.value,
                    permission: permission.current.value,
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
                    setErrors([]);
                    //console.log(response);
                    getUsers(`workers/searchWorkers/${user.shop_id}`);
                    setRole("");
                    setIsAdding(false);
                    setOpen(true);
                    setSeverity("success");
                    setalertMessage("Dolgozó sikeresen hozzáadva!");
                }
            })
            .catch((response) => {
                if (response.response.status === 409) {
                    setErrors(response.response.data);
                }
                if (response.response.status === 422) {
                    setErrors(response.response.data);
                    //console.log(response.response);
                }
            });
    };

    const updateWorker = async () => {
        axios
            .post(
                `${process.env.MIX_BACKEND_URL}/workers/update`,
                {
                    email: email.current.value,
                    permission: permission.current.value,
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
                    setErrors([]);
                    //console.log(response);
                    getUsers(`workers/searchWorkers/${user.shop_id}`);
                    setIsEditing(false);
                    setOpen(true);
                    setSeverity("success");
                    setalertMessage("Dolgozó sikeresen módosítva!");
                    //console.log("update worker", response.data);
                    if (permission.current.value == 10) {
                        window.location.reload();
                    }
                }
            })
            .catch((response) => {
                if (response.response.status === 409) {
                    setErrors(response.response.data);
                }
                if (response.response.status === 422) {
                    setErrors(response.response.data);
                    //console.log(response.response);
                }
            });
    };

    const deleteSelectedRows = () => {
        //console.log(deletedRows);
        axios
            .post(
                `${process.env.MIX_BACKEND_URL}/workers/delete`,
                {
                    emails: deletedRows,
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
                    //console.log("félsiker");
                    //setStorage(response.data.data);
                    getUsers(`workers/searchWorkers/${user.shop_id}`);
                    setIsLoading(false);
                    setIsGridLoading(false);
                    setDeletedRows([]);
                    setOpen(true);
                    setSeverity("success");
                    setalertMessage("Sikeres törlés!");
                }
            })
            .catch((response) => {
                if (response.response.status === 409) {
                    setOpen(true);
                    setSeverity("error");
                    setalertMessage("Nem törölheti saját magát!");
                }
            });
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const handleChange = (e) => {
        setRole(e.target.value);
        //console.log(e.target);
    };

    useEffect(() => {
        getUsers(`workers/searchWorkers/${user.shop_id}`);
    }, [order, field, search]);

    const columns = [
        {
            field: "email",
            headerName: "E-mail",
            width: 200,
        },
        {
            field: "name",
            headerName: "Név",
            width: 200,
        },
        {
            field: "rank",
            headerName: "Beosztás",
        },
        {
            field: "city",
            headerName: "Város",
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
                        <b
                            style={{
                                color: "#1976d2",
                                display:
                                    user["permission"] >= 5 ? "flex" : "none",
                            }}
                        >
                            {params.value}
                        </b>
                    </Tooltip>
                );
            },
        },
    ];

    if (isLoading) {
        return (
            <Grid2 container justifyContent="center" alignItems="center">
                <CircularProgress />
            </Grid2>
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
                        title="Dolgozó hozzáadása"
                        placement="top"
                        followCursor
                    >
                        <IconButton
                            sx={{
                                display:
                                    user["permission"] >= 5 ? "flex" : "none",
                            }}
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
                        title="Kijelölt dolgozók eltávolítása"
                        placement="top"
                        followCursor
                    >
                        <span>
                            <IconButton
                                sx={{
                                    display:
                                        user["permission"] == 10
                                            ? "flex"
                                            : "none",
                                }}
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
                </Grid2>
                <Box>
                    <DataGrid
                        rows={users.map((users) => {
                            users["rank"] =
                                users["permission"] == 10
                                    ? "Tulajdonos"
                                    : users["permission"] == 5
                                    ? "Menedzser"
                                    : "Eladó";
                            users["edit"] = "Szerkesztés";
                            return users;
                        })}
                        onCellClick={(e) => {
                            if (user.permission >= 5) {
                                const rowID = users.findIndex(
                                    (a) => a.id == e["id"]
                                );
                                const field = e["field"];
                                if (field != "__check__") {
                                    setEditedRow(users[rowID]);
                                    //console.log(users[rowID]);
                                    setRole(users[rowID].permission);
                                    setIsEditing(true);
                                }
                            }
                        }}
                        onSelectionModelChange={(ids) => {
                            let emails = [];
                            ids.map((id) => {
                                emails.push(
                                    users.find((a) => a.id == id).email
                                );
                            });
                            setDeletedRows(emails);
                        }}
                        columns={columns}
                        disableSelectionOnClick
                        autoHeight={true}
                        autoPageSize={true}
                        pageSize={pagination.per_page}
                        checkboxSelection={user.permission == 10}
                        page={pagination.current_page - 1}
                        loading={isGridLoading}
                        paginationMode="server"
                        rowCount={pagination.total}
                        onPageChange={(e) => {
                            if (pagination.next_page_url == null) {
                                getUsers(
                                    pagination.prev_page_url
                                        .split("api")[1]
                                        .split("=")[0] + `=${e + 1}`
                                );
                            } else {
                                getUsers(
                                    pagination.next_page_url
                                        .split("api")[1]
                                        .split("=")[0] + `=${e + 1}`
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
                            } else {
                                setSearch("");
                            }
                            setIsGridLoading(true);
                        }}
                        sortingMode="server"
                        onSortModelChange={(e) => {
                            if (e.length != 0) {
                                setOrder(e[0].sort);
                                setField(e[0].field);
                            } else {
                                setOrder("");
                                setField("");
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
                            setRole("");
                        }}
                    >
                        <DialogTitle>Dolgozó hozzáadása a bolthoz</DialogTitle>
                        <DialogContent>
                            <Grid2 m={2}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    variant="outlined"
                                    error={errors.email != null}
                                    helperText={errors.email}
                                    inputRef={email}
                                />
                            </Grid2>
                            <Grid2 m={2}>
                                <FormControl
                                    fullWidth
                                    error={errors.permission != null}
                                >
                                    <InputLabel>Beosztás</InputLabel>
                                    <Select
                                        label="Beosztás"
                                        value={role}
                                        onChange={handleChange}
                                        inputRef={permission}
                                    >
                                        <MenuItem value={1}>Eladó</MenuItem>
                                        <MenuItem value={5}>Menedzser</MenuItem>
                                        <MenuItem value={10} disabled>
                                            Tulajdonos
                                        </MenuItem>
                                    </Select>
                                    <FormHelperText>
                                        {errors.permission}
                                    </FormHelperText>
                                </FormControl>
                            </Grid2>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" onClick={addWorker}>
                                Hozzáadás
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => {
                                    setIsAdding(false);
                                    setEditedRow(null);
                                    setErrors([]);
                                    setRole("");
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
                            setRole("");
                        }}
                    >
                        <DialogTitle>Beosztás szerkesztése</DialogTitle>
                        <DialogContent>
                            <Grid2 m={2}>
                                <TextField
                                    fullWidth
                                    label="Email cím"
                                    variant="outlined"
                                    defaultValue={editedRow.email}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    inputRef={email}
                                    error={errors.email != null}
                                    helperText={errors.email}
                                />
                            </Grid2>
                            <Grid2 m={2}>
                                <TextField
                                    fullWidth
                                    label="Név"
                                    variant="outlined"
                                    defaultValue={editedRow.name}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid2>
                            <Grid2 m={2}>
                                <FormControl
                                    fullWidth
                                    error={errors.permission != null}
                                >
                                    <InputLabel>Beosztás</InputLabel>
                                    <Select
                                        label="Beosztás"
                                        value={role}
                                        onChange={handleChange}
                                        inputRef={permission}
                                    >
                                        <MenuItem value={1}>Eladó</MenuItem>
                                        <MenuItem value={5}>Menedzser</MenuItem>
                                        <MenuItem
                                            value={10}
                                            disabled={user.permission != 10}
                                        >
                                            Tulajdonos átadása
                                        </MenuItem>
                                    </Select>
                                    <FormHelperText>
                                        {errors.permission}
                                    </FormHelperText>
                                </FormControl>
                            </Grid2>
                            <Grid2 m={2}>
                                <TextField
                                    fullWidth
                                    label="Város"
                                    variant="outlined"
                                    defaultValue={editedRow.city}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid2>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" onClick={updateWorker}>
                                Szerkesztés
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => {
                                    setIsEditing(false);
                                    setEditedRow(null);
                                    setErrors([]);
                                    setRole("");
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
                            dolgozót?
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
export default Users;
