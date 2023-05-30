import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./task.entity";
import { Repository } from "typeorm";
import { User } from "../users/user.entity";
import { CreateTaskDto } from "./dto/createTask.dto";
import { UserGuardDto } from "../users/dto/userGuard.dto";




@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task) private tasksRepository: Repository<Task>,
        @InjectRepository(User) private usersRepository: Repository<User>
    ) { }


    async getAllTasks(user: UserGuardDto) {
        let tasks = await this.tasksRepository.find({ where: { users: {idUser:user.idUser} } })
        return tasks
    }

    async createTask(taskDto: CreateTaskDto) {
        let user = await this.usersRepository.findOne({ where: { idUser: taskDto.idUser } })

        if(!user) return new HttpException('User not found', 404)

        let task = this.tasksRepository.create({
            description: taskDto.description,
            name: taskDto.name,
            status: 'PENDING',
            users: [user]
        })

        const newTask = await this.tasksRepository.save(task)

        //user.tasks.push(newTask)
        //await this.usersRepository.save(user)

        return newTask
    }

    async completeTask(idTask: number) {

        let task = await this.tasksRepository.findOne({ where: { idTask: idTask } })

        if(!task) return new HttpException('Task not found', 404)

        task.status = 'DONE'

        return await this.tasksRepository.save(task)
    }
}