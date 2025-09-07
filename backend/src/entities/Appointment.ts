import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Barber } from "./Barber";
import { Service } from "./Service";


@Entity("appointments")
export class Appointment {
    @PrimaryGeneratedColumn()
    id_appointment!: number;

    @Column({nullable:false})
    date!: Date;

    @ManyToOne(()=>User,user=>user.appointments)
    user!:User

    @ManyToOne(()=>Barber,barber=>barber.appointments)
    barber!:Barber

    @ManyToOne(() => Service, service => service.appointments)
    service!: Service;

    constructor(date?: Date) {
        if (date) this.date = date;
       
    }
}