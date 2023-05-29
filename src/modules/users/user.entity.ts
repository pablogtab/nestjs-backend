import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';
import { LoginData } from './loginData.entity';
import { LoginDataHistoric } from './loginDataHistoric.entity';
import { Task } from '../tasks/task.entity';
import { USER_ROLES, UserRole } from './userRole';


@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    idUser: number;

    @Column({ length: 50, nullable: false })
    name: string;

    @Column({ length: 50, nullable: false })
    lastname: string;

    @Column({ length: 50, unique: true, nullable: false })
    email: string;

    @Column({ type: 'bit', nullable: false, default: '1' })
    valid: boolean

    @Column({ type: 'varchar', length: 30, nullable: false, default: USER_ROLES.GUEST })
    role: UserRole

    @Column({ type: 'datetime', name: 'created_at', default: () => 'getutcdate()' })
    createdAt: Date;

    @Column({ type: 'datetime', name: 'updated_at', default: () => 'getutcdate()' })
    updatedAt: Date;

    @OneToOne(() => LoginData, loginData => loginData.user)
    loginData?: LoginData;

    @OneToMany(() => LoginDataHistoric, historicLoginData => historicLoginData.user)
    historicLoginData?: LoginDataHistoric[];

    @OneToMany(() => Task, task => task.user)
    tasks?: Task[];
}
