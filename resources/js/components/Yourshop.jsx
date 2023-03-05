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
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Log from "./Log";
import Navbar from "./Navbar";
import Products from "./Products";
import ShopData from "./ShopData";
import Storage from "./Storage";
import TabPanel from "./TabPanel";
import Users from "./Users";

function Yourshop() {
    const navigate = useNavigate();
    const location = useLocation();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        navigate({ pathname: "/home", search: `?page=${newValue}` });
        setValue(newValue);
    };

    useEffect(() => {
        if (location.search == "") {
            navigate({ pathname: "/home", search: `?page=0` });
        }
    }, []);

    return (
        <Box>
            <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                        value={parseInt(location.search.split("=")[1])}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        <Tab label="Adatok"></Tab>
                        {/*<Tab label="Termékek"></Tab>*/}
                        <Tab label="Raktár"></Tab>
                        <Tab label="Dolgozók"></Tab>
                        <Tab label="Napló"></Tab>
                    </Tabs>
                </Box>
                <TabPanel
                    value={parseInt(location.search.split("=")[1])}
                    index={0}
                >
                    <ShopData />
                </TabPanel>
                {/*<TabPanel value={value} index={1}>
                    <Products />
    </TabPanel>*/}
                <TabPanel
                    value={parseInt(location.search.split("=")[1])}
                    index={1}
                >
                    <Storage />
                </TabPanel>
                <TabPanel
                    value={parseInt(location.search.split("=")[1])}
                    index={2}
                >
                    <Users />
                </TabPanel>
                <TabPanel
                    value={parseInt(location.search.split("=")[1])}
                    index={3}
                >
                    <Log />
                </TabPanel>
            </Box>
        </Box>
    );
}

export default Yourshop;
