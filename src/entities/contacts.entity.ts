import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class Contact {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({length: 200})
    fullname: string;

    @Column({ length: 50 })
    email: string;

    @Column({ length: 50 })
    phone: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}