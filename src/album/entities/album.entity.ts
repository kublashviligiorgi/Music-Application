import { MusicEntity } from "src/music/entities/music.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class AlbumEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    title: string;

    @Column({ type: 'varchar' })
    relaseDate: string;

    // @Column({ type: 'varchar' })
    // artistName: string;

    @ManyToMany(() => MusicEntity, (music) => music.albums, { cascade: true })
    @JoinTable()
    musics: MusicEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

}
