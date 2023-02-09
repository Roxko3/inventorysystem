import { Edit, Search } from "@mui/icons-material";
import {
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
    Switch,
    TextField,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useContext, useEffect, useRef, useState } from "react";
import { ShopContext, UserContext } from "./App";
import Map from "./Map";
import Cookies from "js-cookie";
import axios from "axios";

function ShopData() {
    const user = useContext(UserContext);
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
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
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

    useEffect(() => {
        getTypes();
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
                    {/*<Grid2>
                    <Rating name="read-only" value={3} readOnly />
</Grid2>*/}
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
                                width: 150,
                                height: 150,
                                border: "1px solid black",
                            }}
                            src={
                                user.shop.image_path == null
                                    ? "./images/template.png"
                                    : user.shop.image_path
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
                        <MenuItem onClick={handleClose} component="label">
                            Fotó feltöltése
                            <input hidden accept="image/*" type="file" />
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            Fotó eltávolítása
                        </MenuItem>
                    </Menu>

                    <Grid2>
                        <TextField
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
                <Grid2 container direction="column" alignItems="center">
                    <Grid2 container direction="row">
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
                    <Grid2 sx={{ width: { xs: 100, sm: 500 } }}>
                        <Map
                            key={postalCode}
                            location={`${address}+${postalCode}`}
                            width={500}
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
                        onClick={updateShop}
                    >
                        Változtatások mentése
                    </Button>
                </Grid2>
            </Grid2>
        </Grid2>
    );
}

export default ShopData;
