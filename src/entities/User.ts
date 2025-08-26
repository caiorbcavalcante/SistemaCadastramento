import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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


    constructor(name?:string, email?:string, password?:string){
       if(name) this.name = name
        if(email) this.email=email
        if(password)this.password=password
    }
}
