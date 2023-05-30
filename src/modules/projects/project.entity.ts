import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Task } from "../tasks/task.entity"
import { Client } from "../clients/client.entity"



@Entity('projects')
export class Project {
    @PrimaryGeneratedColumn()
    idProject: number

    @Column({ length: 50, nullable: false, unique: true })
    name: string

    @Column({type:'bit', default: 1})
    valid: boolean

    @CreateDateColumn({ type: 'datetime', name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
    updatedAt: Date

    @OneToMany(() => Task, task => task.project)
    tasks: Task[]

    @ManyToMany(() => Client, client => client.projects)
    @JoinTable({ name: 'clientsByProjects' })
    clients: Client[]

}