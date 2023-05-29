import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';


@Entity('loginData')
export class LoginData {

    @PrimaryGeneratedColumn()
    idLoginData: number;

    @OneToOne(() => User, user => user.loginData)
    @JoinColumn({ name: 'idUser' })
    user: User;

    @Column({ length: 100, nullable: false })
    hash: string;

    @Column({ length: 40, nullable: false })
    salt: string;

    @Column({ type: 'datetime', name: 'created_at', default: () => 'getutcdate()' })
    createdAt: Date;
}