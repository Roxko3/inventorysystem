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
import { useEffect, useRef, useState } from "react";
import { DataGrid, huHU } from "@mui/x-data-grid";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import BasicModal from "./BasicModal";
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

function Users() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editedRow, setEditedRow] = useState({});
    const [deletedRows, setDeletedRows] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [alertMessage, setalertMessage] = useState("");
    const [role, setRole] = useState("");
    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState([]);
    const email = useRef("");
    const permission = useRef("");
    const cookie = Cookies.get("token");

    const getUsers = () => {
        axios
            .get("http://127.0.0.1/InventorySystem/public/api/workers", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + cookie,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data);
                    setUsers(response.data);
                    setIsLoading(false);
                }
            });
    };

    const addWorker = async () => {
        axios
            .post(
                "http://127.0.0.1/InventorySystem/public/api/workers/add",
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
                    getUsers();
                    setRole("");
                    setIsAdding(false);
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
                "http://127.0.0.1/InventorySystem/public/api/workers/update",
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
                    getUsers();
                    setIsEditing(false);
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
                `http://127.0.0.1/InventorySystem/public/api/workers/delete`,
                {
                    email: deletedRows,
                    permission: 1,
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
                    getUsers();
                    setIsLoading(false);
                    setDeletedRows([]);
                }
            })
            .catch(() => {
                //console.log("szar van a palacsintában");
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
        getUsers();
    }, []);

    const columns = [
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
            field: "postal_code",
            headerName: "Irányítószám",
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
                        title="Dolgozó hozzáadása"
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
                        title="Kijelölt dolgozók eltávolítása"
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
                </Grid2>
                <Box>
                    <DataGrid
                        rows={users.map((users) => {
                            users["edit"] = "Szerkesztés";
                            return users;
                        })}
                        onCellClick={(e) => {
                            const rowID = users.findIndex(
                                (a) => a.id == e["id"]
                            );
                            const field = e["field"];
                            if (field != "__check__") {
                                setEditedRow(users[rowID]);
                                setRole(users[rowID].permission);
                                setIsEditing(true);
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
                        pageSize={10}
                        checkboxSelection
                        components={{ Toolbar: CustomToolbar }}
                        localeText={
                            huHU.components.MuiDataGrid.defaultProps.localeText
                        }
                        disableColumnMenu
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
                                    <InputLabel>Rang</InputLabel>
                                    <Select
                                        label="Rang"
                                        value={role}
                                        onChange={handleChange}
                                        inputRef={permission}
                                    >
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
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
                        <DialogTitle>Rang szerkesztése</DialogTitle>
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
                                    <InputLabel>Rang</InputLabel>
                                    <Select
                                        label="Rang"
                                        value={role}
                                        onChange={handleChange}
                                        inputRef={permission}
                                    >
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                    </Select>
                                    <FormHelperText>
                                        {errors.permission}
                                    </FormHelperText>
                                </FormControl>
                            </Grid2>
                            <Grid2 m={2}>
                                <TextField
                                    fullWidth
                                    label="Irányítószám"
                                    variant="outlined"
                                    defaultValue={editedRow.postal_code}
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
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    {alertMessage}
                </Alert>
            </Snackbar>
        </Grid2>
    );
}
export default Users;
