import { InjectRepository } from "@nestjs/typeorm";
import { Repository, In } from "typeorm";
import { Project } from "./project.entity";
import { CreateProjectDto } from "./dto/createProject.dto";
import { HttpException } from "@nestjs/common";
import { Client } from "../clients/client.entity";
import { log } from "console";



export class ProjectService {
    constructor(
        @InjectRepository(Project) private projectRepository: Repository<Project>,
        @InjectRepository(Client) private clientRepository: Repository<Client>,
    ) { }

    async createProject(project: CreateProjectDto) {
        const existProject = await this.projectRepository.findOne({ where: { name: project.name } })
        if (existProject) throw new HttpException('Project already exists', 400)
        return this.projectRepository.save(project)
    }

    async updateProject(idProject: number, project: CreateProjectDto) {
        const existProject = await this.projectRepository.findOne({ where: { name: project.name } })
        if (existProject) throw new HttpException("That project's name already exists", 404)

        let projectToUpdate = await this.projectRepository.findOne({ where: { idProject } })
        if (!projectToUpdate) throw new HttpException("That project doesn't exists", 404)

        projectToUpdate.name = project.name
        return this.projectRepository.save(projectToUpdate)
    }

    async deleteProject(idProject: number) {
        let projectToDelete = await this.projectRepository.findOne({ where: { idProject } })
        if (!projectToDelete) throw new HttpException("That project doesn't exists", 404)
        projectToDelete.valid = false
        return this.projectRepository.save(projectToDelete)
    }

    async getProjectById(idProject: number) {
        let project = await this.projectRepository.findOne({ where: { idProject } })
        if (!project) throw new HttpException("That project doesn't exists", 404)
        return project
    }

    async getAllProjects() {
        return this.projectRepository.find({ where: { valid: true } })
    }

    async getProjectsByClient(idClient: number) {
        return this.projectRepository.find({ where: { valid: true, clients: { idClient } } })
    }

    async assignClientsToProject(idProject: number, clients: number[]) {
        const clientsFound = await this.clientRepository.findBy({ idClient: In(clients), valid: true })
        if( clientsFound.length !== clients.length ) throw new HttpException("Some clients doesn't exists", 404)
        const project = await this.projectRepository.findOne({ where: { idProject } })
        if (!project) throw new HttpException("That project doesn't exists", 404)
        project.clients = clientsFound
        return this.projectRepository.save(project)
    }
}