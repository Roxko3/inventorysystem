import { Button, Paper, TextField, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useState } from "react";


function Forgotpass(){
    const [emailSent,setEmailSent] = useState(false);

    
    return(
        <Grid2 container spacing={2} direction="column" alignItems="center" justifyContent="center" sx={{mt: 30}}>
            <Paper>
                {emailSent ? 
                 <Grid2 container spacing={2}>
                    
                 </Grid2>
                : 
                    <>
                    <Grid2>
                    <Typography variant="h4">Elfelejtett jelszó</Typography>
                    </Grid2>
                    <Grid2>
                        <TextField required label="Email cím" variant="outlined"/>      
                    </Grid2>
                    <Grid2>
                        <Button variant="contained" onClick={setEmailSent(true)}>Email küldése</Button>
                    </Grid2>
                    </>
                }               
            </Paper>
        </Grid2>
    )
}

export default Forgotpass;