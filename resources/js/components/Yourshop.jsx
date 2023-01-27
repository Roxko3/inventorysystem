import {
    Box,
    Paper,
    Tab,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tabs,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useState } from "react";
import Log from "./Log";
import Navbar from "./Navbar";
import Products from "./Products";
import ShopData from "./ShopData";
import Storage from "./Storage";
import TabPanel from "./TabPanel";
import Users from "./Users";

function Yourshop() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box>
            <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        <Tab label="Adatok"></Tab>
                        {/*<Tab label="Termékek"></Tab>*/}
                        <Tab label="Raktár"></Tab>
                        <Tab label="Dolgozók"></Tab>
                        <Tab label="Logok"></Tab>
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <ShopData />
                </TabPanel>
                {/*<TabPanel value={value} index={1}>
                    <Products />
    </TabPanel>*/}
                <TabPanel value={value} index={1}>
                    <Storage />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Users />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <Log />
                </TabPanel>
            </Box>
        </Box>
    );
}

export default Yourshop;
