import { PrimaryGeneratedColumn, Column, Entity, OneToMany, ManyToOne, JoinColumn } from "typeorm"
import { Appointment } from "./Appointment"

@Entity("services")
export class Service {

    @PrimaryGeneratedColumn()
    id_service!:number

    @Column({nullable:false})
    price!:number

    @Column({nullable: false})
    description!: string
    
   

    @OneToMany(() => Appointment, appointment => appointment.service)
    appointments!: Appointment[];


    constructor(description:string, price:number){
        if(description) this.description = description
        if(price) this.price = price
    }
}