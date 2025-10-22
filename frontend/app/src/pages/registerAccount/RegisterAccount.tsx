import './RegisterAccount.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { validarEmail, validarSenhaDetalhada, validarTelefone } from '../../utils/utils'
import axios from "axios"


const RegisterAccount: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [number, setNumber] = useState<string> ("")
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const resultadoEmail = validarEmail(email)
      if (resultadoEmail){
        alert(`Erro: ${resultadoEmail}`)
        return
      }

      const resultadoSenha = validarSenhaDetalhada(password)
      if (!resultadoSenha.valido){
        alert(`Erro: ${resultadoSenha.erro}`)
        return
      }

      const resultadoTelefone = validarTelefone(number)
      if (!resultadoTelefone.valido){
        alert(`Erro: ${resultadoTelefone.erro}\nDetalhes: ${resultadoTelefone.detalhes?.join(', ')}`)
        return
      }
      
      await axios.post(`${import.meta.env.VITE_API_URL}/user`, {
        name,
        email,
        password,
        number
      })

      navigate('/')
      alert("conta criada com sucesso")
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
    
    <div className='register-page'>
      <div className='register-content'>
      <h2 className='register-title'> Criar Conta </h2>
      <p className='register-subtitle'>Preencha os campos abaixo</p>


      <form className='register-form' onSubmit={handleSubmit}>

        <input placeholder='Nome' onChange={(e) => setName(e.target.value)} />
        <input placeholder='exemplo@email.com' onChange={(e) => setEmail(e.target.value)}/>
        <input placeholder='Senha' onChange={(e) => setPassword(e.target.value)}/>
        <input placeholder='Número' onChange={(e) => setNumber(e.target.value)}/>


        <button type='submit'>Criar conta</button>
      </form>
      </div>
    </div>
  )
}
export default RegisterAccount