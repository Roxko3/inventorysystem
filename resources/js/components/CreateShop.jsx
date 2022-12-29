import {
    Button,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

function CreateShop() {
    const name = useRef("");
    const shopType = useRef(-1);
    const address = useRef("");
    const owner = useRef("");
    const postalCode = useRef("");
    const [shopTypes, setShopTypes] = useState([]);
    const [type, setType] = useState("");
    const [errors, setErrors] = useState([]);

    const getTypes = async () => {
        axios
            .get("http://127.0.0.1/InventorySystem/public/api/shoptypes")
            .then((response) => {
                if (response.status === 200) {
                    setShopTypes(response.data);
                }
            });
    };

    const createShop = async () => {
        await axios
            .post("http://127.0.0.1/InventorySystem/public/api/shops/create", {
                name: name.current.value,
                shop_type_id: shopType.current.value,
                address: address.current.value,
                owner: owner.current.value,
                postal_code: postalCode.current.value,
            })
            .then((response) => {
                if (response.status === 200) {
                    name.current.value = "";
                    shopType.current.value = -1;
                    setType(-1);
                    address.current.value = "";
                    owner.current.value = "";
                    postalCode.current.value = "";
                    console.log("sikeres");
                }
            })
            .catch((response) => {
                if (response.response.status === 422) {
                    setErrors(response.response.data);
                    console.log(response.response.data);
                } else {
                    name.current.value = "";
                    shopType.current.value = -1;
                    setType(-1);
                    address.current.value = "";
                    owner.current.value = "";
                    postalCode.current.value = "";
                }
            });
    };

    const handleChange = (e) => {
        setType(e.target.value);
    };

    useEffect(() => {
        getTypes();
    }, []);

    return (
        <Grid2
            container
            alignItems="center"
            justifyContent="center"
            direction="column"
        >
            <Grid2>
                <Typography variant="h4">
                    Még nincs boltod, hozz létre egyet!
                </Typography>
            </Grid2>
            <Grid2>
                <TextField
                    label="Név"
                    inputRef={name}
                    helperText={errors.name}
                />
            </Grid2>
            <Grid2>
                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel>Bolt típus</InputLabel>
                    <Select
                        onChange={handleChange}
                        value={type}
                        label="Bolt típus"
                        inputRef={shopType}
                    >
                        {shopTypes.map((shopTypes) => (
                            <MenuItem value={shopTypes.id} key={shopTypes.id}>
                                {shopTypes.name}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>{errors.shop_type_id}</FormHelperText>
                </FormControl>
            </Grid2>
            <Grid2>
                <TextField
                    label="Cím"
                    inputRef={address}
                    helperText={errors.address}
                />
            </Grid2>
            <Grid2>
                <TextField
                    label="Tulajdonos"
                    inputRef={owner}
                    helperText={errors.owner}
                />
            </Grid2>
            <Grid2>
                <TextField
                    label="Irányítószám"
                    inputRef={postalCode}
                    helperText={errors.postal_code}
                />
            </Grid2>
            <Grid2>
                <Button onClick={createShop} variant="contained">
                    Létrehozás
                </Button>
            </Grid2>
        </Grid2>
    );
}

export default CreateShop;
