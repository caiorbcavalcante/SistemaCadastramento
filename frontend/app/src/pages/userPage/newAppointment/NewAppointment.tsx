import React, { useEffect, useState} from "react";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";
import "./NewAppointment.css"

interface InterfaceBarber {
  adminplus: boolean,
  id_barber: number,
  name: string,
  email: string,
  number: string,
  role: string
}

interface InterfaceServices {
  id_service: number,
  price: number,
  description: string
}

interface InterfaceAppointments{
  id_appointment: number,
  userId: number,
  userName: string,
  userNUmber: string,
  date: string,
  description: string,
  price: number
}

export const NewAppointment: React.FC = () => {

  const [barbers, setBarbers] = useState<InterfaceBarber[]>([]);
  const [barberName, setBarberName] = useState("");
  const [services, setServices] = useState<InterfaceServices[]> ([]);
  const [appointments, setAppointments] = useState<InterfaceAppointments[]>([]);
  const [selectedBarberId, setSelectedBarberId] = useState<number | undefined>();
  const [selectedServiceId, setSelectedServiceId] = useState<number | undefined > ()
  const [selectedDate, setSelectedDate] = useState<string | undefined> ()
  const [selectedTime, setSelectedTime] = useState<string | undefined> ()
  const [showCreateAppointmentPopOut, setShowCreateAppointmentPopOut] = useState<boolean>(false);

  const initialTimes = [
    {time: "09:00", available: true},
    {time: "09:30", available: true},
    {time: "10:00", available: true},
    {time: "10:30", available: true},
    {time: "11:00", available: true},
    {time: "11:30", available: true},
    {time: "12:00", available: true},
    {time: "12:30", available: true},
    {time: "13:00", available: true},
    {time: "13:30", available: true},
    {time: "14:00", available: true},
    {time: "14:30", available: true},
    {time: "15:00", available: true},
    {time: "15:30", available: true},
    {time: "16:00", available: true},
    {time: "16:30", available: true},
    {time: "17:00", available: true},
    {time: "17:30", available: true},
  ]

  const [availableTimes, setAvailableTimes] = useState(initialTimes)

  const {user} = useAuth();

  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchBarbers = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/barbers`)
      setBarbers(res.data.barbers);
      // FAZER TRATAMENTO DE ERROS AQUI DEPOIS
    }

    fetchBarbers();

  }, [])

  const getAppointments = async (barber_id:number) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/appointments/barber/${barber_id}`)
    setAppointments(res.data);
  }

  useEffect(() => {
    if (selectedBarberId && selectedServiceId && selectedDate){
      getAppointments(Number(selectedBarberId));
    }
  }, [selectedBarberId, selectedDate, selectedServiceId])


  useEffect(() => {

    if (!selectedBarberId) return;

    const getBarberById = async (barber_id: number) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/barbers/${barber_id}`, {headers: {Authorization: `Bearer ${token}`}})
    setBarberName(res.data.name);
  }

  getBarberById(selectedBarberId);
  }, [selectedBarberId, token])

  useEffect(() => {
    const fetchServices = async () => {
      const res = await axios.get("http://localhost:3000/service");
      setServices(res.data.services)
    }

    fetchServices();
  }, [])

 useEffect(() => {
    if (!selectedDate || appointments.length === 0) {
        setAvailableTimes(initialTimes); 
        return;
    }

    const selectedDateString = selectedDate; 
    const bookedTimes = new Set<string>();

    appointments.forEach(appointment => {
        const appointmentDate = new Date(appointment.date);
   
        const apptYear = appointmentDate.getFullYear();
        const apptMonth = (appointmentDate.getMonth() + 1).toString().padStart(2, '0');
        const apptDay = appointmentDate.getDate().toString().padStart(2, '0');
        const apptDateString = `${apptYear}-${apptMonth}-${apptDay}`; 
        if (apptDateString === selectedDateString) {
            
            const hour = appointmentDate.getHours().toString().padStart(2, '0');
            const minute = appointmentDate.getMinutes().toString().padStart(2, '0');
            
            const formattedTime = `${hour}:${minute}`; 
            
            bookedTimes.add(formattedTime);
        }
    });

    const updatedAvailableTimes = initialTimes.map(slot => ({
        ...slot,
        available: !bookedTimes.has(slot.time)
    }));
    
    setAvailableTimes(updatedAvailableTimes);
    
    if(selectedTime && bookedTimes.has(selectedTime)) {
        setSelectedTime('');
    }

}, [appointments, selectedDate, selectedBarberId]);

  const formatDateBR = (dateString: string): string => {
    if (!dateString) return '';

    const [year, month, day] = dateString.split('-');

    return `${day}/${month}/${year}`; 
  };

  const handleCreateAppointment = async () => {

    await axios.post(`${import.meta.env.VITE_API_URL}/appointments`, {
      user: user?.id,
      barber: selectedBarberId,
      service: selectedServiceId,
      date: `${formatDateBR(selectedDate!)} ${selectedTime}`
    })
    setSelectedBarberId(undefined);
    setSelectedServiceId(undefined);
    setSelectedDate(undefined);
    setSelectedTime(undefined);

    alert("Agendamento confirmado com sucesso!");
  }

  return (
    <div className="new-appointment-section">

      <h2>
        Agendar serviço
      </h2>

      <label>
        Barbeiro: 
         <select value={selectedBarberId ?? ""} onChange={(e) => {setSelectedBarberId(Number(e.target.value))}}>
          
          <option value={""} disabled hidden>Barbeiro</option>

        {barbers.map((b) => (
            <option key={b.id_barber} value={b.id_barber}>
              {b.name}
            </option>
        ))}

        </select>
      </label>

      <label>
        Serviço: 

        <select value={selectedServiceId ?? ""} onChange={(e) => {setSelectedServiceId(Number(e.target.value))}}>

          <option value={""} disabled hidden>Serviço</option>

          {services.map((s) => (
            <option key={s.id_service} value={s.id_service}>
              {s.description}  (R$ {s.price})
            </option>
          ))}

        </select>

      </label>

      <label>
        Data: 
        <input type="Date" value={selectedDate ?? ""} onChange={(e) => {setSelectedDate(e.target.value)}} min={new Date().toLocaleDateString("fr-CA")}/>
      </label>

      {selectedBarberId && selectedServiceId && selectedDate && (
        <>
        <h2>
          Horarios disponíveis
        </h2>

         <div className="available-times">
        {availableTimes.map(a => (
          <button
            key={a.time}
            onClick={() => setSelectedTime(a.time)}
            className={a.time === selectedTime ? 'selected' : ''}
            disabled={!a.available}
          >
            {a.time}
          </button>
        ))}
      </div>

      <button onClick={() => setShowCreateAppointmentPopOut(true)} disabled={!selectedTime}>
        Agendar serviço
      </button>
      <button onClick={() => {setSelectedBarberId(undefined); setSelectedDate(undefined); setSelectedServiceId(undefined); setSelectedTime(undefined); setShowCreateAppointmentPopOut(false)}}>
        Cancelar
      </button>
    </>
  )}

  {showCreateAppointmentPopOut && (
    <div className="confirm-popout">
      <h2>Confirmar agendamento em {formatDateBR(selectedDate!)} às {selectedTime} com {barberName}</h2>
      <button onClick={() => {handleCreateAppointment(); setShowCreateAppointmentPopOut(false)}}>Confirmar</button>
      <button onClick={() => {setSelectedBarberId(undefined); setSelectedDate(undefined); setSelectedServiceId(undefined); setSelectedTime(undefined); setShowCreateAppointmentPopOut(false)}}>Cancelar</button>
    </div>
  )}
      
    </div>
  );
};

