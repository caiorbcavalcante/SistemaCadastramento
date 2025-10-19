import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import "./BarberAdminPage.css"
import axios from 'axios'
import { FiSettings } from "react-icons/fi";
import { FaAngleLeft } from "react-icons/fa";


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
    const [showPopout, setShowPopout] = useState<boolean>(false);
    const [showAddBarberPopout, setShowAddBarberPopout] = useState<boolean> (false);
    const [selectedBarber, setSelectedBarber] = useState<barber | null>(null);
    const [showRemovePopout, setShowRemovePopout] = useState<boolean> (false);
    const [newBarberName, setNewBarberName] = useState<string | undefined> ();
    const [newBarberEmail, setNewBarberEmail] = useState<string | undefined> ();
    const [newBarberNumber, setNewBarberNumber ] = useState<string | undefined> ();
    const [newBarberPassword, setNewBarberPassword] = useState<string|undefined>();
    const token = localStorage.getItem('token')

    const giveAuth = async (barber: barber) => {
        try {
            await axios.patch(`http://localhost:3000/barbers/${barber.id_barber}`, {
            name: barber.name,
            email: barber.email,
            adminplus: true 
        }, {headers: {Authorization: `Bearer ${token}`}})

        setBarberList(prevList => prevList.map(b => b.id_barber === barber.id_barber ? {... b, adminplus: true} : b))

        alert("Permissão de admin concedida com suceesso!")
        
        setSelectedBarber(null);

        } catch (error) {
            if(axios.isAxiosError(error) ) {
                alert(error.response?.data?.message || "Erro ao conceder autorizAÇÃO")
            }
        }
        
    }

    const handleLogout = () => {
        logout();
        navigate("/")
    }

    const removeAuth = async (barber: barber) => {
        try {
            await axios.patch(`http://localhost:3000/barbers/${barber.id_barber}`, {
                name: barber.name,
                email: barber.email,
                adminplus: false
            }, {headers: {Authorization: `Bearer ${token}`}})

            setBarberList(prevList => prevList.map(b => b.id_barber === barber.id_barber ? {...b, adminplus: false}: b))
            
            alert(`Remoção de cargo de admin do barbeiro ${barber.name} realizada com sucesso`);

            setSelectedBarber(null);

        } catch(error){
            if (axios.isAxiosError(error)) {
                alert((error.response?.data?.message || "Erro ao remover autorização"))
            }
        }
    }

    const clearNewBarberInfo = () => {
        setNewBarberEmail('');
        setNewBarberName('');
        setNewBarberPassword('');
        setNewBarberNumber('');
    }

    const addBarber = async (name: string, email: string, password: string, number: string) => {
        try {
            const response = await axios.post("http://localhost:3000/barbers", {
                name,
                email,
                password,
                number,
                adminplus: false
            }, {
                headers: {Authorization: `Bearer ${token}`}
            });

            // adiciona o novo barbeiro a lista
            setBarberList(prevList => [...prevList, response.data.barberWithoutPassword]);
            alert(`Barbeiro ${response.data.barberWithoutPassword.name} adicionado com sucesso`);
            clearNewBarberInfo();

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
            setSelectedBarber(null);

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
            if (!user || user.role !== 'barber' && !user.adminplus){
                navigate('/controlPanel')
            }
        }
    }, [user, loading, navigate])
  return (
    <div className='barber-admin-page-container'>
        <header className='barber-admin-page-header'>
            <button onClick={handleBackClick}>
                <h1>
                    <FaAngleLeft />
                </h1>
            </button>
        </header>
        
        {showPopout && selectedBarber && (
            <div className='manage-barbers-popout'>

                <h4>{selectedBarber.name}</h4>

                {selectedBarber.adminplus ? (
                    <button onClick={() => {removeAuth(selectedBarber);}}>
                        Remover cargo de admin
                    </button>
                ): (
                    <button onClick={() => {giveAuth(selectedBarber)}}>
                        Tornar admin
                    </button>
                )}

                <button onClick={() => setShowRemovePopout(true)}>
                    Remover barbeiro
                </button>

                <button onClick={() => {setShowPopout(false); setSelectedBarber(null)}}>
                    Cancelar
                </button>

                {showRemovePopout && (
                    <>
                    <h4>
                        Tem certeza que deseja remover o barbeiro {selectedBarber.name} ? (Não será possível desfazer esta ação)
                    </h4>
                    <button onClick={() => deleteBarber(selectedBarber.id_barber)}>
                        Confirmar
                    </button>
                    <button onClick={() => setShowRemovePopout(false)}>
                        Cancelar
                    </button>
                    </>
                )}


            </div>
        )}

        <div className='manage-barbers-content'>
            <h2>
                Gerenciar barbeiros
            </h2>

            {barberList.length > 0 ? (
                <ul>
                    {barberList.map (b => (
                        <li key={b.id_barber}>
                            <h2>{b.name}</h2>
                            <button onClick={() => {setShowPopout(true); setSelectedBarber(b)}} disabled={showPopout}>
                                <FiSettings />

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
        
        <hr />

        <div className='add-new-barber-content'>
            <h2>
                <button onClick={() => {setShowAddBarberPopout(true)}} hidden={showAddBarberPopout}>
                    Adicionar novo barbeiro
                </button>
            </h2>

            {showAddBarberPopout && (
                <>
                <label>
                    Nome: 
                    <input value={newBarberName} onChange={(e) => {setNewBarberName(e.target.value)}}/>
                    
                    Email:
                    <input value={newBarberEmail} onChange={(e) => {setNewBarberEmail(e.target.value)}}/>

                    Senha:
                    <input value={newBarberPassword} onChange={(e) => {setNewBarberPassword(e.target.value)}}/>

                    Número: 
                    <input value={newBarberNumber} onChange={(e) => {setNewBarberNumber(e.target.value)}}/>
                </label>

                <button onClick={() => {addBarber(newBarberName, newBarberEmail, newBarberPassword, newBarberNumber); setShowAddBarberPopout(false)}}>
                    Criar Conta
                </button>

                <button onClick={() => {clearNewBarberInfo(); setShowAddBarberPopout(false)}}>
                    Cancelar 
                </button>

                </>
            )}


        </div>
    </div>
  )
}

export default BarberAdminPage