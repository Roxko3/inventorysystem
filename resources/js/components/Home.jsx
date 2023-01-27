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
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreateShop from "./CreateShop";
import Navbar from "./Navbar";
import TabPanel from "./TabPanel";
import Yourshop from "./Yourshop";

function Home() {
    const [hasShop, setHasShop] = useState(true);

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
