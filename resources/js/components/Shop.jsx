import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Cookies from "js-cookie";
import { Button, CircularProgress, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Link } from "react-router-dom";

function Shop() {
    const [shop, setShop] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFound, setIsFound] = useState(false);
    const { id } = useParams();
    const cookie = Cookies.get("token");

    const getShop = async () => {
        await axios
            .get(`http://127.0.0.1/InventorySystem/public/api/getShop/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + cookie,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data[0]);
                    setShop(response.data[0]);
                    setIsFound(true);
                    setLoading(false);
                }
            })
            .catch((response) => {
                if (response.response.status === 404) {
                    setIsFound(false);
                    setLoading(false);
                }
            });
    };

    useEffect(() => {
        document.title = "Inventory System - Boltok";
        getShop();
    }, []);

    if (loading) return <CircularProgress />;

    if (!isFound)
        return (
            <Grid2>
                <Link to="/shops">
                    <Button>Vissza</Button>
                </Link>
                <Grid2 container alignItems="center" justifyContent="center">
                    <Typography variant="h4">
                        Nem található ilyen bolt!
                    </Typography>
                </Grid2>
            </Grid2>
        );

    return (
        <Grid2>
            <Link to="/shops">
                <Button>Vissza</Button>
            </Link>
        </Grid2>
    );
}

export default Shop;
