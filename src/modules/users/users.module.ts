import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { LoginData } from './loginData.entity';
import { LoginDataHistoric } from './loginDataHistoric.entity';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
    imports: [TypeOrmModule.forFeature([User, LoginData, LoginDataHistoric])],
    controllers: [LoginController],
    providers: [LoginService],
})
export class UsersModule { }
