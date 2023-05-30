import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from '../users/user.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { TasksService } from './tasks.service';

@Module({
    imports:[TypeOrmModule.forFeature([Task, User])],
    controllers:[TasksController],
    providers:[TasksService]
})
export class TasksModule {}
