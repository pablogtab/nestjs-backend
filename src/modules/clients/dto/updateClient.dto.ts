import * as Joi from "joi"

export interface UpdateClientDto {
    name: string
}


export const UpdateClientSchema = Joi.object<UpdateClientDto, true, UpdateClientDto>({
    name: Joi.string().required().min(5).max(50)
})