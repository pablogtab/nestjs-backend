import * as Joi from "joi"

export interface CreateProjectDto {
    name: string
}


export const CreateProjectSchema = Joi.object<CreateProjectDto, true, CreateProjectDto>({
    name: Joi.string().required().min(5).max(50)
})