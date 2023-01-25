import { Edit, Search } from "@mui/icons-material";
import {
    Avatar,
    Badge,
    Button,
    FormControl,
    IconButton,
    InputLabel,
    Menu,
    MenuItem,
    Rating,
    Select,
    TextField,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect, useRef, useState } from "react";
import Map from "./Map";

function ShopData() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [address, setAddress] = useState("Pogányi út 7");
    const [postalCode, setPostalCode] = useState("9730");
    const [shopTypes, setShopTypes] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true);
    const [type, setType] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
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

    const handleChange = (e) => {
        setType(e.target.value);
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
                                    ":hover": { backgroundColor: "grey" },
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
                            src="./images/template.png"
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
                            defaultValue="Tesco"
                            size="small"
                            disabled={isDisabled}
                        />
                    </Grid2>
                    <Grid2>
                        <FormControl size="small">
                            <InputLabel>Bolt típus</InputLabel>
                            <Select
                                onChange={handleChange}
                                value={1}
                                label="Bolt típus"
                                disabled={isDisabled}
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
                        </FormControl>
                    </Grid2>
                    <Grid2>
                        <TextField
                            label="Tulajdonos"
                            size="small"
                            defaultValue="Tesco"
                            disabled={isDisabled}
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
                                disabled={isDisabled}
                            />
                        </Grid2>
                        <Grid2>
                            <TextField
                                id="txfPostalCode"
                                label="Irányítószám"
                                size="small"
                                defaultValue={postalCode}
                                disabled={isDisabled}
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
                    <Grid2>
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
                    <Button
                        variant="contained"
                        onClick={() => setIsDisabled(!isDisabled)}
                    >
                        Szerkesztés
                    </Button>
                </Grid2>
                <Grid2>
                    <Button variant="contained">Változtatások mentése</Button>
                </Grid2>
            </Grid2>
        </Grid2>
    );
}

export default ShopData;
