import axios from "axios";
import { useEffect, useState } from "react";
import "./AvailableTime.css";

interface ISlot {
  id: number;
  date: string;
  barberName: string;
}

interface IAppointment {
  user: string;
  barber: string;
  service: string;
  price: number;
  date: string;
}

interface IBarber {
  id_barber: string;
  name: string;
}

export const AvailableTime: React.FC = () => {
  const [availableSlots, setAvailableSlots] = useState<ISlot[]>([]);
  const [barbers, setBarbers] = useState<IBarber[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // 🔹 Função para gerar horários do DIA ATUAL das 9h às 17:30 com intervalo de 30min
  const generateTodayTimeSlots = (): string[] => {
    const today = new Date();
    const todayFormatted = today.toLocaleDateString("pt-BR");
    
    // 🔹 LISTA EXPLÍCITA de todos os horários (garante 17:30)
    const times = [
      '09:00', '09:30', 
      '10:00', '10:30', 
      '11:00', '11:30',
      '12:00', '12:30', 
      '13:00', '13:30', 
      '14:00', '14:30',
      '15:00', '15:30', 
      '16:00', '16:30', 
      '17:00', '17:30'  // 🔹 17:30 INCLUÍDO
    ];
    
    // 🔹 Combina data com cada horário
    return times.map(time => `${todayFormatted}, ${time}`);
  };

  useEffect(() => {
    if (!token) {
      setError("Token não encontrado");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        // 🔹 Busca agendamentos E barbeiros em paralelo
        const [appointmentsRes, barbersRes] = await Promise.all([
          axios.get("http://localhost:3000/appointments", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:3000/barbers", {
            headers: { Authorization: `Bearer ${token}` },
          })
        ]);

        console.log("🔹 Agendamentos:", appointmentsRes.data);
        console.log("🔹 Barbeiros:", barbersRes.data);

        // 🔹 CORREÇÃO: Pega os arrays corretos
        const appointments = appointmentsRes.data?.appointments || [];
        const barbersData = barbersRes.data?.barbers || [];

        setBarbers(barbersData);
        console.log(barbers)

        // 🔹 Gera horários apenas do DIA ATUAL com intervalo de 30min
        const todayTimeSlots = generateTodayTimeSlots();
        const todayFormatted = new Date().toLocaleDateString("pt-BR");
        
         console.log(todayFormatted);
        console.log("🔹 Horários de hoje (30min interval):", todayTimeSlots);
        console.log("🔹 Quantidade de horários:", todayTimeSlots.length);
        console.log("🔹 Último horário:", todayTimeSlots[todayTimeSlots.length - 1]);
        
        // 🔹 Calcula horários disponíveis para CADA barbeiro apenas para HOJE
        const availableSlotsForAllBarbers: ISlot[] = [];

        barbersData.forEach((barber: IBarber) => {
          const availableForBarber = todayTimeSlots
            .filter(slot => {
              // Verifica se este horário NÃO está agendado para este barbeiro
              const isBooked = appointments.some((appt: IAppointment) => 
                appt.date === slot && appt.barber === barber.name
              );
              return !isBooked;
            })
            .map((slot, index) => ({
              id: index + 1,
              date: slot,
              barberName: barber.name
            }));

          availableSlotsForAllBarbers.push(...availableForBarber);
        });

        console.log("🔹 Horários disponíveis HOJE por barbeiro:", availableSlotsForAllBarbers);
        setAvailableSlots(availableSlotsForAllBarbers);
        setError(null);
        
      } catch (err: any) {
        console.error("🔹 Erro:", err);
        setError("Erro ao buscar dados.");
        setAvailableSlots([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // 🔹 Agrupar slots por barbeiro
  const slotsByBarber = availableSlots.reduce((acc: Record<string, ISlot[]>, slot) => {
    if (!acc[slot.barberName]) {
      acc[slot.barberName] = [];
    }
    acc[slot.barberName].push(slot);
    return acc;
  }, {});

  const todayFormatted = new Date().toLocaleDateString("pt-BR");

  if (loading) return <p>Carregando horários disponíveis...</p>;

  return (
    <section className="available-section">
      <h2 className="available-title">Horários Disponíveis para Hoje ({todayFormatted}) - 09h às 17:30</h2>
      {error && <p className="available-error">{error}</p>}

      {availableSlots.length === 0 ? (
        <p style={{ textAlign: "center" }}>Nenhum horário disponível para hoje.</p>
      ) : (
        <div>
          {Object.entries(slotsByBarber).map(([barberName, slots]) => (
            <div key={barberName} className="barber-slots">
              <h3 className="barber-name">
                💈 {barberName} <span className="barber-slots-count">({slots.length} horários disponíveis)</span>
              </h3>
              <div className="slots-container">
                {slots.map(slot => (
                  <div key={slot.id} className="slot-card">
                     {slot.date.split(', ')[1]}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};