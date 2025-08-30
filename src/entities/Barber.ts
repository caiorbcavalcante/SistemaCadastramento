import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

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
    
    @ManyToOne(() => User, user=>user.barbers)
    users!:User


    constructor(name?: string, email?: string, password?: string){
        if(name) this.name = name
        if(email) this.email = email
        if(password) this.password = password
    }
}