import './Form.css' // Pode criar um CSS genérico para os formulários
import { useState } from 'react'
import axios from "axios"

const ServiceForm: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [description, setDescription] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        try {
            // Validação básica
            if (!name || price <= 0){
                alert("Por favor, preencha o nome e um preço válido!")
                return
            }
            // Envia os dados para o seu backend (API)
            const response = await axios.post("http://localhost:3000/services", {
                name,
                price,
                description
            })
    
            alert("Serviço cadastrado com sucesso!")
            // Limpar os campos após o sucesso
            setName("")
            setPrice(0)
            setDescription("")
        } catch (error: any) {
            if (error.response) {
                alert(`Erro do servidor: ${error.response.data.message}`)
            } else if (error.request) {
                alert("Não foi possível se conectar com o servidor. Tente novamente.")
            } else {
                alert("Ocorreu um erro inesperado ao criar o serviço.")
            }
        }
    }
  

return (
    <div className="form-container">
      <h2> Cadastrar Novo Serviço </h2>
      <form onSubmit={handleSubmit}>

        <input
          placeholder='Nome do Serviço (ex: Corte de Cabelo)'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder='Preço (ex: 30.00)'
          value={price === 0 ? '' : price}
          onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
        />
        
        <textarea
          placeholder='Descrição do serviço (opcional)'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type='submit'>Cadastrar Serviço</button>

      </form>
    </div>
  )
}


export default ServiceForm