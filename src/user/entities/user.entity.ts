import { ListenerEntity } from "src/listeners/entities/listener.entity";
import { PlaylistEntity } from "src/playlist/entities/playlist.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({unique: true })
    email: string;

    @Column({ type: 'varchar' })
    password: string;

    @OneToMany(()=>PlaylistEntity, (playlist)=> playlist.userId , {nullable: true})
    playlists: PlaylistEntity[];

    @OneToMany(()=>ListenerEntity, (listener)=> listener.userId)
    listeners: ListenerEntity[]; 

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
