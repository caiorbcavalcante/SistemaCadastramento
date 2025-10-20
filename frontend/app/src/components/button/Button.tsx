
import './styles.css'

interface ButtonProps {
    text?:string
    onClick?:() =>void
    type?: "button" | "submit" | "reset";
}

export const Button:React.FC <ButtonProps> = ({text,onClick,type="button"}) =>{
    return(
        <button className="custom-button" onClick={onClick}  type={type}>
            {text}
        </button>
    )
}