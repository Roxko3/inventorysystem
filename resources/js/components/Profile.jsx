import { Box } from "@mui/material"
import { useEffect } from "react"
import Navbar from "./Navbar"

function Profile(){

    useEffect(()=>{
        document.title = "Inventory System - Profil"
    }, [])

    return(
        <Box>
            <Navbar />
            <h1>Profil</h1>
        </Box>
    )
}

export default Profile