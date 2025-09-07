import { PrimaryGeneratedColumn, Column, Entity, OneToMany, ManyToOne } from "typeorm"
import { User } from "./User"
import { Appointment } from "./Appointment"
import { Barber } from "./Barber"


@Entity("services")
export class Service {

    @PrimaryGeneratedColumn()
    id_service!:number

    @Column({nullable:false})
    price!:number

    @Column({nullable: false})
    description!: string
    
    @OneToMany(() => User, user => user.services)
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