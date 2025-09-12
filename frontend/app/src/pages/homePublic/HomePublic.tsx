import { Link } from "react-router-dom"
import { Button } from "../../components/button/Button"
import './HomePublic.css'



export const HomePublic:React.FC = () => {
        return(
            <div>
                <h1 className='title'>
                    Estilo e <span className='highlight'>Elegância</span>
                     <br />
                    em Cada Corte
                </h1>


             <p className="subtitle">
                Transformamos seu visual com técnicas modernas e tradicionais. 
                   <br />
                Uma experiência única para o homem moderno que valoriza qualidade e estilo.
            </p>
                <div className="auth-buttons"> 
                   <Link to='/login'>
                   <Button text="Fazer login"/>
                   </Link>

                   <Link to='/register'>
                   <Button text="Criar conta"/>
                   </Link>
                </div>

                <div className="stats-section">
                    <div className="stat-item">
                    <div className="stat-number">5000+</div>
                    <div className="stat-label">Clientes Satisfeitos</div>
             </div>
          <div className="stat-item">
            <div className="stat-number">5+</div>
            <div className="stat-label">Anos de Experiência</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">15+</div>
            <div className="stat-label">Serviços Oferecidos</div>
          </div>
        </div>

            </div>
        )
}