
import { UserProfile } from "./profile/UserProfile"
import { UserAppointments } from "./appointements/UserAppointments"
import { Barbers } from "./barbers/Barbers"
import { Services } from "./services/services"
import { AvailableTime } from "./availableTime/AvailableTime"
import { NewAppointment } from "./newAppointment/NewAppointment"
import { DeleteUser } from "./delete/DeleteUser"



export const UserPage:React.FC = () => {
    return(
        <div style={{ padding: "2rem" }}>
            <UserProfile/>
            <Barbers/>
            <Services/>
            <AvailableTime/>
            <NewAppointment/>
            <UserAppointments/>
            <DeleteUser/>

        </div>
    )
}