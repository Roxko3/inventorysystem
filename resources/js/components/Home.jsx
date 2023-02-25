import {
    Add,
    AssignmentInd,
    BusinessCenter,
    Inventory,
    Notifications,
    ShoppingCart,
} from "@mui/icons-material";
import {
    AppBar,
    Avatar,
    Badge,
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Rating,
    Select,
    Stack,
    Tab,
    Tabs,
    TextField,
    Toolbar,
    Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import axios from "axios";
import Image from "mui-image";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreateShop from "./CreateShop";
import Navbar from "./Navbar";
import TabPanel from "./TabPanel";
import Yourshop from "./Yourshop";
import Cookies from "js-cookie";
import { UserContext } from "./App";
import MyAvatar from "./MyAvatar";
import Map from "./Map";

function Home() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const name = useRef("");
    const shopType = useRef("");
    const address = useRef("");
    const owner = useRef("");
    const city = useRef("");
    const [shopTypes, setShopTypes] = useState([]);
    const [type, setType] = useState("");
    const [errors, setErrors] = useState([]);
    const [hasShop, setHasShop] = useState(user.shop_id != null);
    const [shop, setShop] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const cookie = Cookies.get("token");

    const getShop = async () => {
        await axios
            .get(
                `http://127.0.0.1/InventorySystem/public/api/getShop/${user.shop_id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + cookie,
                    },
                }
            )
            .then((response) => {
                if (response.status === 200) {
                    setShop(response.data);
                    console.log(response.data);
                    setLoading(false);
                }
            });
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

    const createShop = async () => {
        await axios
            .post(
                "http://127.0.0.1/InventorySystem/public/api/shops/create",
                {
                    name: name.current.value,
                    shop_type_id: shopType.current.value,
                    address: address.current.value,
                    owner: owner.current.value,
                    city: city.current.value,
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
                    name.current.value = "";
                    shopType.current.value = -1;
                    setType(-1);
                    address.current.value = "";
                    owner.current.value = "";
                    city.current.value = "";
                    console.log("sikeres");
                    window.location.reload();
                }
            })
            .catch((response) => {
                if (response.response.status === 422) {
                    setErrors(response.response.data);
                    console.log(response.response.data);
                } else {
                    name.current.value = "";
                    shopType.current.value = -1;
                    setType(-1);
                    address.current.value = "";
                    owner.current.value = "";
                    city.current.value = "";
                }
            });
    };

    const handleChange = (e) => {
        setType(e.target.value);
    };

    useEffect(() => {
        document.title = "Inventory System - Főoldal";
        getTypes();
    }, []);

    return (
        <Box>
            {hasShop ? (
                <Yourshop />
            ) : (
                <>
                    <Grid2
                        container
                        alignItems="center"
                        justifyContent="center"
                        sx={{ m: 2 }}
                        spacing={2}
                    >
                        <Grid2 container gap={2}>
                            <Typography
                                sx={{ typography: { sm: "h3", xs: "h4" } }}
                            >
                                Üdvözlünk, {user.name}
                            </Typography>
                            <MyAvatar width={55} height={55} />
                        </Grid2>
                    </Grid2>
                    <Grid2
                        container
                        alignItems="center"
                        justifyContent="center"
                        direction="row"
                    >
                        <Grid2
                            sx={{ width: { xs: "90%", sm: "30%", md: "20%" } }}
                        >
                            <Typography
                                sx={{ typography: { sm: "h4", xs: "h5" } }}
                            >
                                Vásárló <ShoppingCart />
                            </Typography>
                            <Typography variant="body1">
                                Ha nem dolgozik semmilyen boltan sem nézzen meg
                                különféle boltok publikus információit.
                            </Typography>
                            <Link to="/shops">
                                <Button variant="contained">Boltok</Button>
                            </Link>
                        </Grid2>
                        <Divider
                            flexItem
                            orientation="vertical"
                            sx={{
                                borderRightWidth: 5,
                                m: 2,
                                display: { xs: "none", sm: "flex" },
                            }}
                        />
                        <Grid2
                            sx={{ width: { xs: "90%", sm: "30%", md: "20%" } }}
                        >
                            <Typography
                                sx={{ typography: { sm: "h4", xs: "h5" } }}
                            >
                                Tulajdonos <BusinessCenter />
                            </Typography>
                            <Typography variant="body1">
                                Ha ön egy bolt tulajdonosa hozzon létre egyet az
                                oldalon és kezeljen egy helyen mindent.
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    setIsCreating(true);
                                }}
                            >
                                Létrehozás
                            </Button>
                        </Grid2>
                        <Divider
                            flexItem
                            orientation="vertical"
                            sx={{
                                borderRightWidth: 5,
                                m: 2,
                                display: { xs: "none", sm: "flex" },
                            }}
                        />
                        <Grid2
                            sx={{ width: { xs: "90%", sm: "30%", md: "20%" } }}
                        >
                            <Typography
                                sx={{ typography: { sm: "h4", xs: "h5" } }}
                            >
                                Dolgozó <AssignmentInd />
                            </Typography>
                            <Typography variant="body1">
                                Ha ön egy boltban dolgozik várja meg míg egy
                                felettese hozzáadja a bolthoz az oldalon vagy
                                szóljon nekik, hogy hozzanak létre egyet.
                            </Typography>
                            <Button variant="contained">Megosztás</Button>
                        </Grid2>
                    </Grid2>
                </>
            )}

            {isCreating && (
                <Dialog
                    open={isCreating}
                    onClose={(e) => {
                        setIsCreating(false);
                        setType("");
                    }}
                >
                    <DialogTitle>Bolt létrehozása</DialogTitle>
                    <DialogContent>
                        <Grid2 container>
                            <Grid2 container direction="column">
                                <Grid2 m={2}>
                                    <TextField
                                        fullWidth
                                        label="Bolt név"
                                        variant="outlined"
                                        inputRef={name}
                                        helperText={errors.name}
                                        error={errors.name != null}
                                        required
                                    />
                                </Grid2>
                                <Grid2 m={2}>
                                    <TextField
                                        fullWidth
                                        label="Tulajdonos"
                                        variant="outlined"
                                        inputRef={owner}
                                        helperText={errors.owner}
                                        error={errors.owner != null}
                                        required
                                    />
                                </Grid2>
                                <Grid2 m={2}>
                                    <FormControl
                                        fullWidth
                                        error={errors.shop_type_id != null}
                                        required
                                    >
                                        <InputLabel>Bolt típus</InputLabel>
                                        <Select
                                            onChange={handleChange}
                                            value={type}
                                            label="Bolt típus"
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
                            </Grid2>
                            <Grid2 container direction="column">
                                <Grid2 container direction="row">
                                    <Grid2 m={2}>
                                        <TextField
                                            fullWidth
                                            label="Város"
                                            variant="outlined"
                                            inputRef={address}
                                            helperText={errors.address}
                                            error={errors.address != null}
                                            required
                                        />
                                    </Grid2>
                                    <Grid2 m={2}>
                                        <TextField
                                            fullWidth
                                            label="Cím"
                                            variant="outlined"
                                            inputRef={city}
                                            helperText={errors.city}
                                            error={errors.city != null}
                                            required
                                        />
                                    </Grid2>
                                </Grid2>
                                <Grid2>
                                    <Map
                                        key={user.city}
                                        location={user.city}
                                        height={200}
                                    />
                                </Grid2>
                            </Grid2>
                        </Grid2>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="contained"
                            onClick={() => {
                                createShop();
                            }}
                        >
                            Létrehozás
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => {
                                setIsCreating(false);
                                setType("");
                            }}
                        >
                            Mégse
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </Box>
    );
}

export default Home;
