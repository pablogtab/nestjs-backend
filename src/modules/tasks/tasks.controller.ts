import { Controller, Get, Post, Req, Body, UsePipes, Inject, Put, Param, ParseIntPipe } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { CreateTaskDto } from './dto/createTask.dto';
import { createTaskDtoSchema } from './dto/createTask.dto';
import { UserParam } from 'src/decorators/userParam.decorator';
import { BodyValidation } from 'src/decorators/bodyValidation.decorator';
import { TasksService } from './tasks.service';
import { UserGuardDto } from '../users/dto/userGuard.dto';


@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Roles('ADMIN', 'USER')
    @Get('all')
    getAllTasks(@UserParam() user: UserGuardDto) {
        return this.tasksService.getAllTasks(user)
    }

    @Roles('ADMIN')
    @Post('create')
    createTask(@BodyValidation(createTaskDtoSchema) taskDto: CreateTaskDto) {
        return this.tasksService.createTask(taskDto)
    }

    @Roles('ADMIN', 'USER')
    @Put('complete/:idTask')
    completeTask(@Param('idTask', ParseIntPipe)  idTask: number) {
        return this.tasksService.completeTask(idTask)
    }
}