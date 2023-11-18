import { useEffect } from "react"
import { redirect } from "react-router-dom"
import AppNavbar from "./appNavbar"

const PrivatePage = ({children}) =>{
    useEffect(()=> {
        let userData = localStorage.getItem("user")
        if(!userData){
            window.location.href = "#login"
        }
    },[])

    return(
        <>
            <AppNavbar/>
            {children}
        </>
    )
}

export default PrivatePage;