import {
    Alert,
    Button,
    Paper,
    Snackbar,
    TextField,
    Typography,
} from "@mui/material"
import Grid2 from "@mui/material/Unstable_Grid2"
import axios from "axios"
import React, { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Image from 'mui-image'


function Login() {
    const email = useRef("")
    const password = useRef("")
    const [open, setOpen] = useState(false)
    const [alertMessage, setalertMessage] = useState("")
    const [severity, setseverity] = useState("error")
    const navigate = useNavigate()
    const [errors,setErrors] = useState([])

    const login = async () => {       
            await axios
                .post("http://127.0.0.1/InventorySystem/public/api/login", {
                    email: email.current.value,
                    password: password.current.value,
                })
                .then((response) => {
                    if (response.status === 200) {
                        email.current.value = ""
                        password.current.value = ""
                        setalertMessage("Sikeres bejelentkezés!")
                        setseverity("success")
                        setErrors([])
                        setOpen(true)                 
                        //navigate("/register");
                    }
                })
                .catch((response) => {
                    if(response.response.status === 422){
                        setErrors(response.response.data)
                    }
                    else {
                        email.current.value = ""
                        password.current.value = ""
                        setalertMessage(response.response.data.error)
                        setseverity("error")
                        setOpen(true)
                    }                  
                })
        }

    const handleClose = (reason) => {
        if (reason === "clickaway") {
            return
        }

        setOpen(false)
    }

    useEffect(()=>{
        document.title = "Bejelentkezés"
    }, [])

    return (      
        <Grid2
            container
            spacing={2}
            direction="column"
            alignItems="center"
            justifyContent="center"
        >
            <Grid2>
            <Image src="./images/logo.png" duration={1500} alt="Inventory System Logo"/>
            </Grid2>
            <Paper elevation={8}>
                <Grid2>
                    <Typography variant="h4">Bejelentkezés</Typography>
                </Grid2>
                <Grid2>
                    <TextField label="Email cím" fullWidth variant="outlined" inputRef={email} helperText={errors.email} />
                </Grid2>
                <Grid2>
                    <TextField label="Jelszó" fullWidth type="password" variant="outlined" inputRef={password} helperText={errors.password}/>
                </Grid2>
                <Grid2>
                    <Button variant="contained" onClick={login}>
                        Bejelentkezés
                    </Button>
                </Grid2>
                <Grid2>
                    <Link to="/register">
                        <Button variant="text">Regisztráció</Button>
                    </Link>
                    <br />
                    <Link to="/forgotpass">
                        <Button variant="text">Elfelejtett jelszó</Button>
                    </Link>
                </Grid2>
            </Paper>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={severity}
                    sx={{ width: "100%" }}
                >
                    {alertMessage}
                </Alert>
            </Snackbar>
        </Grid2>
    )
}

export default Login
