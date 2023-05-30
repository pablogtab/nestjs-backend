import * as Joi from "joi"

export interface CreateClientDto {
    name: string
}

export const CreateClientSchema = Joi.object<CreateClientDto, true, CreateClientDto>({
    name: Joi.string().required().min(5).max(50)
})