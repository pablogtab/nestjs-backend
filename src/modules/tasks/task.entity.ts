import { Entity, PrimaryGeneratedColumn, Column,  UpdateDateColumn, CreateDateColumn, DeleteDateColumn, OneToMany, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { User } from "../users/user.entity";
import { Timer } from "./timer.entity";
import { Client } from "../clients/client.entity";
import { Project } from "../projects/project.entity";


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

    @CreateDateColumn({ type: 'datetime', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'datetime', name: 'deleted_at', nullable: true })
    deletedAt: Date;


    @OneToMany(() => Timer, timer => timer.task)
    timers: Timer[]

    @ManyToMany(() => User, user => user.tasks)
    @JoinTable({ name: 'tasksByUsers' })
    users: User[];

    @ManyToMany(() => Client, client => client.tasks)
    @JoinTable({ name: 'tasksByClients' })
    clients: Client[];

    @ManyToOne(()=>Project, project => project.tasks)
    project: Project;

    @OneToMany(() => Task, task => task.parentTask)
    subTasks?: Task[];

    @ManyToOne(() => Task, task => task.subTasks)
    parentTask?: Task;
}



//MAPA QUE PERMITE QUE CADA ESTADO TENGA UN FEATURE LO VEREMOS MAS ADELANTE
export const TASK_STATUS = {
    PENDING: 'PENDING',
    IN_PROGRESS: 'IN_PROGRESS',
    DONE: 'DONE',
    DELETED: 'DELETED'
} as const;

export type TaskStatus = keyof typeof TASK_STATUS
