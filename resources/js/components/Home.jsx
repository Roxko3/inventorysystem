import { Inventory, Notifications } from "@mui/icons-material"
import { AppBar, Avatar, Badge, Box, Tab, Tabs, Toolbar, Typography } from "@mui/material"
import Image from "mui-image"
import { useEffect, useState } from "react"
import TabPanel from "./TabPanel"

function Home(){
    const [value,setValue] = useState(0)

    const handleChange = (event,newValue) =>{
        setValue(newValue)
    }

    useEffect(()=>{
        document.title = "Inventory System"
    }, [])

/*<Box sx={{width: '100%'}}>
            <Box sx={{borderBottom : 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Tab 1"></Tab>
                    <Tab label="Tab 2"></Tab>
                    <Tab label="Tab 3"></Tab>
                </Tabs>
            </Box>            
            <TabPanel value={value} index={0}>
                Tab 1
            </TabPanel>
            <TabPanel value={value} index={1}>
                Tab 2
            </TabPanel>
            <TabPanel value={value} index={2}>
                Tab 3
            </TabPanel>
        </Box>*/

    return(
        <AppBar position="sticky">
            <Toolbar sx={{display:"flex",justifyContent:"space-between"}}>
                <Typography variant="h6" sx={{display:{xs:"none",sm:"block"}}}>Inventory System</Typography>
                <Inventory sx={{display:{xs:"block",sm:"none"}}}/>
                <Badge badgeContent={2} color="error"><Notifications /></Badge>
                <Avatar>F</Avatar>
                <Typography variant="p" sx={{display:{xs:"none",sm:"block"}}}>Feri</Typography>
            </Toolbar>
        </AppBar>

        
    )
}

export default Home