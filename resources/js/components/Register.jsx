import { Button, Paper, TextField, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Link } from "react-router-dom";
import Image from 'mui-image';

function Register(){
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
                    <TextField required label="Email cím" variant="outlined"/>      
                </Grid2>
                <Grid2>
                    <TextField required label="Felhasználónév" variant="outlined"/>      
                </Grid2>
                <Grid2>
                    <TextField required label="Jelszó" type="password" variant="outlined"/>
                </Grid2>
                <Grid2>
                    <Button variant="contained">Regisztráció</Button>                    
                </Grid2>
                <Grid2>
                    <Link to="/login"><Button variant="text">Bejelentkezés</Button></Link>
                </Grid2>
            </Paper>
            </Grid2>
    )
}

export default Register;