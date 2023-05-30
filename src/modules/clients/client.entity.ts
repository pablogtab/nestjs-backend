import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "../tasks/task.entity";
import { Project } from "../projects/project.entity";


@Entity('clients')
export class Client {

    @PrimaryGeneratedColumn()
    idClient: number;

    @Column({ length: 50, nullable: false })
    name: string;

    @Column({ type: 'bit', default: 1 })
    valid: boolean;

    @ManyToMany(() => Task, task => task.clients)
    tasks: Client[];

    @ManyToMany(()=>Project, project => project.clients)
    projects: Project[];
}