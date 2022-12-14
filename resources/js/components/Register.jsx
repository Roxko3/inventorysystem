import { Alert, Button, Paper, Snackbar, TextField, Typography } from "@mui/material"
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import { Link } from "react-router-dom"
import Image from 'mui-image'
import { useEffect, useRef, useState } from "react"
import axios from "axios"

function Register(){
    const email = useRef("")
    const name = useRef("")
    const password =  useRef("")
    const postalCode = useRef("")
    const [open, setOpen] = useState(false)
    const [alertMessage, setalertMessage] = useState("")
    const [severity, setseverity] = useState("error")
    const [errors,setErrors] = useState([])

    const register = async () =>{
        await axios
        .post("http://127.0.0.1/InventorySystem/public/api/register", {
            email: email.current.value,
            password: password.current.value,
            name: name.current.value,
            postal_code: postalCode.current.value,
        })
        .then((response) => {
            if (response.status === 200) {
                email.current.value = ""
                password.current.value = ""
                name.current.value = ""
                postalCode.current.value = ""
                setalertMessage("Sikeres regisztráció!")
                setseverity("success")
                setErrors([])
                setOpen(true)
                //navigate("/register");
            }
        })
        .catch((response) => {
            if(response.response.status === 422){
                setErrors(response.response.data)
                console.log(response.response.data)
            }
            else {
                email.current.value = ""
                password.current.value = ""
                name.current.value = ""
                postalCode.current.value = ""
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
        document.title = "Regisztráció"
    }, [])

    return(
        <Grid2 container spacing={2} direction="column" alignItems="center" justifyContent="center">
            <Grid2>
            <Image src="./images/logo.png" duration={1500} alt="Inventory System Logo"/>
            </Grid2>
            <Paper  elevation={8}>
                <Grid2> 
                <Typography variant="h4">
                    Regisztráció
                </Typography>                                
                </Grid2>
                <Grid2>
                    <TextField required fullWidth label="Email cím" variant="outlined" inputRef={email} helperText={errors.email}/>      
                </Grid2>
                <Grid2>
                    <TextField required fullWidth label="Felhasználónév" variant="outlined" inputRef={name} helperText={errors.name}/>      
                </Grid2>
                <Grid2>
                    <TextField required fullWidth label="Jelszó" type="password" variant="outlined" inputRef={password} helperText={errors.password}/>
                </Grid2>
                <Grid2>
                    <TextField required fullWidth label="Jelszó újra" type="password" variant="outlined"/>
                </Grid2>
                <Grid2>
                    <TextField label="Irányítószám" fullWidth  variant="outlined" inputRef={postalCode}/>
                </Grid2>
                <Grid2>
                    <Button variant="contained" onClick={register}>Regisztráció</Button>                    
                </Grid2>
                <Grid2>
                    <Link to="/login"><Button variant="text">Bejelentkezés</Button></Link>
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

export default Register