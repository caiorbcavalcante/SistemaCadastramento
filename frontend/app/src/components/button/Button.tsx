
import './styles.css'

interface props {
    text:string,
    onClick:() =>void
}

export const Button:React.FC <props> = ({text,onClick}) =>{
    return(
        <button className="custom-button" onClick={onClick}>
            {text}
        </button>
    )
}