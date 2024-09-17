import { MusicEntity } from "src/music/entities/music.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class ListenerEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;
    
    @ManyToOne(() => UserEntity, (userId) => userId.listeners)
    user: UserEntity;

    @Column()
    musicId:number;

    @ManyToOne(() => MusicEntity, (musicId) => musicId.listeners)
    music: MusicEntity;
}
