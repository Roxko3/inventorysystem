import {
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    CircularProgress,
    Divider,
    List,
    ListItem,
    Rating,
    Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function Shops() {
    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(true);

    const getShops = async () => {
        await axios
            .get("http://127.0.0.1/InventorySystem/public/api/shops")
            .then((response) => {
                if (response.status === 200) {
                    setShops(response.data);
                    setLoading(false);
                }
            });
    };

    useEffect(() => {
        document.title = "Inventory System - Boltok";
        getShops();
    }, []);

    return (
        <Box>
            <Grid2
                mt={2}
                container
                spacing={2}
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                <Grid2>
                    <Typography variant="h3">Boltok</Typography>
                </Grid2>
                {loading ? (
                    <CircularProgress
                        disableShrink
                        sx={{ animationDuration: "300ms" }}
                    />
                ) : (
                    <Grid2
                        container
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                    >
                        {shops.map((shops) => (
                            <Card
                                variant="outlined"
                                sx={{ m: 2, width: 400, height: 400 }}
                                key={shops.id}
                            >
                                <Link to={`/shops/${shops.id}`}>
                                    <CardActionArea>
                                        <Grid2
                                            container
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <CardMedia
                                                component="img"
                                                image="./images/shop.png"
                                                sx={{
                                                    width: 300,
                                                }}
                                            />
                                        </Grid2>
                                        <CardContent>
                                            <Typography variant="h6">
                                                {
                                                    shops.name /*shops.name.length <= 19
                                                    ? shops.name
                                                    : shops.name.substr(0, 19) +
                                            "..."*/
                                                }
                                            </Typography>
                                            <Typography variant="legend">
                                                {shops.postal_code}
                                            </Typography>
                                            <br />
                                            <Rating value={2} readOnly />
                                        </CardContent>
                                    </CardActionArea>
                                </Link>
                            </Card>
                        ))}
                    </Grid2>
                )}
            </Grid2>
        </Box>
    );
}

export default Shops;
