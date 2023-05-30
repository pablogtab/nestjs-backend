import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ProjectService } from "./project.service";
import { BodyValidation } from "src/decorators/bodyValidation.decorator";
import { CreateProjectDto, CreateProjectSchema } from "./dto/createProject.dto";
import { AssignClientsDto, AssignClientsSchema } from "./dto/assignClients.dto";


@Controller('projects')
export class ProjectController {

    constructor(private projectservice: ProjectService) { }

    @Post('new')
    createProject(@BodyValidation(CreateProjectSchema) project: CreateProjectDto) {
        return this.projectservice.createProject(project)
    }

    @Put(':idProject')
    updateProject(@Param('idProject', ParseIntPipe) idProject: number, @BodyValidation(CreateProjectSchema) project: CreateProjectDto) {
        return this.projectservice.updateProject(idProject, project)
    }

    @Get('all')
    getAllProjects() {
        return this.projectservice.getAllProjects()
    }

    @Get('client/:idClient')
    getProjectsByClient(@Param('idClient', ParseIntPipe) idClient: number) {
        return this.projectservice.getProjectsByClient(idClient)
    }

    @Get(':idProject')
    getProjectById(@Param('idProject', ParseIntPipe) idProject: number) {
        return this.projectservice.getProjectById(idProject)
    }

    @Delete(':idProject')
    deleteProject(@Param('idProject', ParseIntPipe) idProject: number) {
        return this.projectservice.deleteProject(idProject)
    }

    @Post('assign/:idProject')
    assignProject(@Param('idProject', ParseIntPipe) idProject: number, @BodyValidation(AssignClientsSchema) body: AssignClientsDto) {
        return this.projectservice.assignClientsToProject(idProject, body.clients)
    }

}