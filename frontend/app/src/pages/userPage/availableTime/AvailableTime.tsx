import axios from "axios";
import { useEffect, useState } from "react";

interface ISlot {
  id: number;
  date: Date; 
  barberName: string;
}

export const AvailableTime: React.FC = () => {
  const [slots, setSlots] = useState<ISlot[]>([]);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    const fetchAvailableSlots = async () => {
      try {
        const res = await axios.get("http://localhost:3000/appointments", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const filteredHour = res.data.filter((slot: ISlot) => {
          const hour = new Date(slot.date).getHours();
          return hour >= 9 && hour <= 18;
        });

        setSlots(filteredHour);
        setError(null);
      } catch {
        setError("Erro ao buscar horários disponíveis.");
      }
    };

    fetchAvailableSlots();
  }, [token]);

  // Agrupar slots por barbeiro
  const slotsByBarber = slots.reduce((acc: Record<string, ISlot[]>, slot) => {
    if (!acc[slot.barberName]) acc[slot.barberName] = [];
    acc[slot.barberName].push(slot);
    return acc;
  }, {});

  return (
    <div>
      <h2>Horários Disponíveis (09h às 18h)</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {Object.keys(slotsByBarber).length === 0 ? (
        <p>Nenhum horário disponível.</p>
      ) : (
        Object.entries(slotsByBarber).map(([barber, slots]) => (
          <div key={barber} style={{ marginBottom: "1.5rem" }}>
            <h3>{barber}</h3>
            <ul>
              {slots.map((slot) => (
                <li key={slot.id}>
                  {new Date(slot.date).toLocaleString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};
