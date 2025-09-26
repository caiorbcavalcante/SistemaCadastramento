import React, { useEffect, useState } from 'react'
import "./ControlPanel.css"
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Route } from 'react-router-dom'
import BarberEditProfile from '../barberEditProfile/BarberEditProfile'
// import axios from 'axios'

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
    date: "2025-09-20T17:00:00",
    service: { description: "Corte" },
    user: { name: "Carlinhos" }
  },
  {
    id_appointment: 2,
    date: "2025-09-19T19:00:00",
    service: { description: "Barba e Bigode" },
    user: { name: "Byloka" }
  }
];

const mockServices = [
  {
    id_service: 101,
    description: "Corte",
    price: 45.00
  },
  {
    id_service: 102,
    description: "Barba e Bigode",
    price: 30.00
  }
];
// PARA TESTE 


const ControlPanel = () => {
  const [showPopout, setShowPopout] = useState(false)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [day, setDay] = useState(new Date());
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

  //         const serviceResponse = await axios.get(`http://localhost:3000/service/id_barber/${barberId}`, {
  //           headers: { Authorization: `Bearer ${token}`}
  //         })
  //         setServices(serviceResponse.data)
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
  setServices(mockServices)
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
                  </li>
                );
              })}
            </ul>
          ) : (
            <h4>Nenhum agendamento disponível para este dia.</h4>
          )}
      </div>

      <div className='control-panel-manage-appointments'>
         Gerenciar agendamentos
          
      </div>
    </div>
  )
}

export default ControlPanel