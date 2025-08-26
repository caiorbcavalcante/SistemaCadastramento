import { DatabaseMemory } from "../DatabaseMemory.js"

interface Appointment {
  cliente: string
  barbeiro: string
  data: string
  serviço: string
}

export class AppointmentService {
  private db: DatabaseMemory

  constructor(db = new DatabaseMemory()) {
    this.db = db
  }

  // Criar agendamento
  create(appointment: Appointment): string {
    const id = this.db.create(appointment)
    return id
  }

  // Listar todos os agendamentos, ou filtrar por search
  getAll(search?: string) {
    return this.db.list(search)
  }

  // Buscar por id
  getById(id: string) {
    const appointments = this.db.list()
    return appointments.find(a => a.id === id) || null
  }

  // Atualizar agendamento
  update(id: string, data: Partial<Appointment>) {
    const appointments = this.db.list()
    const existing = appointments.find(a => a.id === id)
    if (!existing) return false

    // Atualiza só os campos passados
    const updated = { ...existing, ...data }
    this.db.update(id, updated)
    return true
  }

  // Deletar agendamento
  delete(id: string) {
    const appointments = this.db.list()
    const existing = appointments.find(a => a.id === id)
    if (!existing) return false

    this.db.delete(id)
    return true
  }
}
