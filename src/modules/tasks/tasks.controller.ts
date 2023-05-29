import { Controller, Get, Post, Req, Body, UsePipes } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { CreateTaskDto } from './dto/createTask.dto';
import { createTaskDtoSchema } from './dto/createTask.dto';
import { JoiValidationPipe } from 'src/helpers/joiValidation.pipe';
import { UserParam } from 'src/decorators/userParam.decorator';
import { User } from '../users/user.entity';
import { BodyValidation } from 'src/decorators/bodyValidation.decorator';


@Controller('tasks')
export class TasksController {
    constructor() { }

    @Roles('ADMIN', 'USER')
    @Get('all')
    getAllTasks(@Req() req: Request) {



        return []
    }

    @Roles('ADMIN')
    @Post('create')
    createTask(@BodyValidation(createTaskDtoSchema) taskDto: CreateTaskDto, @UserParam() user: User) {
        console.log(user)
        return taskDto
    }
}