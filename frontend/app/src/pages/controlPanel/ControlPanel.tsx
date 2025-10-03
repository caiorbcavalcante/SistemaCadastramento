import React, { useEffect, useState } from 'react'
import "./ControlPanel.css"
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Route } from 'react-router-dom'
import BarberEditProfile from '../barberEditProfile/BarberEditProfile'
import axios, { isAxiosError } from 'axios'

interface Appointment{
  id_appointment: number,
  userId: number,
  userName: string,
  date: Date | string,
  description: string,
  price: number
}
// PARA TESTE
const mockAppointments = [
  {
    id_appointment: 1,
    userId: 1,
    userName: "Carlinhos",
    date: "2025-10-03T17:00:00",
    description: "Haircut",
    price: 24
  },
  {
    id_appointment: 2,
    userId: 2,
    userName: "CAIODEV",
    date: "2025-10-03T19:00:00",
    description: "Nevar o hair",
    price: 87
  }
];

// PARA TESTE 


const ControlPanel = () => {
  const [showPopout, setShowPopout] = useState(false)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [day, setDay] = useState(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>()
  const [showPopoutManageAppointment, setShowPopoutManageAppointment] = useState(false);
  const navigate = useNavigate();

  // const weekdays = ["Domingo", "Segunda-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"]
  const { user, loading, logout } = useAuth();

  const changeDay = (value: number) =>{
    const newDate = new Date(day)
    newDate.setDate(day.getDate() + value)
    setDay(newDate);
  } 

  const filteredAppointments = appointments.filter(item => {
    const itemDate = new Date(item.date)
    return itemDate.toLocaleDateString("pt-BR") === day.toLocaleDateString("pt-BR")
  })

  const handleLogout = () => {
    logout();
    navigate('/login')
  }

  const handleRemoveAppointment = async (app) =>{
    try {
      await axios.delete(`http://localhost:3000/appointments/${app.id_appointment}`)

      setAppointments(prevApps => prevApps.filter(a => a.id_appointment!== app.id_appointment))
      setShowPopoutManageAppointment(false);
      setSelectedAppointment(null);

    } catch (error) {
      if (axios.isAxiosError(error)){
        alert(error.response?.data?.message || "Erro ao remover agendamento")
      }
    }    
  }

  useEffect(() =>{
    const fetchBarberData = async () =>{
      if (user && user.role === 'barber') {
        const barberId = user.id;

        try {
          const appointmentResponse = await axios.get(`http://localhost:3000/appointments/barber/${barberId}`)
          setAppointments(appointmentResponse.data)

        } catch (error) {
          if (axios.isAxiosError(error)){
            if (error.request){
              alert("Não foi possível se conectar com o servidor")
            } else if (error){
              alert("Não foi possível se conectar com o servidor")
            } else{
              alert("Ocorreu um erro inesperado")
            }
          }
        }
      }
    }
    if (!loading && user){
      fetchBarberData();
    }
    }, [user, loading])

  useEffect(() => {
    if (!loading){
      if(!user || user.role !== 'barber'){navigate('/')} // MUDAR AQUI A ROTA DEPOIS PAR O MENU
    }
  }, [user, loading, navigate])

  if ( loading ) {
    return <div> <h2> Carregando Painel de Controle</h2></div>
  }
  
  if ( !user || user.role !== 'barber'){
    return null;
  }

  useEffect(() => {
  setAppointments(mockAppointments);
  }, [])

  return (

    <div className='control-panel-container'>
      <header className='control-panel-header'>
        <h2>Painel de Controle</h2>

        <div className='popout-container'>
          <button className='popout-button' onClick={
            () => setShowPopout(!showPopout)
          }> Mais opções
           </button>
          {showPopout && <div className='popout-content'>
            <ul>
              <li>
                <button onClick={() => {navigate('/barberEditProfile')}}>
                  Editar Perfil
                </button>
              </li>
              {user?.adminplus &&
              <li>
                <button onClick={() => {navigate('/controlPanel/admin')}}>
                  Gerenciar barbeiros
                </button>
              </li>
              }
              <li>
                <button onClick={handleLogout}>
                  Sair
                </button>
              </li>
            </ul>
          </div>}
        </div>
      </header>
      
      {showPopoutManageAppointment && selectedAppointment && (
        <div className='control-panel-manage-appointments-popout'>
          <span>
            <h2> Tem certeza que deseja remover este agendamento? </h2>
            <button onClick={() => {handleRemoveAppointment(selectedAppointment); }}>Sim</button>
            <button onClick={() => {setSelectedAppointment(null); setShowPopoutManageAppointment(false)}}>Cancelar</button>
          </span>
        </div>
      )}
      
      <div className='control-panel-appointments'>
          <h2>
            Bem-vindo, {user.name}!
          </h2>
          <button onClick={() => changeDay(-1)}>{`<`}</button>
            {day.toLocaleDateString("pt-BR")}
          <button onClick={() => changeDay(1)}>{`>`}</button>
    
          {filteredAppointments.length > 0 ? (
            <ul>
              {filteredAppointments.map(item => {
                const itemDate = new Date(item.date);
                const horaFormatada = itemDate.toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                });
                return (
                  <li key={item.id_appointment}>
                    <span>{horaFormatada}</span>
                    <span>{item.description}</span>
                    <span>{item.userName}</span>
                    <span>
                      <button onClick={() => {setShowPopoutManageAppointment(true); setSelectedAppointment(item);}}> remv</button>
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <h4>Nenhum agendamento disponível para este dia.</h4>
          )}
      </div>

    </div>
  )
}

export default ControlPanel