import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "../users/user.entity";


@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn()
    idTask: number;

    @Column({ length: 50, nullable: false })
    name: string;

    @Column({ length: 50, nullable: false })
    description: string;

    @Column({ length: 20, nullable: false })
    status: TaskStatus;

    @Column({ type: 'datetime', name: 'created_at', default: () => 'getutcdate()' })
    createdAt: Date;

    @Column({ type: 'datetime', name: 'updated_at', default: () => 'getutcdate()' })
    updatedAt: Date;

    @Column({ type: 'datetime', name: 'deleted_at', nullable: true })
    deletedAt: Date;

    @ManyToOne(() => User, user => user.idUser)
    @JoinColumn({ name: 'idUser' })
    user: User;

}



//MAPA QUE PERMITE QUE CADA ESTADO TENGA UN FEATURE LO VEREMOS MAS ADELANTE
export const TASK_STATUS = {
    PENDING: 'PENDING',
    IN_PROGRESS: 'IN_PROGRESS',
    DONE: 'DONE',
    DELETED: 'DELETED'
} as const;

export type TaskStatus = keyof typeof TASK_STATUS
