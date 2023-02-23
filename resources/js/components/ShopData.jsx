import { Edit, Search } from "@mui/icons-material";
import {
    Alert,
    Avatar,
    Badge,
    Button,
    CircularProgress,
    FormControl,
    FormControlLabel,
    FormHelperText,
    IconButton,
    InputLabel,
    Menu,
    MenuItem,
    Rating,
    Select,
    Snackbar,
    Switch,
    TextField,
    Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useContext, useEffect, useRef, useState } from "react";
import { ShopContext, UserContext } from "./App";
import Map from "./Map";
import Cookies from "js-cookie";
import axios from "axios";
import moment from "moment";

function ShopData() {
    const { user } = useContext(UserContext);
    const [isAdmin, setIsAdmin] = useState(
        user.permission == 10 ? true : false
    );
    const cookie = Cookies.get("token");
    const [address, setAddress] = useState(user.shop.address);
    const [postalCode, setPostalCode] = useState(user.shop.postal_code);
    const [shopTypes, setShopTypes] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true);
    const [type, setType] = useState(user.shop.shop_type_id);
    const [anchorEl, setAnchorEl] = useState(null);
    const shopName = useRef("");
    const shopType = useRef("");
    const owner = useRef("");
    const shopAddress = useRef("");
    const shopPostalCode = useRef("");
    const [isChanged, setIsChanged] = useState(false);
    const [errors, setErrors] = useState([]);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setalertMessage] = useState("");
    const [severity, setSeverity] = useState("success");
    const mondayClose = useRef(null);
    const mondayOpen = useRef(null);
    const tuesdayOpen = useRef(null);
    const tuesdayClose = useRef(null);
    const wednesdayOpen = useRef(null);
    const wednesdayClose = useRef(null);
    const thursdayOpen = useRef(null);
    const thursdayClose = useRef(null);
    const fridayOpen = useRef(null);
    const fridayClose = useRef(null);
    const saturdayOpen = useRef(null);
    const saturdayClose = useRef(null);
    const sundayOpen = useRef(null);
    const sundayClose = useRef(null);
    const [openingHoursLoading, setOpeningHoursLoading] = useState(true);
    const [openingHour, setOpeningHour] = useState([]);
    var formData = new FormData();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const upload = (e) => {
        handleClose();
        console.log(e.target.files[0]);
        formData.append("image", e.target.files[0]);
        uploadImage();
    };

    const uploadImage = async () => {
        axios
            .post(
                `http://127.0.0.1/InventorySystem/public/api/shops/${user.shop_id}/uploadImage`,
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + cookie,
                    },
                }
            )
            .then((response) => {
                if (response.status === 200) {
                    setSeverity("success");
                    setalertMessage("Kép sikeresen megváltoztatva!");
                    setOpenAlert(true);
                }
            })
            .catch((response) => {
                if (response.response.status === 422) {
                    setSeverity("error");
                    setalertMessage("Valami hiba történt!");
                    setOpenAlert(true);
                }
            });
    };

    const removeImage = async () => {
        axios
            .delete(
                `http://127.0.0.1/InventorySystem/public/api/shops/${user.shop_id}/deleteImage`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + cookie,
                    },
                }
            )
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data);
                    setSeverity("success");
                    setalertMessage("Kép sikeresen törölve!");
                    setOpenAlert(true);
                }
            })
            .catch((response) => {
                if (response.response.status === 422) {
                    console.log(response.response.data);
                    setSeverity("error");
                    setalertMessage("Valami hiba történt!");
                    setOpenAlert(true);
                }
            });
    };

    const openingHours = async () => {
        console.log(mondayOpen.current.value);
        console.log(mondayClose.current.value);
        axios
            .post(
                `http://127.0.0.1/InventorySystem/public/api/shops/${user.shop_id}/updateOpeningHours`,
                {
                    opening_hours: {
                        monday: {
                            open_time: mondayOpen.current.value,
                            close_time: mondayClose.current.value,
                        },
                        tuesday: {
                            open_time: tuesdayOpen.current.value,
                            close_time: tuesdayClose.current.value,
                        },
                        wednesday: {
                            open_time: wednesdayOpen.current.value,
                            close_time: wednesdayClose.current.value,
                        },
                        thursday: {
                            open_time: thursdayOpen.current.value,
                            close_time: thursdayClose.current.value,
                        },
                        friday: {
                            open_time: fridayOpen.current.value,
                            close_time: fridayClose.current.value,
                        },
                        saturday: {
                            open_time: saturdayOpen.current.value,
                            close_time: saturdayClose.current.value,
                        },
                        sunday: {
                            open_time: sundayOpen.current.value,
                            close_time: sundayClose.current.value,
                        },
                    },
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
            });
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenAlert(false);
    };

    const getTypes = async () => {
        axios
            .get("http://127.0.0.1/InventorySystem/public/api/shoptypes")
            .then((response) => {
                if (response.status === 200) {
                    setShopTypes(response.data);
                }
            });
    };

    const updateShop = async () => {
        axios
            .put(
                `http://127.0.0.1/InventorySystem/public/api/shops/${user.shop_id}`,
                {
                    shop_id: user.shop_id,
                    name: shopName.current.value,
                    shop_type_id: shopType.current.value,
                    owner: owner.current.value,
                    postal_code: shopPostalCode.current.value,
                    address: shopAddress.current.value,
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
                    shopName.current.value = "";
                    shopType.current.value = "";
                    owner.current.value = "";
                    shopPostalCode.current.value = "";
                    shopAddress.current.value = "";
                    console.log(response.data);
                    setErrors([]);
                    setOpenAlert(true);
                    setSeverity("success");
                    setalertMessage("Változtatások sikeresen elmentve!");
                }
            })
            .catch((response) => {
                if (response.response.status === 422) {
                    console.log(response.response.data);
                    setErrors(response.response.data);
                }
            });
    };

    const handleChange = (e) => {
        setType(e.target.value);
    };

    const checkChange = (e) => {
        if (e.target.value == e.target.defaultValue) {
            setIsChanged(false);
        } else {
            setIsChanged(true);
        }
    };

    const getOpeningHours = async () => {
        axios
            .get(
                `http://127.0.0.1/InventorySystem/public/api/shops/${user.shop_id}/getOpeningHours`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + cookie,
                    },
                }
            )
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data);
                    setOpeningHour(response.data);
                    setOpeningHoursLoading(false);
                }
            });
    };

    useEffect(() => {
        getTypes();
        getOpeningHours();
    }, []);

    return (
        <Grid2
            mt={3}
            container
            spacing={2}
            direction="column"
            alignItems="center"
            justifyContent="center"
        >
            <Grid2
                container
                direction="row"
                alignItems="center"
                justifyContent="center"
            >
                <Grid2 container direction="column" alignItems="center">
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
                                disabled={isDisabled}
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
                        <Avatar
                            variant="rounded"
                            sx={{
                                width: 200,
                                height: 170,
                                border: "1px solid black",
                            }}
                            src={
                                user.shop.image_path == null
                                    ? "/InventorySystem/public/storage/template.png"
                                    : `/InventorySystem/public/storage/${user.shop.image_path}`
                            }
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
                        <MenuItem component="label">
                            Fotó feltöltése
                            <input
                                hidden
                                accept="image/*"
                                type="file"
                                onChange={upload}
                            />
                        </MenuItem>
                        <MenuItem
                            disabled={user.shop.image_path == null}
                            onClick={() => {
                                removeImage(), handleClose();
                            }}
                        >
                            Fotó eltávolítása
                        </MenuItem>
                    </Menu>

                    <Grid2>
                        <TextField
                            sx={{ mt: 2 }}
                            label="Név"
                            defaultValue={user.shop.name}
                            size="small"
                            InputProps={{
                                readOnly: isDisabled,
                            }}
                            inputRef={shopName}
                            onChange={checkChange}
                            helperText={errors.name}
                            error={errors.name != null}
                        />
                    </Grid2>
                    <Grid2 sx={{ width: "100%" }}>
                        <FormControl size="small" fullWidth>
                            <InputLabel>Bolt típus</InputLabel>
                            <Select
                                error={errors.shop_type_id != null}
                                onChange={(e) => {
                                    handleChange(e), checkChange(e);
                                }}
                                value={type}
                                label="Bolt típus"
                                readOnly={isDisabled}
                                inputRef={shopType}
                            >
                                {shopTypes.map((shopTypes) => (
                                    <MenuItem
                                        value={shopTypes.id}
                                        key={shopTypes.id}
                                    >
                                        {shopTypes.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>
                                {errors.shop_type_id}
                            </FormHelperText>
                        </FormControl>
                    </Grid2>
                    <Grid2>
                        <TextField
                            label="Tulajdonos"
                            size="small"
                            defaultValue={user.shop.owner}
                            InputProps={{
                                readOnly: isDisabled,
                            }}
                            inputRef={owner}
                            onChange={checkChange}
                            helperText={errors.owner}
                            error={errors.owner != null}
                        />
                    </Grid2>
                </Grid2>

                <Grid2 container direction="column">
                    <Typography variant="h6">Nyitvatartás</Typography>
                    {openingHoursLoading ? (
                        <CircularProgress />
                    ) : (
                        <>
                            <Grid2 item p={0}>
                                <Grid2
                                    container
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    gap={2}
                                >
                                    <Typography width={65}>Hétfő</Typography>
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        type="time"
                                        defaultValue={moment(
                                            openingHour[0].open,
                                            "HH:mm:ss"
                                        ).format("HH:mm")}
                                        InputProps={{
                                            readOnly: isDisabled,
                                        }}
                                        inputRef={mondayOpen}
                                        onChange={checkChange}
                                    />
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        type="time"
                                        defaultValue={moment(
                                            openingHour[0].close,
                                            "HH:mm:ss"
                                        ).format("HH:mm")}
                                        InputProps={{
                                            readOnly: isDisabled,
                                        }}
                                        inputRef={mondayClose}
                                        onChange={checkChange}
                                    />
                                </Grid2>
                            </Grid2>
                            <Grid2 item p={0}>
                                <Grid2
                                    container
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    gap={2}
                                >
                                    <Typography width={65}>Kedd</Typography>
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        type="time"
                                        defaultValue={moment(
                                            openingHour[1].open,
                                            "HH:mm:ss"
                                        ).format("HH:mm")}
                                        InputProps={{
                                            readOnly: isDisabled,
                                        }}
                                        inputRef={tuesdayOpen}
                                        onChange={checkChange}
                                    />
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        type="time"
                                        defaultValue={moment(
                                            openingHour[1].close,
                                            "HH:mm:ss"
                                        ).format("HH:mm")}
                                        InputProps={{
                                            readOnly: isDisabled,
                                        }}
                                        inputRef={tuesdayClose}
                                        onChange={checkChange}
                                    />
                                </Grid2>
                            </Grid2>
                            <Grid2 item p={0}>
                                <Grid2
                                    container
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    gap={2}
                                >
                                    <Typography width={65}>Szerda</Typography>
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        type="time"
                                        defaultValue={moment(
                                            openingHour[2].open,
                                            "HH:mm:ss"
                                        ).format("HH:mm")}
                                        InputProps={{
                                            readOnly: isDisabled,
                                        }}
                                        inputRef={wednesdayOpen}
                                        onChange={checkChange}
                                    />
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        type="time"
                                        defaultValue={moment(
                                            openingHour[2].close,
                                            "HH:mm:ss"
                                        ).format("HH:mm")}
                                        InputProps={{
                                            readOnly: isDisabled,
                                        }}
                                        inputRef={wednesdayClose}
                                        onChange={checkChange}
                                    />
                                </Grid2>
                            </Grid2>
                            <Grid2 item p={0}>
                                <Grid2
                                    container
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    gap={2}
                                >
                                    <Typography width={65}>
                                        Csütörtök
                                    </Typography>
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        type="time"
                                        defaultValue={moment(
                                            openingHour[3].open,
                                            "HH:mm:ss"
                                        ).format("HH:mm")}
                                        InputProps={{
                                            readOnly: isDisabled,
                                        }}
                                        inputRef={thursdayOpen}
                                        onChange={checkChange}
                                    />
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        type="time"
                                        defaultValue={moment(
                                            openingHour[3].close,
                                            "HH:mm:ss"
                                        ).format("HH:mm")}
                                        InputProps={{
                                            readOnly: isDisabled,
                                        }}
                                        inputRef={thursdayClose}
                                        onChange={checkChange}
                                    />
                                </Grid2>
                            </Grid2>
                            <Grid2 item p={0}>
                                <Grid2
                                    container
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    gap={2}
                                >
                                    <Typography width={65}>Péntek</Typography>
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        type="time"
                                        defaultValue={moment(
                                            openingHour[4].open,
                                            "HH:mm:ss"
                                        ).format("HH:mm")}
                                        InputProps={{
                                            readOnly: isDisabled,
                                        }}
                                        inputRef={fridayOpen}
                                        onChange={checkChange}
                                    />
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        type="time"
                                        defaultValue={moment(
                                            openingHour[4].close,
                                            "HH:mm:ss"
                                        ).format("HH:mm")}
                                        InputProps={{
                                            readOnly: isDisabled,
                                        }}
                                        inputRef={fridayClose}
                                        onChange={checkChange}
                                    />
                                </Grid2>
                            </Grid2>
                            <Grid2 item p={0}>
                                <Grid2
                                    container
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    gap={2}
                                >
                                    <Typography width={65}>Szombat</Typography>
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        type="time"
                                        defaultValue={moment(
                                            openingHour[5].open,
                                            "HH:mm:ss"
                                        ).format("HH:mm")}
                                        InputProps={{
                                            readOnly: isDisabled,
                                        }}
                                        inputRef={saturdayOpen}
                                        onChange={checkChange}
                                    />
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        type="time"
                                        defaultValue={moment(
                                            openingHour[5].close,
                                            "HH:mm:ss"
                                        ).format("HH:mm")}
                                        InputProps={{
                                            readOnly: isDisabled,
                                        }}
                                        inputRef={saturdayClose}
                                        onChange={checkChange}
                                    />
                                </Grid2>
                            </Grid2>
                            <Grid2 item p={0}>
                                <Grid2
                                    container
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    gap={2}
                                >
                                    <Typography width={65}>Vasárnap</Typography>
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        type="time"
                                        defaultValue={moment(
                                            openingHour[6].open,
                                            "HH:mm:ss"
                                        ).format("HH:mm")}
                                        InputProps={{
                                            readOnly: isDisabled,
                                        }}
                                        inputRef={sundayOpen}
                                        onChange={checkChange}
                                    />
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        type="time"
                                        defaultValue={moment(
                                            openingHour[6].close,
                                            "HH:mm:ss"
                                        ).format("HH:mm")}
                                        InputProps={{
                                            readOnly: isDisabled,
                                        }}
                                        inputRef={sundayClose}
                                        onChange={checkChange}
                                    />
                                </Grid2>
                            </Grid2>
                        </>
                    )}
                </Grid2>

                <Grid2
                    container
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Grid2
                        container
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Grid2>
                            <TextField
                                id="txfAddress"
                                label="Cím"
                                size="small"
                                defaultValue={address}
                                InputProps={{
                                    readOnly: isDisabled,
                                }}
                                inputRef={shopAddress}
                                onChange={checkChange}
                                helperText={errors.address}
                                error={errors.address != null}
                            />
                        </Grid2>
                        <Grid2>
                            <TextField
                                id="txfPostalCode"
                                label="Irányítószám"
                                size="small"
                                defaultValue={postalCode}
                                InputProps={{
                                    readOnly: isDisabled,
                                }}
                                inputRef={shopPostalCode}
                                onChange={checkChange}
                                helperText={errors.postal_code}
                                error={errors.postal_code != null}
                            />
                        </Grid2>
                        <Grid2>
                            <IconButton
                                color="primary"
                                onClick={() => {
                                    setPostalCode(txfPostalCode.value);
                                    setAddress(txfAddress.value);
                                }}
                                disabled={isDisabled}
                            >
                                <Search />
                            </IconButton>
                        </Grid2>
                    </Grid2>
                    <Grid2 sx={{ width: { xs: 300, sm: 500 } }}>
                        <Map
                            key={postalCode}
                            location={`${address}+${postalCode}`}
                            height={300}
                        />
                    </Grid2>
                </Grid2>
            </Grid2>
            <Grid2
                container
                direction="row"
                sx={{ display: isAdmin ? "flex" : "none" }}
            >
                <Grid2>
                    <FormControlLabel
                        control={
                            <Switch
                                onClick={() => setIsDisabled(!isDisabled)}
                            />
                        }
                        label="Szerkesztés"
                    />
                </Grid2>
                <Grid2>
                    <Button
                        variant="contained"
                        disabled={!isChanged}
                        onClick={() => {
                            updateShop(), openingHours();
                        }}
                    >
                        Változtatások mentése
                    </Button>
                </Grid2>
            </Grid2>
            <Snackbar
                open={openAlert}
                autoHideDuration={6000}
                onClose={handleCloseAlert}
            >
                <Alert
                    onClose={handleCloseAlert}
                    severity={severity}
                    sx={{ width: "100%" }}
                >
                    {alertMessage}
                </Alert>
            </Snackbar>
        </Grid2>
    );
}

export default ShopData;
