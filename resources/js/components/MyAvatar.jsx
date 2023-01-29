import { Avatar } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "./App";

function MyAvatar(props) {
    const user = useContext(UserContext);
    function stringToColor(string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = "#";

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: stringToColor(name),
                width: props.width,
                height: props.height,
            },
            children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
        };
    }

    return (
        <Avatar {...stringAvatar(user.name)} src="https://picsu.photos/200" />
    );
}

export default MyAvatar;
