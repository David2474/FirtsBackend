import { map } from "rxjs"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "../users/user.entity"

@Entity()
export class Post {

    @Column()
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    authorId: number;

    @ManyToOne(() => User, user => user.posts)
    author : User;
}