import { useEffect } from "react"

function Home(){

    useEffect(()=>{
        document.title = "Inventory System"
    }, [])

    return(
        <h1>Home</h1>
    )
}

export default Home