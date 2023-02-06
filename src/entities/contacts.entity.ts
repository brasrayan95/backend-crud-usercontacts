import { Entity, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("contacts")
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

    @ManyToOne(() => User)
    user: User;
}