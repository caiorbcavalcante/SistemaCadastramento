import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Barber } from "./Barber";
import { Service } from "./Service";
import { Appointment } from "./Appointment";

@Entity("users")
export class User {

    @PrimaryGeneratedColumn()
    id_user!: number;

    @Column({ nullable: false })
    name!: string;

    @Column({ unique: true, nullable: false })
    email!: string;

    @Column({ nullable: false })
    password!: string;

    @Column({ nullable: false})
    number!: number;


    @ManyToOne(() => Barber, barber => barber.users)
    barber!: Barber;


    @OneToMany(()=> Service, service => service.user)
    services!:Service[]

    @OneToMany(()=> Appointment, appointment => appointment.user)
    appointments!:Appointment[]



    constructor(name?:string, email?:string, password?:string, number?:number){
       if(name) this.name = name
        if(email) this.email=email
        if(password)this.password=password
        if(number) this.number = number
    }
}
 
