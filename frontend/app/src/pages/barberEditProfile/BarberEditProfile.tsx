import React, { useState, useEffect } from 'react'
import './BarberEditProfile.css'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface patchInterface{
    name?: string,
    email?: string,
    password?: string,
}

const BarberEditProfile = () => {
    const [newName, setNewName] = useState<string>('');
    const [newEmail, setNewEmail] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');

    const {user, loading, logout} = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const patchData: patchInterface = {};

        if (newName){patchData.name = newName}
        if (newEmail){
            if (!newEmail.includes("@")){
                alert("Insira um email válido!")
                return}
            patchData.email = newEmail
        } 
        if (newPassword){
            if (newPassword.length < 6){
                alert("Senha deve conter pelo menos 6 caracteres")
                return}
            patchData.password = newPassword
        }
        
        try {
            const response = await axios.patch(`http://localhost:3000/barbers/${user.id}`, patchData)

            navigate('/controlPanel')
        }
         catch (error) {

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
        <form onSubmit={handleSubmit}>

        <input placeholder='Novo nome' onChange={(e) => setNewName(e.target.value)} value={newName} />
        <input placeholder='novoEmail@exemplo.com' onChange={(e) => setNewEmail(e.target.value)} value={newEmail}/>
        <input placeholder='NovaSenha' onChange={(e) => setNewPassword(e.target.value)} value={newPassword}/>

        <button type='submit'>Salvar alterações</button>

      </form>    
    </div>
  )
}

export default BarberEditProfile