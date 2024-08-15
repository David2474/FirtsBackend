import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: 'profile'})
export class Profile{

    @PrimaryGeneratedColumn()
    ProfileId: number

    @Column()
    firtsname: string

    @Column()
    age: number
}