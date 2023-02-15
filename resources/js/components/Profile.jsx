import {
    Add,
    Edit,
    EditOff,
    PhotoCamera,
    Search,
    Visibility,
    VisibilityOff,
} from "@mui/icons-material";
import {
    Alert,
    Avatar,
    Badge,
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Divider,
    IconButton,
    InputAdornment,
    Menu,
    MenuItem,
    Paper,
    Rating,
    Snackbar,
    TextField,
    Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect, propsef, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Map from "./Map";
import MyAvatar from "./MyAvatar";
import Navbar from "./Navbar";
import Cookies from "js-cookie";
import { useContext } from "react";
import { UserContext } from "./App";
import axios from "axios";

function Profile() {
    const user = useContext(UserContext);
    const [postalCode, setPostalCode] = useState(user.postal_code);
    const [showPassword, setShowPassword] = useState("");
    const [btnDisable, setBtnDisable] = useState(true);
    const [passDisabled, setPassDisabled] = useState(true);
    const [postalCodeDisabled, setPostalCodeDisabled] = useState(true);
    const oldPassword = useRef("");
    const newPassword = useRef("");
    const againPassword = useRef("");
    const postal_code = useRef("");
    const name = useRef("");
    const email = useRef("");
    const [errors, setErrors] = useState([]);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setalertMessage] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenAlert(false);
    };

    const handleChange = (e) => {
        if (e.target.value == e.target.defaultValue) {
            setBtnDisable(true);
        } else {
            setBtnDisable(false);
        }
    };

    const handlePostalCodeChange = (e) => {
        if (e.target.value == e.target.defaultValue) {
            setPostalCodeDisabled(true);
        } else {
            setPostalCodeDisabled(false);
        }
    };

    const handlePassChange = (e) => {
        if (e.target.value == "") {
            setPassDisabled(true);
        } else {
            setPassDisabled(false);
        }
    };

    const changePassword = async () => {
        axios
            .post(
                "http://127.0.0.1/InventorySystem/public/api/myProfile/passwordChange",
                {
                    "old-password": oldPassword.current.value,
                    "new-password": newPassword.current.value,
                    "new-password-repeat": againPassword.current.value,
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
                    oldPassword.current.value = "";
                    newPassword.current.value = "";
                    againPassword.current.value = "";
                    setPassDisabled(true);
                    setErrors([]);
                    setOpenAlert(true);
                    setalertMessage(response.data);
                }
            })
            .catch((response) => {
                if (response.response.status === 422) {
                    setErrors(response.response.data);
                }
            });
    };

    const changeNameEmail = async () => {
        axios
            .post(
                "http://127.0.0.1/InventorySystem/public/api/myProfile/nameEmail",
                {
                    email: email.current.value,
                    name: name.current.value,
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
                    email.current.value = "";
                    name.current.value = "";
                    setPassDisabled(true);
                    setErrors([]);
                    setOpenAlert(true);
                    setalertMessage(response.data);
                }
            })
            .catch((response) => {
                if (response.response.status === 422) {
                    setErrors(response.response.data);
                    console.log(response.response.data);
                }
                if (response.response.status === 409) {
                    setErrors(response.response.data);
                }
            });
    };

    const changePostalCode = async () => {
        axios
            .post(
                "http://127.0.0.1/InventorySystem/public/api/myProfile/postalCodeChange",
                {
                    postal_code: postal_code.current.value,
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
                    postal_code.current.value = "";
                    setPassDisabled(true);
                    setErrors([]);
                    setOpenAlert(true);
                    setalertMessage(response.data);
                }
            })
            .catch((response) => {
                if (response.response.status === 422) {
                    setErrors(response.response.data);
                }
            });
    };

    const cookie = Cookies.get("token");

    useEffect(() => {
        document.title = "Inventory System - Profil";
    }, []);

    return (
        <Box>
            <Grid2
                mt={3}
                container
                spacing={2}
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                <Grid2>
                    <Typography variant="h4">Profil beállítások</Typography>
                </Grid2>
                <Grid2
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Grid2>
                        <Badge
                            badgeContent={
                                <IconButton
                                    color="default"
                                    sx={{
                                        border: "1px solid",
                                        backgroundColor: "lightgrey",
                                        ":hover": {
                                            backgroundColor: "grey",
                                        },
                                    }}
                                    size="small"
                                    onClick={handleClick}
                                >
                                    <Edit />
                                </IconButton>
                            }
                            overlap="circular"
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                        >
                            <MyAvatar
                                width={100}
                                height={100}
                                name={user.name}
                            />
                        </Badge>
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                        >
                            <MenuItem onClick={handleClose} component="label">
                                Fotó feltöltése
                                <input hidden accept="image/*" type="file" />
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                Fotó eltávolítása
                            </MenuItem>
                        </Menu>
                    </Grid2>
                    <Grid2 container direction="column">
                        <Grid2>
                            <TextField
                                label="Név"
                                defaultValue={user.name}
                                size="small"
                                onChange={handleChange}
                                inputRef={name}
                                error={errors.name != null}
                                helperText={errors.name}
                            />
                        </Grid2>
                        <Grid2>
                            <TextField
                                label="Email cím"
                                defaultValue={user.email}
                                size="small"
                                onChange={handleChange}
                                inputRef={email}
                                error={errors.email != null}
                                helperText={errors.email}
                            />
                        </Grid2>
                        <Grid2>
                            <Button
                                variant="contained"
                                disabled={btnDisable}
                                onClick={changeNameEmail}
                            >
                                Változtatások mentése
                            </Button>
                        </Grid2>
                    </Grid2>
                    <Grid2
                        container
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        {/*<Grid2>
                            <Typography variant="h5">Jelszó</Typography>
                        </Grid2>*/}
                        <Grid2>
                            <TextField
                                error={errors["old-password"] != null}
                                helperText={errors["old-password"]}
                                inputRef={oldPassword}
                                onChange={handlePassChange}
                                label="Régi jelszó"
                                type={
                                    showPassword.includes("old")
                                        ? "text"
                                        : "password"
                                }
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={
                                                    !showPassword.includes(
                                                        "old"
                                                    )
                                                        ? () =>
                                                              setShowPassword(
                                                                  showPassword +
                                                                      "old"
                                                              )
                                                        : () =>
                                                              setShowPassword(
                                                                  showPassword.replace(
                                                                      "old",
                                                                      ""
                                                                  )
                                                              )
                                                }
                                            >
                                                {showPassword.includes(
                                                    "old"
                                                ) ? (
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
                                error={errors["new-password"] != null}
                                helperText={errors["new-password"]}
                                inputRef={newPassword}
                                onChange={handlePassChange}
                                label="Új jelszó"
                                type={
                                    showPassword.includes("new")
                                        ? "text"
                                        : "password"
                                }
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={
                                                    !showPassword.includes(
                                                        "new"
                                                    )
                                                        ? () =>
                                                              setShowPassword(
                                                                  showPassword +
                                                                      "new"
                                                              )
                                                        : () =>
                                                              setShowPassword(
                                                                  showPassword.replace(
                                                                      "new",
                                                                      ""
                                                                  )
                                                              )
                                                }
                                            >
                                                {showPassword.includes(
                                                    "new"
                                                ) ? (
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
                                error={errors["new-password-repeat"] != null}
                                helperText={errors["new-password-repeat"]}
                                inputRef={againPassword}
                                onChange={handlePassChange}
                                label="Új jelszó újra"
                                type={
                                    showPassword.includes("again")
                                        ? "text"
                                        : "password"
                                }
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={
                                                    !showPassword.includes(
                                                        "again"
                                                    )
                                                        ? () =>
                                                              setShowPassword(
                                                                  showPassword +
                                                                      "again"
                                                              )
                                                        : () =>
                                                              setShowPassword(
                                                                  showPassword.replace(
                                                                      "again",
                                                                      ""
                                                                  )
                                                              )
                                                }
                                            >
                                                {showPassword.includes(
                                                    "again"
                                                ) ? (
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
                            <Button
                                variant="contained"
                                disabled={passDisabled}
                                onClick={changePassword}
                            >
                                Jelszó megváltoztatása
                            </Button>
                        </Grid2>
                    </Grid2>
                </Grid2>
                <Grid2
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    {user.shop == null ? (
                        "Nincs bolt"
                    ) : (
                        <Grid2
                            container
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Typography sx={{ fontWeight: "bold" }}>
                                Rangod: {user.permission}
                            </Typography>
                            <Card
                                variant="outlined"
                                key={user.shop.id}
                                sx={{
                                    m: 2,
                                    width: 300,
                                    height: 300,
                                }}
                            >
                                <Link to={`/shops/${user.shop.id}`}>
                                    <CardActionArea>
                                        <CardMedia
                                            sx={{
                                                width: 300,
                                                height: 180,
                                            }}
                                            component="img"
                                            image={
                                                user.shop.image_path == null
                                                    ? "./images/template.png"
                                                    : user.shop.image_path
                                            }
                                            title={user.shop.name}
                                        />
                                    </CardActionArea>
                                </Link>
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="h2"
                                    >
                                        {user.shop.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        component="p"
                                    >
                                        {user.shop.postal_code},{" "}
                                        {user.shop.address}
                                    </Typography>
                                    <Rating
                                        name="read-only"
                                        value={user.shop.rating}
                                        readOnly
                                    />
                                </CardContent>
                            </Card>
                        </Grid2>
                    )}

                    <Grid2
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid2>
                            <TextField
                                inputRef={postal_code}
                                error={errors.postal_code != null}
                                helperText={errors.postal_code}
                                id="txfPostalCode"
                                label="Irányítószám"
                                size="small"
                                defaultValue={postalCode}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton
                                            onClick={() =>
                                                setPostalCode(
                                                    txfPostalCode.value
                                                )
                                            }
                                        >
                                            <Search />
                                        </IconButton>
                                    ),
                                }}
                                onChange={handlePostalCodeChange}
                            />
                        </Grid2>
                        <Grid2 sx={{ width: 330 }}>
                            <Map
                                key={postalCode}
                                location={postalCode}
                                height={330}
                            />
                        </Grid2>
                        <Grid2>
                            <Button
                                variant="contained"
                                disabled={postalCodeDisabled}
                                onClick={changePostalCode}
                            >
                                Irányítószám megváltoztatása
                            </Button>
                        </Grid2>
                    </Grid2>
                </Grid2>
                <Snackbar
                    open={openAlert}
                    autoHideDuration={6000}
                    onClose={handleCloseAlert}
                >
                    <Alert
                        onClose={handleCloseAlert}
                        severity="success"
                        sx={{ width: "100%" }}
                    >
                        {alertMessage}
                    </Alert>
                </Snackbar>
            </Grid2>
        </Box>
    );
}

export default Profile;
