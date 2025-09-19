import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Service } from "./Service";
import { Appointment } from "./Appointment";

@Entity ("barbers")

export class Barber {
    @PrimaryGeneratedColumn()
    id_barber!: number;

    @Column({nullable: false})
    name!: string;

    @Column({unique: true, nullable: false})
    email!: string;

    @Column({nullable: false})
    password!: string;

    @Column({nullable: false})
    number!: number;
    
    @ManyToOne(() => User, user=>user.barbers)
    user!:User

    @OneToMany(()=> Service, service=>service.barber)
    services!:Service[]

    @OneToMany(()=> Appointment, appointment=>appointment.barber)
    appointments!:Appointment[]

    constructor(name?: string, email?: string, password?: string, number?: number){
        if(name) this.name = name
        if(email) this.email = email
        if(password) this.password = password
        if(number) this.number = number
    }
}