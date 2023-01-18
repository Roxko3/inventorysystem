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

function Home() {
    const [hasShop, setHasShop] = useState(false);

    useEffect(() => {
        document.title = "Inventory System - Home";
    }, []);

    return (
        <Box>
            <Grid2
                container
                alignItems="center"
                justifyContent="center"
                sx={{ mt: 2 }}
                spacing={2}
            >
                {hasShop ? (
                    <Grid2>
                        <Typography variant="h4">Te boltod</Typography>
                        <Card variant="outlined" sx={{ m: 2 }}>
                            <Link
                                to="yourshop"
                                style={{ textDecoration: "none" }}
                            >
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        image="./images/template.png"
                                        sx={{ width: 150 }}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" sx={{ m: 1 }}>
                                            nev
                                        </Typography>
                                        <Typography variant="legend">
                                            9730, koszeg
                                        </Typography>
                                        <Rating
                                            value={2}
                                            readOnly
                                            sx={{ mt: 1 }}
                                        />
                                    </CardContent>
                                </CardActionArea>
                            </Link>
                        </Card>
                    </Grid2>
                ) : (
                    <CreateShop />
                )}
            </Grid2>
        </Box>
    );
}

export default Home;
