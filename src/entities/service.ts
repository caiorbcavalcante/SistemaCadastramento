import { PrimaryGeneratedColumn, Column, Entity } from "typeorm"


@Entity("services")
export class Service {

    @PrimaryGeneratedColumn()
    id_service!:number

    @Column({nullable:false})
    price!:number
    

    constructor(id_service:number, price:number){
        if(id_service) this.id_service = id_service
        if(price) this.price = price
    }
}