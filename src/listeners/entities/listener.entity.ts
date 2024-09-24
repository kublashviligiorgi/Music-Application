import { MusicEntity } from "src/music/entities/music.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class ListenerEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;
    
    @ManyToOne(() => UserEntity, (user) => user.listeners)
    user: UserEntity;

    @Column()
    musicId:number;

    @ManyToOne(() => MusicEntity, (music) => music.listeners)
    music: MusicEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}