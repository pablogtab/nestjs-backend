import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Project } from "./project.entity";
import { ProjectController } from "./project.controller";
import { ProjectService } from "./project.service";
import { Client } from "../clients/client.entity";



@Module({
    imports:[TypeOrmModule.forFeature([Project, Client])],
    controllers:[ProjectController],
    providers:[ProjectService],
})
export class ProjectsModule {}