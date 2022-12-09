import {
    Alert,
    Box,
    Button,
    Paper,
    Snackbar,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import axios from "axios";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

function Login() {
    const email = useRef("");
    const password = useRef("");
    const [open, setOpen] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const [passwordErrorMessage, setpasswordErrorMessage] = useState("");
    const [alertMessage, setalertMessage] = useState("");
    const [severity, setseverity] = useState("error");

    const login = async () => {
        if (email.current.value === "") {
            setEmailError(true);
            setEmailErrorMessage("Nem lehet üres!");
        }
        if (password.current.value === "") {
            setPasswordError(true);
            setpasswordErrorMessage("Nem lehet üres!");
        } else {
            await axios
                .post("http://127.0.0.1/InventorySystem/public/api/login", {
                    email: email.current.value,
                    password: password.current.value,
                })
                .then((response) => {
                    if (response.status === 200) {
                        email.current.value = "";
                        password.current.value = "";
                        setalertMessage("Sikeres bejelentkezés!");
                        setseverity("success");
                        setOpen(true);
                    }
                })
                .catch((response) => {
                    setalertMessage(response.response.data.error);
                    setseverity("error");
                    setOpen(true);
                });
        }
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    return (
        <Grid2
            container
            spacing={2}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ mt: 30 }}
        >
            <Paper>
                <Grid2>
                    <Typography variant="h4">Bejelentkezés</Typography>
                </Grid2>
                <Grid2>
                    <TextField
                        error={emailError}
                        required
                        label="Email cím"
                        variant="outlined"
                        inputRef={email}
                        helperText={emailErrorMessage}
                    />
                </Grid2>
                <Grid2>
                    <TextField
                        error={passwordError}
                        required
                        label="Jelszó"
                        type="password"
                        variant="outlined"
                        inputRef={password}
                        helperText={passwordErrorMessage}
                    />
                </Grid2>
                <Grid2>
                    <Button variant="contained" onClick={login}>
                        Bejelentkezés
                    </Button>
                </Grid2>
                <Grid2>
                    <Link to="/register">
                        <Button variant="text">Regisztráció</Button>
                    </Link>
                </Grid2>
                <Grid2>
                    <Link to="/forgotpass">
                        <Button variant="text">Elfelejtett jelszó</Button>
                    </Link>
                </Grid2>
            </Paper>
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

export default Login;
