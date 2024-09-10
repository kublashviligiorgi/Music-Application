import { MusicEntity } from "src/music/entities/music.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class PlaylistEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50 })
    name: string;

    @Column({ type: 'longtext', nullable: true })
    description: string;

    @Column({nullable: true})
    userId: number;

    
    @ManyToOne(()=>UserEntity, (user)=> user.playlists)
    user: UserEntity;

    @Column({ type: 'varchar' })
    image: string;

    @ManyToMany(() => MusicEntity, (music) => music.playlists)
    musics: MusicEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

}
