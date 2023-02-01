import {
    Autocomplete,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Box } from "@mui/system";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function AddStorage() {
    const [pValue, setPValue] = useState("");
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        axios
            .get("http://127.0.0.1/InventorySystem/public/api/products")
            .then((response) => {
                if (response.status === 200) {
                    setProducts(response.data);
                }
            });
    };

    const handleChange = (e) => {
        setPValue(e.target.value);
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <Grid2
            container
            spacing={2}
            direction="column"
            alignItems="center"
            justifyContent="center"
        >
            {/*<Autocomplete
                options={products}
                renderInput={(products) => (
                    <TextField {...products} label="Termék" />
                )}
            />*/}
            <Grid2>
                <Typography variant="h5">
                    Termék hozzáadása a raktárhoz
                </Typography>
            </Grid2>
            <Grid2>
                <FormControl fullWidth>
                    <InputLabel>Termék</InputLabel>
                    <Select
                        value={pValue}
                        label="Termék"
                        onChange={handleChange}
                    >
                        {products.map((products) => (
                            <MenuItem value={products.id} key={products.id}>
                                {products.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid2>
            <Grid2>
                <TextField
                    fullWidth
                    label="Mennyiség"
                    variant="outlined"
                    type="number"
                />
            </Grid2>
            <Grid2>
                <TextField
                    fullWidth
                    label="Ár"
                    variant="outlined"
                    type="number"
                />
            </Grid2>
            <Grid2>
                <TextField
                    fullWidth
                    label="Lejárat"
                    variant="outlined"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid2>
            <Grid2>
                <Button variant="contained">Hozzáadás</Button>
            </Grid2>
        </Grid2>
    );
}

export default AddStorage;
