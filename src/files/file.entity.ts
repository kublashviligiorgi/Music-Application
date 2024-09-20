import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class FileEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column( )
    url: string;

    @Column()
    filename: string;

    @Column()
    key: string;

    @Column() 
    bucket: string;
}