import {
    DarkMode,
    Inventory,
    LightMode,
    Notifications,
    Storefront,
} from "@mui/icons-material";
import {
    AppBar,
    Avatar,
    Badge,
    Box,
    Button,
    Divider,
    IconButton,
    Menu,
    MenuItem,
    styled,
    Tab,
    Tabs,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import Image from "mui-image";
import { useContext, useEffect, useState } from "react";
import TabPanel from "./TabPanel";
import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { deepOrange } from "@mui/material/colors";
import MenuIcon from "@mui/icons-material/Menu";
import MyAvatar from "./MyAvatar";
import Cookies from "js-cookie";
import { UserContext } from "./App";

function Navbar(props) {
    const { user } = useContext(UserContext);
    const cookie = Cookies.get("token");
    const [isAdmin, setIsAdmin] = useState(false);
    const [value, setValue] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
        </Box>
        */

    const logout = async () => {
        await axios
            .post(
                "http://127.0.0.1/InventorySystem/public/api/Logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${cookie}`,
                    },
                }
            )
            .then((response) => {
                Cookies.remove("token");
                console.log("Sikeres kijelentkezés!");
            })
            .catch((response) => {
                console.log("Sikertelen kijelentkezés!");
            });
    };

    return (
        <>
            <AppBar position="sticky">
                <Toolbar
                    sx={{ display: "flex", justifyContent: "space-between" }}
                >
                    <Tooltip title="Boltok" followCursor placement="top">
                        <IconButton
                            onClick={() => navigate("/shops")}
                            sx={{
                                color: "white",
                                display: { xs: "block", sm: "none" },
                            }}
                        >
                            <Storefront />
                        </IconButton>
                    </Tooltip>
                    <Link to="/home">
                        <Image
                            src="/InventorySystem/public/storage/logo.png"
                            width="150px"
                            duration={500}
                        />
                    </Link>
                    <Box sx={{ display: { xs: "none", sm: "block" } }}>
                        <Link to="/shops">
                            <Button sx={{ color: "white" }}>Boltok</Button>
                        </Link>
                        <Link to="/login">
                            <Button
                                sx={{
                                    color: "white",
                                    display: isAdmin ? "inline" : "none",
                                }}
                            >
                                Termékek
                            </Button>
                        </Link>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "20px",
                        }}
                    >
                        <IconButton
                            onClick={() => {
                                props.setMode(
                                    props.mode === "light" ? "dark" : "light"
                                );
                                localStorage.setItem(
                                    "mode",
                                    JSON.stringify(
                                        props.mode === "light"
                                            ? "dark"
                                            : "light"
                                    )
                                );
                            }}
                        >
                            {props.mode === "light" ? (
                                <LightMode />
                            ) : (
                                <DarkMode />
                            )}
                        </IconButton>
                        <Box
                            onClick={handleClick}
                            sx={{
                                ":hover": { cursor: "pointer" },
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                            }}
                        >
                            <MyAvatar />
                            <Typography
                                variant="p"
                                sx={{ display: { xs: "none", sm: "block" } }}
                            >
                                {user.name}
                            </Typography>
                        </Box>
                    </Box>
                </Toolbar>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                >
                    <Typography
                        align="center"
                        variant="body1"
                        sx={{ display: { xs: "block", sm: "none" } }}
                    >
                        {user.name}
                    </Typography>
                    <Divider sx={{ display: { xs: "block", sm: "none" } }} />
                    <Link to="/profile">
                        <MenuItem onClick={handleClose}>Profil</MenuItem>
                    </Link>
                    <Link to="/login">
                        <MenuItem onClick={logout}>Kijelentkezés</MenuItem>
                    </Link>
                </Menu>
            </AppBar>
            <Outlet />
        </>
    );
}

export default Navbar;
