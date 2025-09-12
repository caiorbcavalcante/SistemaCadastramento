import { useState } from "react"



export const UserPage:React.FC = () => {
    const [user,setUser] = useState<any>(null)
    const [appointments, setAppointments] = useState([]);
    const [services, setServices] = useState([]);

    const token = localStorage.getItem("token")
    const id_user = localStorage.getItem("id_user")

    useEffect(() => {
        
    })

    return(
        
    )
}