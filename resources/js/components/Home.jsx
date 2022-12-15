import { Inventory, Notifications } from "@mui/icons-material"
import { AppBar, Avatar, Badge, Box, Stack, Tab, Tabs, Toolbar, Typography } from "@mui/material"
import Image from "mui-image"
import { useEffect, useState } from "react"
import Navbar from "./Navbar"
import TabPanel from "./TabPanel"

function Home(){

    useEffect(()=>{
        document.title = "Inventory System - Home"
    }, [])



    return(
        <Box >
            <Navbar />

        </Box>
    )
}

export default Home