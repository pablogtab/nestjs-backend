import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Task } from "./task.entity";
import { User } from "../users/user.entity";


@Entity('timers')
export class Timer {

    @PrimaryGeneratedColumn()
    idTimer: number

    @Column({ type: 'varchar', length: 20, default: 0 })
    timeElapsed: string

    @Column({ type: 'varchar', length: 20, default: 0 })
    billableTimestamp: string

    @Column({ type: 'datetime', nullable: true, default: null })
    startTime: Date | null

    @CreateDateColumn({ type: 'datetime', name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
    updatedAt: Date

    @ManyToOne(() => Task, task => task.timers)
    task: Task

    @ManyToOne(() => User, user => user.timers)
    user: User
}

