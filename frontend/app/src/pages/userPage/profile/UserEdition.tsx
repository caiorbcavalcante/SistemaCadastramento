import { Button } from "../../../components/button/Button"
import { useNavigate } from "react-router-dom";


export const UserEdition = () => {
        const navigate = useNavigate();

    return(
        <div>         
        <Button text="Editar Perfil" onClick={() => navigate("/userProfile")} />
        </div>
    )
}