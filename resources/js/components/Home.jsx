import { Add, Inventory, Notifications } from "@mui/icons-material";
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
    FormControl,
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
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreateShop from "./CreateShop";
import Navbar from "./Navbar";
import TabPanel from "./TabPanel";
import Yourshop from "./Yourshop";
import Cookies from "js-cookie";
import { UserContext } from "./App";

function Home() {
    const { user } = useContext(UserContext);
    const [hasShop, setHasShop] = useState(user.shop_id != null);
    const [shop, setShop] = useState([]);
    const [loading, setLoading] = useState(true);
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

    useEffect(() => {
        document.title = "Inventory System - Home";
    }, []);

    return (
        <Box>
            {hasShop ? (
                <Yourshop />
            ) : (
                <Grid2
                    container
                    alignItems="center"
                    justifyContent="center"
                    sx={{ mt: 2 }}
                    spacing={2}
                >
                    <CreateShop />
                </Grid2>
            )}
        </Box>
    );
}

export default Home;
