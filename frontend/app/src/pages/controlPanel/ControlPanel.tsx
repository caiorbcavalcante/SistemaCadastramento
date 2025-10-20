import { useEffect, useState } from 'react'
import "./ControlPanel.css"
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import axios from 'axios'
import { RiDeleteBinLine } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa";
interface Appointment{
  id_appointment: number,
  userId: number,
  userName: string,
  userNumber: string,
  date: Date | string,
  description: string,
  price: number
}

const ControlPanel = () => {
  const [showPopout, setShowPopout] = useState(false)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [day, setDay] = useState(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>()
  const [showPopoutManageAppointmentRemove, setShowPopoutManageAppointmentRemove] = useState<boolean>(false);
  const [showPopoutContactUser, setShowPopoutContactUser] = useState<boolean> (false);
  const [contactMessage, setContactMessage] = useState<string>("")
  const navigate = useNavigate();

  // const weekdays = ["Domingo", "Segunda-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"]
  const { user, loading, logout } = useAuth();

  const changeDay = (value: number) =>{
    const newDate = new Date(day)
    newDate.setDate(day.getDate() + value)
    setDay(newDate);
  } 

  const todayDate = () => {
    setDay(new Date)
  }

  const filteredAppointments = appointments.filter(item => {
    const itemDate = new Date(item.date)
    return itemDate.toLocaleDateString("pt-BR") === day.toLocaleDateString("pt-BR")
  })

  const handleLogout = () => {
    logout();
    navigate('/')
  }

  const handleRemoveAppointment = async (app: Appointment | null) => {
    try {
      await axios.delete(`http://localhost:3000/appointments/${app?.id_appointment}`)

      setAppointments(prevApps => prevApps.filter(a => a.id_appointment!== app?.id_appointment))
      setShowPopoutManageAppointmentRemove(false);
      setSelectedAppointment(null);

    } catch (error) {
      if (axios.isAxiosError(error)){
        alert(error.response?.data?.message || "Erro ao remover agendamento")
      }
    }    
  }

  const handleWhatsappMessage = (app: Appointment | null) => {


    const url = `https://wa.me/${app?.userNumber}?text=${encodeURIComponent(contactMessage)}`

    window.open(url, "_blank");

    setContactMessage("");
  }

  const formatedDate = (date: string | Date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("pt-BR", {day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit"})
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
            if (error){
              alert("Não foi possível se conectar com o servidor")
            } else {
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
      if(!user || user.role !== 'barber'){navigate('/')} 
    }
  }, [user, loading, navigate])

  if ( loading ) {
    return <div> <h2> Carregando Painel de Controle</h2></div>
  }
  
  if ( !user || user.role !== 'barber'){
    return null;
  }

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
                  Informações de conta
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

      {showPopoutManageAppointmentRemove && selectedAppointment && (
        <div className='control-panel-removeApp-popout'>
          <span>
            <h2>Tem certeza que deseja remover este agendamento?</h2>
            <button onClick={() => {handleRemoveAppointment(selectedAppointment)}}>Sim</button>
            <button onClick={() => {setShowPopoutManageAppointmentRemove(false)}}>Cancelar</button>
          </span>
        </div>
      )}

      {showPopoutContactUser && selectedAppointment && (
        <div className='control-panel-contactUser-popout'>
          <span>
            <input
             type="text"
              // value={`Olá ${selectedAppointment.userName}, estou entrando em contato sobre nosso agendamento as ${formatedDate(selectedAppointment.date)}`}
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}/>

            <button onClick={() => {handleWhatsappMessage(selectedAppointment); setShowPopoutContactUser(false)}}>Enviar</button>
            <button onClick={() => setShowPopoutContactUser(false)}>Cancelar</button>
          </span>
        </div>
      )}

      <div className='control-panel-appointments'>
          <h2>
            Bem-vindo, {user.name}!
          </h2>
          <button onClick={() => todayDate()}>Hoje</button>

          <div className='control-panel-appointments-header'>
            <button onClick={() => {changeDay(-1) }}>{`<`}</button>
            <span>{day.toLocaleDateString("pt-BR")}</span>
            <button onClick={() => changeDay(1)}>{`>`}</button>
          </div>
    
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
                      <button onClick={() => {setSelectedAppointment(item) ; setShowPopoutContactUser(true); if (showPopoutManageAppointmentRemove) {setShowPopoutManageAppointmentRemove(false)}; setContactMessage(`Olá ${item.userName}, estou entrando em contato sobre nosso agendamento as ${formatedDate(item.date)}`)}}> <FaWhatsapp /> </button>
                      <button onClick={() => { setSelectedAppointment(item) ;setShowPopoutManageAppointmentRemove(true); if (showPopoutContactUser) {setShowPopoutContactUser(false)}}}> <RiDeleteBinLine /> </button>
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