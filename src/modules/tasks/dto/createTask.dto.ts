
import * as Joi from 'joi'

export interface CreateTaskDto {
    idUser: number,
    name: string,
    description: string,
}


export const createTaskDtoSchema = Joi.object<CreateTaskDto, true, CreateTaskDto>({
    idUser: Joi.number().required(),
    name: Joi.string().required().max(50),
    description: Joi.string().required().max(50),
})