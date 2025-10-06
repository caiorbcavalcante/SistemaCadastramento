import { UserAppointments } from "./appointements/UserAppointments"
import { Barbers } from "./barbers/Barbers"
import { Services } from "./services/services"
import { AvailableTime } from "./availableTime/AvailableTime"
import { NewAppointment } from "./newAppointment/NewAppointment"
import { DeleteUser } from "./delete/DeleteUser"
import { UserEdition } from "./profile/UserEdition"
import { Header } from "./header/Header"



export const UserPage:React.FC = () => {
    return(
        <div style={{ padding: "2rem" }}>
           <Header/>
            <Barbers/>
            <Services/>
            <AvailableTime/>
            <NewAppointment/>
            <UserAppointments/>
            <DeleteUser/>
            <UserEdition/>

        </div>
    )
}