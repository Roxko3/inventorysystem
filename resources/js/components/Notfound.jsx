import { Button, Paper, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Image from "mui-image";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Notfound() {
    useEffect(() => {
        document.title = "404 Az oldal nem található";
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
                    src="/storage/logo.png"
                    duration={1500}
                    alt="Inventory System Logo"
                />
            </Grid2>
            <Grid2>
                <Typography variant="h2">404 Az oldal nem található</Typography>
            </Grid2>
            <Grid2>
                <Link to="/home">
                    <Button variant="text">
                        <Typography variant="h6">Főoldal</Typography>
                    </Button>
                </Link>
            </Grid2>
        </Grid2>
    );
}

export default Notfound;
