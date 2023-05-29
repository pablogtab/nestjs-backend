import { Body, Controller, Post } from "@nestjs/common";
import { LoginService } from "./login.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";
import { Public } from "src/decorators/public.decorator";


@Controller('login')
export class LoginController {
    constructor(private loginService: LoginService) { }

    @Public()
    @Post('signup')
    newUser(@Body() user: CreateUserDto) {
        return this.loginService.signup(user)
    }

    @Public()
    @Post('login')
    login(@Body() body: LoginDto) {
        return this.loginService.login(body)
    }

}