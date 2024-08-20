import { AlbumEntity } from "src/album/entities/album.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class MusicEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'int' })
    authorId: number;

    @Column({ type: 'varchar' })
    url: string;

    @ManyToMany(() => AlbumEntity, (album) => album.musics)
    albums: AlbumEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

}

