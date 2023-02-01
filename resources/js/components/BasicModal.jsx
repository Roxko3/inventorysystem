import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import {
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import Searchbar from "./Searchbar";
import AddStorage from "./AddStorage";
import EditStorage from "./EditStorage";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    color: "text.primary",
    boxShadow: 24,
    p: 4,
};

export default function BasicModal(props) {
    const [open, setOpen] = useState(false);
    const [btn, setBtn] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const addButton = () => {
        handleOpen();
        if (props.page === "storage") {
            setBtn("addstorage");
        }
        if (props.page === "users") {
            setBtn("addusers");
        }
    };

    const editButton = () => {
        handleOpen();
        if (props.page === "storage") {
            setBtn("editstorage");
        }
        if (props.page === "users") {
            setBtn("editusers");
        }
    };

    const deleteButton = () => {
        handleOpen();
        if (props.page === "storage") {
            setBtn("deletestorage");
        }
        if (props.page === "users") {
            setBtn("deleteusers");
        }
    };

    return (
        <div>
            <Grid2
                container
                direction="row"
                alignItems="center"
                justifyContent="left"
            >
                <IconButton onClick={addButton}>
                    <Add />
                </IconButton>
                <IconButton onClick={editButton}>
                    <Edit />
                </IconButton>
                <IconButton onClick={deleteButton}>
                    <Delete />
                </IconButton>
                <Searchbar />
            </Grid2>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    {btn === "addstorage" ? (
                        <AddStorage />
                    ) : btn === "editstorage" ? (
                        <EditStorage />
                    ) : (
                        btn
                    )}
                </Box>
            </Modal>
        </div>
    );
}
