import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AlbumEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    relaseDate: string;

    @Column()
    artistName: string;

}
