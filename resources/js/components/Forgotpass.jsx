import { Button, IconButton, InputAdornment, Paper, TextField, Typography } from "@mui/material"
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import { useEffect, useRef, useState } from "react"
import Image from 'mui-image'
import { Visibility, VisibilityOff } from "@mui/icons-material"

function Forgotpass(){
    const [emailSent,setEmailSent] = useState(false)
    const [email,setEmail] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    useEffect(()=>{
        document.title = "Inventory System - Elfelejtett jelszó"
    }, [])

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
                        <Typography variant="p">Email elküldve: {email} címre</Typography>
                    </Grid2>              
                    <Grid2>
                        <TextField fullWidth variant="outlined" label="Kód"/>
                    </Grid2>
                    <Grid2>
                        <TextField fullWidth variant="outlined" type={showPassword ? "text" : "password"} label="Új jelszó"
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                onClick={handleClickShowPassword}
                                                                onMouseDown={handleMouseDownPassword}
                                                            >
                                                                {showPassword ? (
                                                                    <Visibility />
                                                                ) : (
                                                                    <VisibilityOff />
                                                                )}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                        />
                    </Grid2>
                    <Grid2>
                        <TextField fullWidth variant="outlined" type={showPassword ? "text" : "password"} label="Új jelszó újra"
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                onClick={handleClickShowPassword}
                                                                onMouseDown={handleMouseDownPassword}
                                                            >
                                                                {showPassword ? (
                                                                    <Visibility />
                                                                ) : (
                                                                    <VisibilityOff />
                                                                )}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                        />
                    </Grid2>
                    <Grid2>
                        <Button variant="contained">Megváltoztatás</Button>
                    </Grid2>
                    </>
                    :
                    <>                    
                    <Grid2>
                        <TextField fullWidth variant="outlined" label="Email cím" onChange={()=>setEmail(event.target.value)}/>
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

export default Forgotpass