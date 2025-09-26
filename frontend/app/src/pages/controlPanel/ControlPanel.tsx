import React, { useEffect, useState } from 'react'
import "./ControlPanel.css"
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Route } from 'react-router-dom'
import BarberEditProfile from '../barberEditProfile/BarberEditProfile'
import axios, { isAxiosError } from 'axios'

interface Appointment{
  id_appointment: number,
  date: string,
  service: {description: string},
  user: {name: string}
}
interface Service {
  id_service: number,
  description: string,
  price: number
}
// PARA TESTE
const mockAppointments = [
  {
    id_appointment: 1,
    date: "2025-09-26T17:00:00",
    service: { description: "Corte" },
    user: { name: "Carlinhos" }
  },
  {
    id_appointment: 2,
    date: "2025-09-27T19:00:00",
    service: { description: "Barba e Bigode" },
    user: { name: "Byloka" }
  }
];

// PARA TESTE 


const ControlPanel = () => {
  const [showPopout, setShowPopout] = useState(false)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [day, setDay] = useState(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment>()
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
      const removeAppointmentResponse = await axios.delete(`http://localhost:3000/appointments/${app.id_appointment}`)

      setAppointments(prevApps => prevApps.filter(a => a.id_appointment!== app.id_appointment))
      setShowPopoutManageAppointment(false);
      setSelectedAppointment(null);

    } catch (error) {
      if (axios.isAxiosError(error)){
        alert(error.response?.data?.message || "Erro ao remover agendamento")
      }
    }    
  }

  // useEffect(() =>{
  //   const fetchBarberData = async () =>{
  //     if (user && user.role === 'barber') {
  //       const token = localStorage.getItem('authToken');
  //       const barberId = user.id;

  //       try {
  //         const appointmentResponse = await axios.get(`http://localhost:3000/appointments/barber/${barberId}`, {
  //           headers: { Authorization: `Bearer ${token}`}
  //         })
  //         setAppointment(appointmentResponse.data)

  //       } catch (error) {
  //         if (axios.isAxiosError(error)){
  //           if (error.response){
  //             alert(error.response.data.message)
  //           } else if (error.request){
  //             alert("Não foi possível se conectar com o servidor")
  //           } else{
  //             alert("Ocorreu um erro inesperado")
  //           }
  //         }
  //       }
  //     }
  //   }
  //   if (!loading && user){
  //     fetchBarberData();
  //   }
  //   }, [user, loading])

  // useEffect(() => {
  //   if (!loading){
  //     if(!user || user.role !== 'barber'){navigate('/')} // MUDAR AQUI A ROTA DEPOIS PAR O MENU
  //   }
  // }, [user, loading, navigate])

  // if ( loading ) {
  //   return <div> <h2> Carregando Painel de Controle</h2></div>
  // }
  
  // if ( !user || user.role !== 'barber'){
  //   return null;
  // }

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
              <li>
                <button onClick={handleLogout}>
                  Sair
                </button>
              </li>
              {user?.adminplus &&
              <li>
                <button onClick={() => {navigate('/controlPanel/admin')}}>
                  Gerenciar barbeiros
                </button>
              </li>
              }
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
            {/* Olá, {user.name}: */}
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
                    <span>{item.service.description}</span>
                    <span>{item.user.name}</span>
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