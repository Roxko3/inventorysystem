import { Button, Paper, TextField, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useState } from "react";
import Image from 'mui-image';

function Forgotpass(){
    const [emailSent,setEmailSent] = useState(false);

    
    return(
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
            <Paper  elevation={8}>
                <Grid2>
                    <Typography variant="h4">Elfelejtett jelszó</Typography>
                </Grid2>
                {emailSent ?
                    <>      
                    <Grid2>
                        <Typography variant="p">Email elküldve: admin@localhost címre</Typography>
                    </Grid2>              
                    <Grid2>
                        <TextField variant="outlined" label="Kód"/>
                    </Grid2>
                    <Grid2>
                        <TextField variant="outlined" type="password" label="Új jelszó"/>
                    </Grid2>
                    <Grid2>
                        <TextField variant="outlined" type="password" label="Új jelszó újra"/>
                    </Grid2>
                    <Grid2>
                        <Button variant="contained">Megváltoztatás</Button>
                    </Grid2>
                    </>
                    :
                    <>                    
                    <Grid2>
                        <TextField variant="outlined" label="Email cím"/>
                    </Grid2>
                    <Grid2>
                        <Button variant="contained" onClick={()=>setEmailSent(true)}>Küldés</Button>
                    </Grid2>
                    </>
                }               
            </Paper>
        </Grid2>
    )
}

export default Forgotpass;