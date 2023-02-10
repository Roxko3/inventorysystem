import { ExpandMore, Search } from "@mui/icons-material";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    CircularProgress,
    Divider,
    IconButton,
    List,
    ListItem,
    Pagination,
    Rating,
    TextField,
    Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Box } from "@mui/system";
import axios from "axios";
import { useContext } from "react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./App";
import Map from "./Map";
import Navbar from "./Navbar";
import Cookies from "js-cookie";

function Shops() {
    const user = useContext(UserContext);
    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [postalCode, setPostalCode] = useState(user.postal_code);
    const cookie = Cookies.get("token");

    const getShops = async () => {
        await axios
            .get("http://127.0.0.1/InventorySystem/public/api/shops", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + cookie,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    setShops(response.data.data);
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
                        <Grid2
                            container
                            alignItems="center"
                            justifyContent="center"
                            sx={{ width: "90%" }}
                        >
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMore />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>Térkép</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid2
                                        container
                                        alignItems="center"
                                        justifyContent="center"
                                    >
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
                                        />
                                    </Grid2>
                                    <Map
                                        key={postalCode}
                                        location={postalCode}
                                        width={300}
                                        height={300}
                                    />
                                </AccordionDetails>
                            </Accordion>
                        </Grid2>
                        {shops.map((shops) => (
                            <Card
                                variant="outlined"
                                sx={{
                                    m: 2,
                                    width: { xs: 240, md: 340 },
                                    height: { xs: 240, md: 340 },
                                }}
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
                                                image={
                                                    shops.image_path == null
                                                        ? "./images/template.png"
                                                        : shops.image_path
                                                }
                                                sx={{
                                                    width: { xs: 140, md: 240 },
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
                        <Grid2
                            container
                            alignItems="center"
                            justifyContent="center"
                            sx={{ width: "90%" }}
                        >
                            <Pagination count={10} />
                        </Grid2>
                    </Grid2>
                )}
            </Grid2>
        </Box>
    );
}

export default Shops;
