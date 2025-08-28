import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("appointments")
export class Appointment {
    @PrimaryGeneratedColumn()
    id_appointment!: number;

    @Column({nullable:false})
    date!: Date;

    @Column({nullable:false})
    service!: string;

    constructor(date?: Date, service?: string) {
        if (date) this.date = date;
        if (service) this.service = service;
    }
}