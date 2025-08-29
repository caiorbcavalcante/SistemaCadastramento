import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("appointments")
export class Appointment {
    @PrimaryGeneratedColumn()
    id_appointment!: number;

    @Column({nullable:false})
    date!: Date;


    constructor(date?: Date) {
        if (date) this.date = date;
       
    }
}