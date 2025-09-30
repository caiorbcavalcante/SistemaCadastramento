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

    @ManyToOne(()=>User,user=>user.appointments, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: 'userId' })
    user!:User

    @ManyToOne(()=>Barber,barber=>barber.appointments, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: 'barberId' })
    barber!:Barber

    @ManyToOne(() => Service, service => service.appointments, {
        onDelete: "CASCADE", // SE DER MAIS UM BO DOS GRANDES REMOVER ISSO 
    }) 
    @JoinColumn({ name: 'serviceId' })
    service!: Service;

    constructor(date?: Date) {
        if (date) this.date = date;
       
    }
}