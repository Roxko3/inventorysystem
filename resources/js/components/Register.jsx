import {
    Alert,
    Button,
    IconButton,
    InputAdornment,
    Paper,
    Snackbar,
    TextField,
    Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Link, useNavigate } from "react-router-dom";
import Image from "mui-image";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Cookies from "js-cookie";

function Register() {
    const email = useRef("");
    const name = useRef("");
    const password = useRef("");
    const password_repeat = useRef("");
    const postalCode = useRef("");
    const [open, setOpen] = useState(false);
    const [alertMessage, setalertMessage] = useState("");
    const [severity, setseverity] = useState("error");
    const [errors, setErrors] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const navigate = useNavigate();

    const register = async () => {
        await axios
            .post("http://127.0.0.1/InventorySystem/public/api/register", {
                email: email.current.value,
                password: password.current.value,
                password_repeat: password_repeat.current.value,
                name: name.current.value,
            })
            .then((response) => {
                if (response.status === 200) {
                    //email.current.value = "";
                    //password.current.value = "";
                    //password_repeat.current.value = "";
                    //name.current.value = "";
                    setalertMessage("Sikeres regisztráció!");
                    setseverity("success");
                    setErrors([]);
                    setOpen(true);
                    navigate("/login");
                    Cookies.set("token", response.data.token, {
                        expires: 7,
                        path: "/",
                        sameSite: "strict",
                    });
                }
            })
            .catch((response) => {
                if (response.response.status === 422) {
                    setErrors(response.response.data);
                    console.log(response.response.data);
                } else {
                    email.current.value = "";
                    password.current.value = "";
                    password_repeat.current.value = "";
                    name.current.value = "";
                    setalertMessage(response.response.data.error);
                    setseverity("error");
                    setOpen(true);
                }
            });
    };

    const handleClose = (reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        document.title = "Inventory System - Regisztráció";
    }, []);

    return (
        <Grid2
            container
            spacing={2}
            direction="column"
            alignItems="center"
            justifyContent="center"
        >
            <Grid2>
                <Image
                    src="/InventorySystem/public/storage/logo.png"
                    duration={1500}
                    alt="Inventory System Logo"
                />
            </Grid2>
            <Paper elevation={8}>
                <Grid2>
                    <Typography variant="h4">Regisztráció</Typography>
                </Grid2>
                <Grid2>
                    <TextField
                        required
                        fullWidth
                        label="Email cím"
                        variant="outlined"
                        inputRef={email}
                        helperText={errors.email}
                        error={errors.email != null}
                    />
                </Grid2>
                <Grid2>
                    <TextField
                        required
                        fullWidth
                        label="Felhasználónév"
                        variant="outlined"
                        inputRef={name}
                        helperText={errors.name}
                        error={errors.name != null}
                    />
                </Grid2>
                <Grid2>
                    <TextField
                        required
                        fullWidth
                        label="Jelszó"
                        type={showPassword ? "text" : "password"}
                        variant="outlined"
                        inputRef={password}
                        helperText={errors.password}
                        error={errors.password != null}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? (
                                            <Visibility />
                                        ) : (
                                            <VisibilityOff />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid2>
                <Grid2>
                    <TextField
                        required
                        fullWidth
                        label="Jelszó ismétlés"
                        type={showPassword ? "text" : "password"}
                        variant="outlined"
                        inputRef={password_repeat}
                        helperText={errors.password_repeat}
                        error={errors.password_repeat != null}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? (
                                            <Visibility />
                                        ) : (
                                            <VisibilityOff />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid2>
                <Grid2>
                    <Button variant="contained" onClick={register}>
                        Regisztráció
                    </Button>
                </Grid2>
                <Grid2>
                    <Link to="/login">
                        <Button variant="text">Bejelentkezés</Button>
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

export default Register;
