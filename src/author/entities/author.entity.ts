import { CreateMusicDto } from "src/music/dto/create-music.dto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AuthorEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    firstName: string;

    @Column({ type: 'varchar', length: 100 })
    lastName: string;

    @Column({ type: 'array' })
    musics: CreateMusicDto[];

    @Column({ type: 'longtext' })
    biography: string;
}
