import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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

    @Column({nullable: false})
    adminplus!: boolean;
    


    @OneToMany(()=> Appointment, appointment=>appointment.barber)
    appointments!:Appointment[]

    constructor(name?: string, email?: string, password?: string, number?: number, adminplus?:boolean){
        if(name) this.name = name
        if(email) this.email = email
        if(password) this.password = password
        if(number) this.number = number
        if(adminplus) this.adminplus = this.adminplus
    }
}