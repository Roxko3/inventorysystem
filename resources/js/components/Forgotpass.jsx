import {
    Alert,
    Button,
    CircularProgress,
    IconButton,
    InputAdornment,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect, useRef, useState } from "react";
import Image from "mui-image";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Forgotpass() {
    const location = useLocation();
    const navigate = useNavigate();
    const [emailSent, setEmailSent] = useState(
        location.state.token != undefined
    );
    const email = useRef("");
    const password = useRef("");
    const passwordAgain = useRef("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const sendEmail = async () => {
        setErrors([]);
        axios
            .post(
                `http://127.0.0.1/InventorySystem/public/api/forget-password`,
                {
                    email: email.current.value,
                }
            )
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data);
                    //setEmailSent(true);
                    setErrors(response.data);
                    setLoading(false);
                }
            })
            .catch((response) => {
                if (response.response.status === 422) {
                    setErrors(response.response.data);
                    setLoading(false);
                }
            });
    };

    const resetPassword = async () => {
        setErrors([]);
        axios
            .post(
                `http://127.0.0.1/InventorySystem/public/api/reset-password`,
                {
                    token: location.state.token,
                    password: password.current.value,
                    "password-repeat": passwordAgain.current.value,
                }
            )
            .then((response) => {
                console.log(response.data);
                navigate("/login", { replace: true });
            })
            .catch((response) => {
                if (response.response.status === 422) {
                    setErrors(response.response.data);
                }
            });
    };

    useEffect(() => {
        document.title = "Inventory System - Elfelejtett jelszó";
        console.log(location.state.token);
        //window.sessionStorage.setItem("token", location.state.token);
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
                    <Typography variant="h4">Elfelejtett jelszó</Typography>
                </Grid2>
                {emailSent ? (
                    <>
                        <Grid2>
                            <TextField
                                fullWidth
                                variant="outlined"
                                type={showPassword ? "text" : "password"}
                                label="Új jelszó"
                                inputRef={password}
                                error={errors.password != null}
                                helperText={errors.password}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={
                                                    handleClickShowPassword
                                                }
                                                onMouseDown={
                                                    handleMouseDownPassword
                                                }
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
                                fullWidth
                                variant="outlined"
                                type={showPassword ? "text" : "password"}
                                label="Új jelszó újra"
                                inputRef={passwordAgain}
                                error={errors["password-repeat"] != null}
                                helperText={errors["password-repeat"]}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={
                                                    handleClickShowPassword
                                                }
                                                onMouseDown={
                                                    handleMouseDownPassword
                                                }
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
                        {errors.token != null ? (
                            <Alert severity="error">
                                Ez a link már nem érvényes!
                            </Alert>
                        ) : (
                            <span></span>
                        )}
                        <Grid2>
                            <Button
                                disabled={errors.token != null}
                                variant="contained"
                                onClick={() => {
                                    resetPassword();
                                }}
                            >
                                Megváltoztatás
                            </Button>
                        </Grid2>
                    </>
                ) : (
                    <>
                        <Grid2>
                            {errors.message != null ? (
                                <Alert severity="success">
                                    {errors.message}
                                </Alert>
                            ) : (
                                <TextField
                                    disabled={loading}
                                    fullWidth
                                    variant="outlined"
                                    label="Email cím"
                                    inputRef={email}
                                    error={errors.email != null}
                                    helperText={errors.email}
                                />
                            )}
                        </Grid2>
                        <Grid2>
                            {loading ? (
                                <CircularProgress />
                            ) : (
                                <>
                                    <Button
                                        disabled={errors.message != null}
                                        variant="contained"
                                        onClick={() => {
                                            sendEmail();
                                            setLoading(true);
                                        }}
                                    >
                                        Küldés
                                    </Button>
                                    <Link to="/login">
                                        <Button>Vissza</Button>
                                    </Link>
                                </>
                            )}
                        </Grid2>
                    </>
                )}
            </Paper>
        </Grid2>
    );
}

export default Forgotpass;
