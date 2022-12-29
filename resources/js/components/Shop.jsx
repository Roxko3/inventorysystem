import { useParams } from "react-router"


function Shop(){
    const { id } = useParams()

    return(
        <h1>Bolt {id}</h1>
    )
}

export default Shop