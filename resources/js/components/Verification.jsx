import { Verified, Warning } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Image from "mui-image";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

function Verification() {
    const location = useLocation();
    const [isSucces, setIsSuccess] = useState(false);

    const verify = async (token) => {
        axios
            .post("http://127.0.0.1/InventorySystem/public/api/verify-email", {
                tokenEmail: token,
            })
            .then((response) => {
                if (response.status === 200) {
                    setIsSuccess(true);
                    console.log(response.data);
                }
            })
            .catch((response) => {
                if (response.response.status === 422) {
                    setIsSuccess(false);
                    console.log("error", token);
                }
            });
    };

    useEffect(() => {
        document.title = "Inventory System - Hitelesítés";
        verify(location.search.split("=")[1]);
        console.log(location.search.split("=")[1]);
    }, []);

    return (
        <Grid2
            container
            spacing={2}
            direction="column"
            alignItems="center"
            justifyContent="center"
        >
            <Grid2>
                <Image
                    src="/InventorySystem/public/storage/logo.png"
                    duration={1500}
                    alt="Inventory System Logo"
                />
            </Grid2>
            <Grid2>
                {isSucces ? (
                    <Grid2
                        container
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Verified color="success" sx={{ fontSize: "100px" }} />
                        <Typography variant="h4" color="#2e7d32">
                            Sikeres hitelesítés!
                        </Typography>
                        <Link to="/login" replace>
                            <Button variant="contained" color="success">
                                Tovább a bejelentkezéshez
                            </Button>
                        </Link>
                    </Grid2>
                ) : (
                    <Grid2
                        container
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Warning color="warning" sx={{ fontSize: "100px" }} />
                        <Typography variant="h4" color="#ed6c02">
                            A link nem érvényes!
                        </Typography>
                    </Grid2>
                )}
            </Grid2>
        </Grid2>
    );
}

export default Verification;
