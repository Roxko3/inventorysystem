import { Route, Routes, useNavigate } from "react-router-dom";
import Forgotpass from "./Forgotpass";
import Home from "./Home";
import Login from "./Login";
import Notfound from "./Notfound";
import Profile from "./Profile";
import Register from "./Register";
import Shops from "./Shops";
import Shop from "./Shop";
import Navbar from "./Navbar";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Box, createTheme, ThemeProvider, useTheme } from "@mui/material";
import { useCookies } from "react-cookie";
import Cookies from "js-cookie";

const ColorModeContext = createContext({ toggleColorMode: () => {} });
export const UserContext = createContext();

function App() {
    const navigate = useNavigate();
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mode, setMode] = useState(
        JSON.parse(localStorage.getItem("mode")) || "light"
    );
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) =>
                    prevMode === "light" ? "dark" : "light"
                );
            },
        }),
        []
    );

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode]
    );

    const cookie = Cookies.get("token");

    const getUser = async () => {
        await axios
            .get("http://127.0.0.1/InventorySystem/public/api/myProfile", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + cookie,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    setUser(response.data);
                    console.log(response.data);
                    setLoading(false);
                }
            })
            .catch((response) => {
                if (response.response.status == 401) {
                    navigate("/login");
                    setLoading(false);
                }
            });
    };

    useEffect(() => {
        getUser();
    }, []);

    if (loading) return "Loading...";

    return (
        <UserContext.Provider value={user}>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <Box
                        bgcolor={"background.default"}
                        color={"text.primary"}
                        sx={{ overflow: "hidden", overflowY: "auto" }}
                    >
                        <Routes>
                            <Route
                                element={
                                    <Navbar setMode={setMode} mode={mode} />
                                }
                            >
                                <Route path="/home" element={<Home />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/shops" element={<Shops />} />
                                <Route path="/shops/:id" element={<Shop />} />
                            </Route>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route
                                path="/forgotpass"
                                element={<Forgotpass />}
                            />
                            <Route path="*" element={<Notfound />} />
                        </Routes>
                    </Box>
                </ThemeProvider>
            </ColorModeContext.Provider>
        </UserContext.Provider>
    );
}

export default App;
