import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, Column } from 'typeorm';
import { User } from './user.entity';



@Entity('loginDataHistoric')
export class LoginDataHistoric {
    @PrimaryGeneratedColumn()
    idLoginDataHistoric: number;

    @ManyToOne(() => User, user => user.idUser)
    @JoinColumn({ name: 'idUser' })
    user: User;


    @Column({ type: 'varchar', length: 100, nullable: false })
    hash: string;

    @Column({ type: 'varchar', length: 40, nullable: false })
    salt: string;

    @Column({ type: 'datetime', default: () => 'getutcdate()' })
    createdAt: Date;
}