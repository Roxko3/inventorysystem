import { Add, Edit, EditOff, PhotoCamera } from "@mui/icons-material"
import { Avatar, Badge, Box, Button, Divider, IconButton, TextField, Typography } from "@mui/material"
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import { useEffect, useState } from "react"
import MyAvatar from "./MyAvatar"
import Navbar from "./Navbar"

function Profile(){
    const [editing,setEditing] = useState("")


    useEffect(()=>{
        document.title = "Inventory System - Profil"
    }, [])

    return(
        <Box>
            <Navbar name="Gyarmati Levente"/>
            <Grid2
            mt={3}
            container
            spacing={2}
            direction="column"
            alignItems="center"
            justifyContent="center"
            >
                <Grid2>
                    <Typography variant="h4">Profil beállítások</Typography>
                </Grid2>
                <Grid2 container direction="row" alignItems="center">
                    <Grid2>     
                        <Badge 
                            badgeContent={<IconButton color="default" 
                            sx={{ border: "2px solid",backgroundColor:"gray",":hover":{backgroundColor:"grey"}}} 
                            size="small">
                            <PhotoCamera />
                            </IconButton>} 
                            overlap="circular"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                              }}>        
                            <MyAvatar width={100} height={100} name="Gyarmati Levente"/>                           
                        </Badge>   
                    </Grid2>
                    <Grid2 container direction="column">
                        <Grid2>
                            <TextField disabled={editing !== "name"} label="Név" defaultValue="Gyarmati Levente" size="small"/>
                            <IconButton color="info" 
                            onClick={
                                editing !== "name" ?
                                ()=>setEditing("name") :
                                ()=>setEditing("")
                                }>                               
                                {editing !== "name"?                              
                                <Edit />:
                                <EditOff />
                                }
                            </IconButton>
                        </Grid2>
                        <Grid2>
                            <TextField disabled={editing !== "email"} label="Email cím" defaultValue="gyarmatilevi@gmail.com" size="small"/>
                            <IconButton color="info" 
                            onClick={
                                editing !== "email" ?
                                ()=>setEditing("email") :
                                ()=>setEditing("")
                                }>                               
                                {editing !== "email"?                              
                                <Edit />:
                                <EditOff />
                                }
                            </IconButton>
                        </Grid2>                        
                    </Grid2>                  
                </Grid2>
                <Grid2>
                    <Button variant="contained">Mentés</Button>
                </Grid2>
            </Grid2>
        </Box>
    )
}

export default Profile