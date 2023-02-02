import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
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

function Storage() {
    const user = useContext(UserContext);
    const cookie = Cookies.get("token");
    const [storage, setStorage] = useState([]);
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
                            if (field == "edit") {
                                setEditedRow(storage[rowID]);
                                setIsEditing(true);
                            }
                        }}
                        onSelectionModelChange={(ids) => {
                            const selectedIDs = [];
                            for (const id of ids) {
                                storage.filter((selectedRow) => {
                                    if (id == selectedRow.id) {
                                        selectedIDs.push(selectedRow);
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
                        add
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
                        szerk
                    </Dialog>
                )}
                {isDeleting && (
                    <Dialog
                        open={isDeleting}
                        onClose={(e) => {
                            setIsDeleting(false);
                            setEditedRow(null);
                        }}
                    >
                        törlés
                    </Dialog>
                )}
            </Grid2>
        </Grid2>
    );
}
export default Storage;
