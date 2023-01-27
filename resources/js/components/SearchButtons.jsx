import { Add, Delete, Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Searchbar from "./Searchbar";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

function SearchButtons(props) {
    return (
        <Grid2
            container
            direction="row"
            alignItems="center"
            justifyContent="left"
        >
            <IconButton onClick={props.onClick}>
                <Add />
            </IconButton>
            <IconButton onClick={props.onClick}>
                <Edit />
            </IconButton>
            <IconButton onClick={props.onClick}>
                <Delete />
            </IconButton>
            <Searchbar />
        </Grid2>
    );
}

export default SearchButtons;
