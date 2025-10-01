import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import "./BarberAdminPage.css"
import axios from 'axios'

interface barber{
    id_barber: number,
    name: string,
    email: string,
    number: string,
    role: string,
    adminplus: boolean
}
const BarberAdminPage = () => {
    const {user, loading, logout} = useAuth();
    const navigate = useNavigate();
    const [barberList, setBarberList] = useState<barber[]>([])
    const [showPopout, setShowPopout] = useState(false);
    const [selectedBarber, setSelectedBarber] = useState<barber | null>(null);
    const token = localStorage.getItem('authToken')

    const giveAuth = async (barber) => {
        try {
            await axios.patch(`http://localhost:3000/barbers/${barber.id_barber}`, {
            name: barber.name,
            email: barber.email,
            adminplus: true 
        }, {headers: {Authorization: `Bearer ${token}`}})

        setBarberList(prevList => prevList.map(b => b.id_barber === barber.id_barber ? {... b, adminplus: true} : b))

        alert("Permissão de admin concedida com suceesso!")

        } catch (error) {
            if(axios.isAxiosError(error) ) {
                alert(error.response?.data?.message || "Erro ao conceder autorizAÇÃO")
            }
        }
        
    }

    const removeAuth = async (barber) => {
        try {
            await axios.patch(`http://localhost:3000/barbers/${barber.id_barber}`, {
                name: barber.name,
                email: barber.email,
                adminplus: false
            }, {headers: {Authorization: `Bearer ${token}`}})

            setBarberList(prevList => prevList.map(b => b.id_barber === barber.id_barber ? {...b, adminplus: false}: b))
            alert(`Remoção do barbeiro ${barber.name} realizada com sucesso`);

        } catch(error){
            if (axios.isAxiosError(error)) {
                alert((error.response?.data?.message || "Erro ao remover autorização"))
            }
        }
    }

    const addBarber = async (newBarberData: {name: string, email: string, password: string, number: string}) => {
        try {
            const response = await axios.post("http://localhost:3000/barbers", newBarberData, {
                headers: {Authorization: `Bearer ${token}`}
            });

            // adiciona o novo barbeiro a lista
            setBarberList(prevList => [...prevList, response.data]);
            alert(`Barbeiro ${response.data.name} adicionado com sucesso`);

        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert(error.response?.data?.message || "Erro ao adicionar barbeiro");
            }
        }
    }

    const deleteBarber = async (id: number) => {
        try {
            await axios.delete(`http://localhost:3000/barbers/${id}`,{
                headers: {Authorization: `Bearer ${token}`}
            });

            // Remove do estado local
            setBarberList(prevList => prevList.filter(b => b.id_barber !== id)); // coloca apenas os barbeiros com id diferente do id escolihdo para a remoção
            alert("Barbeiro removido com sucesso!")

        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert(error.response?.data?.message || "Erro ao remover barbeiro");
            }
        }
    }

    const handleBackClick = () => {
        navigate('/controlPanel')
    }

    useEffect(() =>{
        const fetchBarberList = async () => {
            if (user && user.role === 'barber' && user.adminplus) {
                const barberId = user.id

                try {
                    const response = await axios.get('http://localhost:3000/barbers')
                    setBarberList(response.data.barbers);
                } catch (error) {
                    if(axios.isAxiosError(error)){
                        if(error.response){
                            alert(error.response.data.message)
                        } else if(error.request){
                            alert("Não foi possível se conectar com o servidor")
                        } else {
                            alert("Ocorreu um erro inesperado")
                        }}}
                    } else if(!loading && (!user || user.role !== 'barber' || !user.adminplus)){
                        navigate('/controlPanel')
                    }
                    }
        fetchBarberList();
    }, [user, loading, navigate, token])

    useEffect(() =>{
        if (!loading){
            if (!user && user.role !== 'barber' && !user.adminplus){
                navigate('/controlPanel')
            }
        }
    }, [user, loading, navigate])
  return (
    <div className='barber-admin-page-container'>
        <header className='barber-admin-page-header'>
            <button onClick={handleBackClick}>
                <h4>
                    Voltar
                </h4>
            </button>
        </header>
        
        {showPopout && selectedBarber && (
            <div className='give-admin-authorization-popout'>
                <span>
                    <h2> Tem certeza que deseja dar autorização de admin para {selectedBarber.name}?</h2>
                    <span onClick={() => {giveAuth(selectedBarber); setShowPopout(false)}}>Sim</span>
                    <span onClick={() => {setShowPopout(false)}}>Cancelar</span>
                </span>
            </div>
        )}

        <div className='give-admin-authorization-content'>
            <h2>
                Adicionar cargo de administrador a barbeiro
            </h2>

            {barberList.length > 0 ? (
                <ul>
                    {barberList.map (b => (
                        <li key={b.id_barber}>
                            <h2>{b.name}</h2>
                            <button onClick={() => {setShowPopout(true); setSelectedBarber(b)}} disabled={b.adminplus}>
                                {b.adminplus ? (`Admin`) : (`Adicionar admin`) }
                            </button>
                        </li>
                    ))}
                </ul>
            ):(
                <h2>
                    Nenhum barbeiro registrado.
                </h2>
            )}

        </div>
    </div>
  )
}

export default BarberAdminPage