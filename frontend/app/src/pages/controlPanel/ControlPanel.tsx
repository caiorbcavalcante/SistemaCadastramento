import React, { useEffect, useState } from 'react'
import "./ControlPanel.css"
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
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
    date: "19:00",
    service: { description: "Corte" },
    user: { name: "Carlinhos" }
  },
  {
    id_appointment: 2,
    date: "20:00",
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
  const navigate = useNavigate();

  // const weekdays = ["Domingo", "Segunda-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"]
  const { user, loading, logout } = useAuth();

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
  //     if(!user || user.role !== 'barber'){navigate('/login')}
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
          }> Mais opções </button>
          {showPopout && <div className='popout-content'>
            <ul>
              <li>
                <button>
                  Editar Perfil
                </button>
              </li>
              <li>
                <button onClick={handleLogout}>
                  Sair
                </button>
              </li>
            </ul>
          </div>}
        </div>
      </header>
      
      <div className='control-panel-appointments'>
          <h2>
            Agendamentos de hoje:
          </h2>
          {
            appointments.length > 0 ? (
              <ul>
            {appointments && appointments.map(item => (
              <li key={item.id_appointment}>
                  <span>{item.date}</span>
                  <span>{item.service.description}</span>
                  <span>{item.user.name}</span>
              </li>
            ))}
          </ul> 
            ):(
              <h4> Nenhum agendamento disponível no dia de hoje</h4>
            )
          }
      </div>
    </div>
  )
}

export default ControlPanel