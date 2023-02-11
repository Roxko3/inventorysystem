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
import { useEffect, useState } from "react";
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
    const [open, setOpen] = useState(false);
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

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
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
                            setPValue(0);
                        }}
                    >
                        <DialogTitle>Dolgozó hozzáadása a bolthoz</DialogTitle>
                        <DialogContent>
                            <Grid2 m={2}>
                                <TextField
                                    fullWidth
                                    label="Mennyiség"
                                    variant="outlined"
                                    type="number"
                                    required
                                />
                            </Grid2>
                            <Grid2 m={2}>
                                <TextField
                                    fullWidth
                                    label="Ár"
                                    variant="outlined"
                                    type="number"
                                    required
                                />
                            </Grid2>
                            <Grid2 m={2}>
                                <TextField
                                    fullWidth
                                    label="Lejárat"
                                    variant="outlined"
                                />
                            </Grid2>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained">Hozzáadás</Button>
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
                        <DialogTitle>Rang szerkesztése</DialogTitle>
                        <DialogContent>
                            <Grid2 m={2}>
                                <TextField
                                    fullWidth
                                    label="Email cím"
                                    variant="outlined"
                                    defaultValue={editedRow.email}
                                />
                            </Grid2>
                            <Grid2 m={2}>
                                <TextField
                                    fullWidth
                                    label="Név"
                                    variant="outlined"
                                    defaultValue={editedRow.name}
                                />
                            </Grid2>
                            <Grid2 m={2}>
                                <TextField
                                    fullWidth
                                    label="Rang"
                                    variant="outlined"
                                    defaultValue={editedRow.permission}
                                />
                            </Grid2>
                            <Grid2 m={2}>
                                <TextField
                                    fullWidth
                                    label="Irányítószám"
                                    variant="outlined"
                                    defaultValue={editedRow.postal_code}
                                />
                            </Grid2>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained">Szerkesztés</Button>
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
