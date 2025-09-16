import './RegisterAccount.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"


const RegisterAccount: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (!email.includes("@")){
        alert("Insira um email válido!")
        return
      }

      if (password.length < 6){
        alert("Senha deve conter pelo menos 6 caracteres")
      }

      const response = await axios.post("http://localhost:3000/user", {
        name,
        email,
        password
      })

      navigate('/')
    } catch (error) {
      if(axios.isAxiosError(error)) {
        if(error.response){
          alert(error.response.data.message)
        }
        else if(error.request) {
        alert("Não foi possível se conectar com o servidor")
      }
      else {
        alert("Ocorreu um erro inesperado")
      }
      }
    }
  }

  return (
    
    <div>
      <h2> Criar Conta </h2>
      <form onSubmit={handleSubmit}>

        <input placeholder='Nome' onChange={(e) => setName(e.target.value)} />
        <input placeholder='exemplo@email.com' onChange={(e) => setEmail(e.target.value)}/>
        <input placeholder='Senha' onChange={(e) => setPassword(e.target.value)}/>

        <button type='submit'>Criar conta</button>

      </form>
    </div>
  )
}

export default RegisterAccount