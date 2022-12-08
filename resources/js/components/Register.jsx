import { Button, Paper, TextField, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Link } from "react-router-dom";

function Register(){
    return(
        <Grid2 container spacing={2} direction="column" alignItems="center" justifyContent="center" sx={{mt: 30}}>
            <Paper>
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