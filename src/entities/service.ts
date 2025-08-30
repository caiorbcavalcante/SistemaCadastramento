import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm"
import { User } from "./User"


@Entity("services")
export class Service {

    @PrimaryGeneratedColumn()
    id_service!:number

    @Column({nullable:false})
    price!:number
    
    @OneToMany(() => User, user => user.services)
    user!:User

    constructor(id_service:number, price:number){
        if(id_service) this.id_service = id_service
        if(price) this.price = price
    }
}