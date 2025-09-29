import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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
    @JoinColumn({ name: 'userId' })
    user!:User

    @ManyToOne(()=>Barber,barber=>barber.appointments)
    @JoinColumn({ name: 'barberId' })
    barber!:Barber

    @ManyToOne(() => Service, service => service.appointments)
    @JoinColumn({ name: 'serviceId' })
    service!: Service;

    constructor(date?: Date) {
        if (date) this.date = date;
       
    }
}