import { Verified, Warning } from "@mui/icons-material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Image from "mui-image";
import { useEffect } from "react";
import { useLocation } from "react-router";

function Verification() {
    const location = useLocation();

    const verify = async (token) => {
        axios
            .post("http://127.0.0.1/InventorySystem/public/api/verify-email", {
                tokenEmail: token,
            })
            .then((response) => {
                console.log(response.data);
            })
            .catch((response) => {
                if (response.response.status === 422) {
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
                <Verified color="success" sx={{ fontSize: "80px" }} />
                <Warning color="warning" sx={{ fontSize: "80px" }} />
            </Grid2>
        </Grid2>
    );
}

export default Verification;
