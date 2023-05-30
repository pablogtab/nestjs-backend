import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Client } from "./client.entity";
import { CreateClientDto } from "./dto/createClient.dto";
import { UpdateClientDto } from "./dto/updateClient.dto";






@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(Client) private clientRepository: Repository<Client>,
    ) { }

    async getAllClients(): Promise<Client[]> {
        return await this.clientRepository.find({ where: { valid: true } })
    }

    async getAllClientsByProject(idProject: number): Promise<Client[]> {
        return await this.clientRepository.find({ where: { valid: true, projects: { idProject } } })
    }

    async getClientById(idClient: number): Promise<Client> {
        const client = await this.clientRepository.findOne({ where: { idClient } })
        if (!client) throw new HttpException('Client not found', 404)
        return client
    }

    async createClient(data: CreateClientDto): Promise<Client> {
        const client = this.clientRepository.create(data)
        const newClient = await this.clientRepository.save(client)
        return newClient
    }

    async updateClient(idClient: number, data: UpdateClientDto): Promise<Client> {
        const client = await this.getClientById(idClient)
        const clientUpdated = Object.assign(client, data)
        return await this.clientRepository.save(clientUpdated)
    }

    async deleteClient(idClient: number): Promise<Client> {
        const client = await this.getClientById(idClient)
        const clientDeleted = Object.assign(client, { valid: false })
        return await this.clientRepository.save(clientDeleted)
    }
}