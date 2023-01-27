import { Route, Routes } from "react-router-dom";
import Forgotpass from "./Forgotpass";
import Home from "./Home";
import Login from "./Login";
import Notfound from "./Notfound";
import Profile from "./Profile";
import Register from "./Register";
import Shops from "./Shops";
import Shop from "./Shop";
import Navbar from "./Navbar";
import { createContext, useContext, useMemo, useState } from "react";
import { Box, createTheme, ThemeProvider, useTheme } from "@mui/material";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
    const [mode, setMode] = useState("light");
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

    return (
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
                                <Navbar
                                    name="Gyarmati Levente"
                                    setMode={setMode}
                                    mode={mode}
                                />
                            }
                        >
                            <Route path="/" element={<Home />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/shops" element={<Shops />} />
                            <Route path="/shops/:id" element={<Shop />} />
                        </Route>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/forgotpass" element={<Forgotpass />} />
                        <Route path="*" element={<Notfound />} />
                    </Routes>
                </Box>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
