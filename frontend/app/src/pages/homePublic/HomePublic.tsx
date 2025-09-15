import { Link } from "react-router-dom"
import { Button } from "../../components/button/Button"
import { Input } from "../../components/input/Input"

export const HomePublic:React.FC = () => {
        return(
            <div>
                <h1>Seja bem-vindo à Barbearia!</h1>

                <div> 
                   <Link to='/login'>
                   <Button text="Fazer login"/>
                   </Link>

                   <Link to='/register'>
                   <Button text="Criar conta"/>
                   </Link>
                </div>

                <div>
                <h3>Receba as Novidades da nossa empresa</h3>
                <Input 
                placeholder="Digite seu email"
                value=""
                onChange={()=>{}}
                />

                </div>


            </div>
        )
}