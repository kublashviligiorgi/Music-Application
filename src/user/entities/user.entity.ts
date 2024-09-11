import { RoleEnum } from "src/authorization/enums/roles.enum";
import { PlaylistEntity } from "src/playlist/entities/playlist.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({ type: "varchar" })
    phoneNumber: string;

    @Column({ type: 'varchar', select: false})
    password: string;

    @OneToMany(() => PlaylistEntity, (playlist) => playlist.userId, { nullable: true })
    playlists: PlaylistEntity[];

    @Column({ default: RoleEnum.user, type: 'enum', enum: RoleEnum })
    roles: RoleEnum

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
