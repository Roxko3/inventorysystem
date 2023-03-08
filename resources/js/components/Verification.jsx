import { Verified, Warning } from "@mui/icons-material";
import { Button, TextField, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Image from "mui-image";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

function Verification() {
    const location = useLocation();
    const [isSucces, setIsSuccess] = useState(false);
    const [errors, setErrors] = useState([]);
    const email = useRef("");

    const verify = async (token) => {
        axios
            .post(`${process.env.MIX_BACKEND_URL}/verify-email`, {
                tokenEmail: token,
            })
            .then((response) => {
                if (response.status === 200) {
                    setIsSuccess(true);
                    //console.log(response.data);
                }
            })
            .catch((response) => {
                if (response.response.status === 422) {
                    setIsSuccess(false);
                    //console.log("error", token);
                }
            });
    };

    const resend = async () => {
        axios
            .post(
                `${process.env.MIX_BACKEND_URL}/email/verification-notification`,
                {
                    email: email.current.value,
                }
            )
            .then((response) => {
                if (response.status === 200) {
                    //console.log(response.data);
                    setErrors([]);
                    setIsSuccess(true);
                }
            })
            .catch((response) => {
                if (response.response.status === 400) {
                    //setIsSuccess(false);
                    //console.log(response.response.data);
                    setErrors(response.response.data);
                }
                if (response.response.status === 422) {
                    //setIsSuccess(false);
                    //console.log(response.response.data);
                    setErrors(response.response.data);
                }
            });
    };

    useEffect(() => {
        document.title = "Inventory System - Hitelesítés";
        verify(location.search.split("=")[1]);
        //console.log(location.search.split("=")[1]);
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
                        <Grid2>
                            <TextField
                                label="E-mail cím"
                                inputRef={email}
                                size="small"
                                error={errors.email != null}
                                helperText={errors.email}
                            />
                        </Grid2>
                        <Grid2>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    resend();
                                }}
                            >
                                Új küldése
                            </Button>
                        </Grid2>
                    </Grid2>
                )}
            </Grid2>
        </Grid2>
    );
}

export default Verification;
