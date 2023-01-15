import {
    Add,
    Edit,
    EditOff,
    PhotoCamera,
    Visibility,
    VisibilityOff,
} from "@mui/icons-material";
import {
    Avatar,
    Badge,
    Box,
    Button,
    Divider,
    IconButton,
    InputAdornment,
    Menu,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect, useState } from "react";
import Map from "./Map";
import MyAvatar from "./MyAvatar";
import Navbar from "./Navbar";

function Profile() {
    const [showPassword, setShowPassword] = useState("");
    const [btnDisable, setBtnDisable] = useState(true);
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
                <Grid2 container direction="row" alignItems="center">
                    <Grid2>
                        <Badge
                            badgeContent={
                                <IconButton
                                    color="default"
                                    sx={{
                                        border: "2px solid",
                                        backgroundColor: "gray",
                                        ":hover": { backgroundColor: "grey" },
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
                                name="Gyarmati Levente"
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
                                defaultValue="Gyarmati Levente"
                                size="small"
                                onChange={handleChange}
                            />
                        </Grid2>
                        <Grid2>
                            <TextField
                                label="Email cím"
                                defaultValue="gyarmatilevi@gmail.com"
                                size="small"
                                onChange={handleChange}
                            />
                        </Grid2>
                    </Grid2>
                </Grid2>
                <Grid2>
                    <Button variant="contained" disabled={btnDisable}>
                        Változtatások mentése
                    </Button>
                </Grid2>
                <Grid2>
                    <Typography variant="h5">Jelszó</Typography>
                </Grid2>
                <Grid2 container direction="column">
                    <Grid2>
                        <TextField
                            label="Régi jelszó"
                            type={showPassword === "old" ? "text" : "password"}
                            variant="outlined"
                            size="small"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={
                                                showPassword !== "old"
                                                    ? () =>
                                                          setShowPassword("old")
                                                    : () => setShowPassword("")
                                            }
                                        >
                                            {showPassword === "old" ? (
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
                            label="Új jelszó"
                            type={showPassword === "new" ? "text" : "password"}
                            variant="outlined"
                            size="small"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={
                                                showPassword !== "new"
                                                    ? () =>
                                                          setShowPassword("new")
                                                    : () => setShowPassword("")
                                            }
                                        >
                                            {showPassword === "new" ? (
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
                            label="Új jelszó újra"
                            type={
                                showPassword === "again" ? "text" : "password"
                            }
                            variant="outlined"
                            size="small"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={
                                                showPassword !== "again"
                                                    ? () =>
                                                          setShowPassword(
                                                              "again"
                                                          )
                                                    : () => setShowPassword("")
                                            }
                                        >
                                            {showPassword === "again" ? (
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
                </Grid2>
                <Grid2>
                    <Button variant="contained" disabled={true}>
                        Jelszó megváltoztatása
                    </Button>
                </Grid2>
                <Grid2>
                    <TextField
                        label="Irányítószám"
                        defaultValue="9730"
                        size="small"
                        onChange={handleChange}
                    />
                </Grid2>
                <Grid2>
                    <Map />
                </Grid2>
                <Grid2>
                    <Button variant="contained" disabled={true}>
                        Irányítószám megváltoztatása
                    </Button>
                </Grid2>
            </Grid2>
        </Box>
    );
}

export default Profile;
