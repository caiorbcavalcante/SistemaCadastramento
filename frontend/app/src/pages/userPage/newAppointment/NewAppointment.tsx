import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface IBarber {
  id_barber: string;
  name: string;
}

interface IService {
  id_service: string;
  description: string;
  price: number;
}

interface IAppointment {
  user: string;
  barber: string;
  service: string;
  price: number;
  date: string;
}

export const NewAppointment: React.FC = () => {
  const [barber, setBarber] = useState("")
  const [service, setService] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [barbers, setBarbers] = useState<IBarber[]>([]);
  const [services, setServices] = useState<IService[]>([]);
  const [bookedAppointments, setBookedAppointments] = useState<IAppointment[]>([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // 🔹 Gera horários das 9h às 17:30 com intervalo de 30min
  const generateTimeSlots = (): string[] => {
    const times = [
      '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
      '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
    ];
    return times;
  };

  // 🔹 Verifica se um horário está marcado
  const isTimeBooked = (date: string, time: string): boolean => {
    const fullDateTime = `${date}, ${time}`;
    return bookedAppointments.some(appt => 
      appt.date === fullDateTime && appt.barber === barber
    );
  };

  useEffect(() => {
    if (!token) {
      setError("Token não encontrado");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const [barbersRes, servicesRes, appointmentsRes] = await Promise.all([
          axios.get("http://localhost:3000/barbers", {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get("http://localhost:3000/service", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:3000/appointments", {
            headers: { Authorization: `Bearer ${token}` },
          })
        ]);

        // 🔹 Processa barbeiros
        if (barbersRes.data && Array.isArray(barbersRes.data.barbers)) {
          setBarbers(barbersRes.data.barbers);
        } else if (Array.isArray(barbersRes.data)) {
          setBarbers(barbersRes.data);
        }

        // 🔹 Processa serviços
        if (servicesRes.data && Array.isArray(servicesRes.data.services)) {
          setServices(servicesRes.data.services);
        } else if (Array.isArray(servicesRes.data)) {
          setServices(servicesRes.data);
        }

        // 🔹 Processa agendamentos
        if (appointmentsRes.data && Array.isArray(appointmentsRes.data.appointments)) {
          setBookedAppointments(appointmentsRes.data.appointments);
        }

        setError(null);

      } catch {
        setError("Erro ao carregar dados.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleCreate = async () => {
    setError(null)
    setSuccess(null)

    if (!barber || !service || !selectedDate || !selectedTime) {
      setError("Preencha todos os campos.");
      return
    }

    try {
      if (!token) throw new Error("Usuário não autenticado.");

      const decodedToken: any = jwtDecode(token);
      const userId = decodedToken.id_user;

      const fullDate = `${selectedDate} ${selectedTime}`;

      // 🔹 Verifica se o horário ainda está disponível
      if (isTimeBooked(selectedDate, selectedTime)) {
        setError("Este horário já foi reservado. Escolha outro.");
        return;
      }

     const response = await axios.post("http://localhost:3000/appointments",
        {
          user: userId,
          barber: barber,
          service: service,
          date: fullDate
        }, {
        headers: { Authorization: `Bearer ${token}` },
      }
      )
      
    console.log("🔹 Agendamento criado com sucesso:", response.data);
      setSuccess("Agendamento realizado com sucesso!")
      setBarber("")
      setService("")
      setSelectedDate("")
      setSelectedTime("")

    } catch (err:any){
       console.error("🔹 Erro completo:", err);
    console.error("🔹 Resposta do erro:", err.response?.data);
    
    // 🔹 Mensagem mais específica
    if (err.response?.data?.message) {
      setError(`Erro do servidor: ${err.response.data.message}`);
    } else if (err.response?.status === 500) {
      setError("Erro interno do servidor. Verifique se os IDs são válidos.");
    } else {
      setError("Erro ao criar agendamento. Tente novamente.");
    }
      
    }
  }

  const handleClear = () => {
    setBarber("")
    setService("")
    setSelectedDate("")
    setSelectedTime("")
    setError(null)
    setSuccess(null)
  }

  // 🔹 Gera datas dos próximos 7 dias
  const getNextDays = (): string[] => {
    const days: string[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push(date.toLocaleDateString("pt-BR"));
    }
    return days;
  };

  const timeSlots = generateTimeSlots();
  const availableDays = getNextDays();

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <h2>Agendar Serviço</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <div style={{ marginBottom: "1rem" }}>
        <label>Barbeiro:</label>
        <select onChange={(e) => setBarber(e.target.value)} value={barber}>
          <option value="">Selecione o Barbeiro</option>
          {barbers.map((b) => (
            <option key={b.id_barber} value={b.id_barber}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Serviço:</label>
        <select onChange={(e) => setService(e.target.value)} value={service}>
          <option value="">Selecione o Serviço</option>
          {services.map((s) => (
            <option key={s.id_service} value={s.id_service}>
              {s.description} - R$ {s.price.toFixed(2)}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Data:</label>
        <select 
          onChange={(e) => {
            setSelectedDate(e.target.value);
            setSelectedTime(""); // Reseta o horário quando muda a data
          }} 
          value={selectedDate}
        >
          <option value="">Selecione a Data</option>
          {availableDays.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      </div>

      {selectedDate && (
        <div style={{ marginBottom: "1rem" }}>
          <label>Horário (09:00 - 17:30):</label>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(6, 1fr)", 
            gap: "0.5rem",
            marginTop: "0.5rem"
          }}>
            {timeSlots.map((time) => {
              const isBooked = isTimeBooked(selectedDate, time);
              const isSelected = selectedTime === time;
              
              return (
                <button
                  key={time}
                  type="button"
                  onClick={() => !isBooked && setSelectedTime(time)}
                  style={{
                    padding: "0.5rem",
                    border: isSelected ? "2px solid #1976d2" : "1px solid #ccc",
                    backgroundColor: isBooked ? "#ffebee" : isSelected ? "#e3f2fd" : "#f5f5f5",
                    color: isBooked ? "#d32f2f" : "#000",
                    borderRadius: "4px",
                    cursor: isBooked ? "not-allowed" : "pointer",
                    opacity: isBooked ? 0.6 : 1,
                    fontSize: "0.9rem"
                  }}
                  disabled={isBooked}
                  title={isBooked ? "Horário já reservado" : `Selecionar ${time}`}
                >
                  {time}
                  {isBooked && " ❌"}
                </button>
              );
            })}
          </div>
          {selectedTime && (
            <p style={{ marginTop: "0.5rem", color: "#2e7d32" }}>
              ✅ Horário selecionado: <strong>{selectedTime}</strong>
            </p>
          )}
        </div>
      )}

      <div style={{ marginTop: "1rem" }}>
        <button 
          onClick={handleCreate} 
          style={{ marginRight: "1rem" }}
          disabled={!barber || !service || !selectedDate || !selectedTime}
        >
          Agendar
        </button>

        <button onClick={handleClear}>Cancelar</button>
      </div>
    </div>
  );
};



