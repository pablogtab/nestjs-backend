import { Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { BodyValidation } from "src/decorators/bodyValidation.decorator";
import { CreateClientDto, CreateClientSchema } from "./dto/createClient.dto";
import { ClientService } from "./client.service";
import { UpdateClientDto, UpdateClientSchema } from "./dto/updateClient.dto";




@Controller('clients')
export class ClientController {

    constructor(private clientService: ClientService) { }

    @Post('new')
    createClient(@BodyValidation(CreateClientSchema) client: CreateClientDto) {
        return this.clientService.createClient(client)
    }

    @Put(':idClient')
    updateClient(@BodyValidation(UpdateClientSchema) client: UpdateClientDto, @Param('idClient', ParseIntPipe) idClient: number) {
        return this.clientService.updateClient(idClient, client)
    }

    @Delete(':idClient')
    deleteClient(@Param('idClient', ParseIntPipe) idClient: number) {
        return this.clientService.deleteClient(idClient)
    }

    
    @Get('all')
    getAllClients() {
        return this.clientService.getAllClients()
    }
    
    @Get(':idClient')
    getClientById(@Param('idClient', ParseIntPipe) idClient: number) {
        return this.clientService.getClientById(idClient)
    }
    
    @Get('all/project/:idProject')
    getAllClientsByProject(@Param('idProject', ParseIntPipe) idProject: number) {
        return this.clientService.getAllClientsByProject(idProject)
    }
}