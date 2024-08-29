import { AlbumEntity } from "src/album/entities/album.entity";
import { AuthorEntity } from "src/author/entities/author.entity";
import { PlaylistEntity } from "src/playlist/entities/playlist.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class MusicEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'varchar' })
    url: string;

    @ManyToMany(() => AlbumEntity, (album) => album.musics)
    albums: AlbumEntity[];

    @ManyToMany(() => PlaylistEntity, (playlist) => playlist.musics)
    playlists: PlaylistEntity[];

    @ManyToMany(()=>AuthorEntity, (author) => author.musics)
    authors: AuthorEntity[];

    // @Column()
    // authorId:any;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

}

