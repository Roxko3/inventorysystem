import { Route, Routes } from "react-router-dom";
import Forgotpass from "./Forgotpass";
import Home from "./Home";
import Login from "./Login";
import Notfound from "./Notfound";
import Profile from "./Profile";
import Register from "./Register";
import Shops from "./Shops";
import Shop from "./Shop";
import Yourshop from "./Yourshop";
import Navbar from "./Navbar";
import { Box } from "@mui/material";
import Map from "./Map";

function App() {
    return (
        <Routes>
            <Route element={<Navbar name="Gyarmati Levente" />}>
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
    );
}

export default App;
