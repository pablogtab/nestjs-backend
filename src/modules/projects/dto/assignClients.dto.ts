import * as Joi from 'joi';

export  interface AssignClientsDto {
    clients: number[]
}

export const AssignClientsSchema = Joi.object<AssignClientsDto,true,AssignClientsDto>({
    clients: Joi.array().items(Joi.number().required()).required()
})