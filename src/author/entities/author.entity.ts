import { AlbumEntity } from "src/album/entities/album.entity";
import { CreateMusicDto } from "src/music/dto/create-music.dto";
import { MusicEntity } from "src/music/entities/music.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class AuthorEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    firstName: string;

    @Column({ type: 'varchar', length: 100 })
    lastName: string;

    @Column({ type: 'longtext' })
    biography: string;

    @OneToMany(()=>AlbumEntity, (album)=> album.author)
    albums: AlbumEntity[];

    @ManyToMany(()=>MusicEntity, (music)=> music.authors)
    @JoinTable()
    musics: MusicEntity[];

    @CreateDateColumn() 
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
