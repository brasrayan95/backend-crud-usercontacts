import { Exclude } from "class-transformer";

import { Entity, Column, CreateDateColumn, UpdateDateColumn, OneToMany, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Contact } from "./contacts.entity";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({length: 200})
    fullname: string;

    @Column({ length: 50 })
    email: string;

    @Column({ length: 120 })
    @Exclude()
    password: string;

    @Column({ length: 50 })
    phone: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    isAdm: boolean;

    @Column()
    isActive: boolean;

    @OneToMany(() => Contact, (contact) => contact.user)
    contacts: Contact[];
}