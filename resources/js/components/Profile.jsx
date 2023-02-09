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
    const [errors, setErrors] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
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
                "http://127.0.0.1/InventorySystem/public/api/changePassword",
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
                console.log(response.data);
                if (response.status === 200) {
                    oldPassword.current.value = "";
                    newPassword.current.value = "";
                    againPassword.current.value = "";
                    setPassDisabled(true);
                    setErrors([]);
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
                            />
                        </Grid2>
                        <Grid2>
                            <TextField
                                label="Email cím"
                                defaultValue={user.email}
                                size="small"
                                onChange={handleChange}
                            />
                        </Grid2>
                        <Grid2>
                            <Button variant="contained" disabled={btnDisable}>
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
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Card
                                variant="outlined"
                                sx={{ m: 1, width: 300, height: 300 }}
                                key={1}
                            >
                                <Link to={`/shops/${user.shop_id}`}>
                                    <CardActionArea>
                                        <Grid2
                                            container
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <CardMedia
                                                component="img"
                                                image={
                                                    user.shop.image_path == null
                                                        ? "./images/template.png"
                                                        : user.shop.image_path
                                                }
                                                sx={{
                                                    width: 200,
                                                }}
                                            />
                                        </Grid2>
                                        <CardContent>
                                            <Typography variant="h6">
                                                {
                                                    user.shop
                                                        .name /*shops.name.length <= 19
                                                ? shops.name
                                                : shops.name.substr(0, 19) +
                                        "..."*/
                                                }
                                            </Typography>
                                            <Typography variant="legend">
                                                {user.shop.postal_code}
                                            </Typography>
                                            <br />
                                            <Rating value={2} readOnly />
                                        </CardContent>
                                    </CardActionArea>
                                </Link>
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
                        <Grid2>
                            <Map
                                key={postalCode}
                                location={postalCode}
                                width={300}
                                height={300}
                            />
                        </Grid2>
                        <Grid2>
                            <Button
                                variant="contained"
                                disabled={postalCodeDisabled}
                            >
                                Irányítószám megváltoztatása
                            </Button>
                        </Grid2>
                    </Grid2>
                </Grid2>
            </Grid2>
        </Box>
    );
}

export default Profile;
