import { BadRequestException, ExecutionContext, createParamDecorator } from "@nestjs/common";
import { ObjectSchema } from "joi";



export const BodyValidation = createParamDecorator((schema: ObjectSchema, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    
    
    const { error } = schema.validate(request.body);

    if (error) {
        throw new BadRequestException(error.message);
    }

    return request.body
})