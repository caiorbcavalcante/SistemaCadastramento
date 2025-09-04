import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, OneToMany } from "typeorm"
import { User } from "./User"
import { Barber } from "./Barber"
import { Appointment } from "./Appointment"


@Entity("services")
export class Service {

    @PrimaryGeneratedColumn()
    id_service!:number

    @Column({nullable:false})
    price!:number

    @Column({nullable: false})
    description!: string
    
    @ManyToOne(() => User, user => user.services)
    user!:User

    @ManyToOne(() => Barber, barber=>barber.services)
    barber!:Barber

    @OneToMany(() => Appointment, appointment => appointment.service)
    appointments!: Appointment[];


    constructor(description:string, price:number){
        if(description) this.description = description
        if(price) this.price = price
    }
}