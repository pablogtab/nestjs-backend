import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { LoginData } from './loginData.entity';
import { LoginDataHistoric } from './loginDataHistoric.entity';
import { User } from './user.entity';

const validMailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

@Injectable()
export class LoginService {
    constructor(
        @InjectRepository(LoginData) private loginRepository: Repository<LoginData>,
        @InjectRepository(LoginDataHistoric) private loginHistoricRepository: Repository<LoginDataHistoric>,
        @InjectRepository(User) private userRepository: Repository<User>,
        private jwtService: JwtService
    ) { }

    async signup(user: CreateUserDto) {

        if (typeof user !== 'object') return new HttpException('Bad Request', 400)
        if (user.email === undefined || user.email === null || user.email === '') { return new HttpException('Email is required', 400); }
        if (!validMailRegEx.test(user.email)) { return new HttpException('Email not valid', 400); }
        if (user.password === undefined || user.password === null || user.password === '' || typeof user.password !== 'string') { return new HttpException('Password is required', 400); }
        if (user.password.length < 8) { return new HttpException('Password must be at least 8 characters long', 400); }
        if (user.password.length > 30) { return new HttpException('Password s max length is 30 ', 400); }



        const userFound = await this.userRepository.findOne({ where: { email: user.email } });
        if (userFound) { return new HttpException('Mail already exists', 400); }

        let newUser = this.userRepository.create({
            email: user.email,
            name: user.name ?? '',
            lastname: user.lastname ?? '',
        })


        newUser = await this.userRepository.save(newUser)

        const salt = bcrypt.genSaltSync(10);

        let loginData = this.loginRepository.create({
            hash: bcrypt.hashSync(user.password, salt),
            salt: salt,
        })

        loginData = await this.loginRepository.save(loginData)

        newUser.loginData = loginData

       await this.userRepository.save(newUser)
       return HttpStatus.OK
    }

    async login(body: LoginDto) {
        if (body.email === undefined || body.email === null || body.email === '') return new HttpException('Email is required', 400);
        if (body.password === undefined || body.password === null || body.password === '') return new HttpException('Password is required', 400);
        if (!validMailRegEx.test(body.email)) return new HttpException('Email not valid', 400);

        const user = await this.userRepository.findOne({ where: { email: body.email, valid: true }, relations: { loginData: true } })

        if (!user) { return new HttpException('Usuario no encontrado', 404) }
        if (!user.loginData?.hash || !user.loginData?.salt) { return new HttpException('Login Data Not Found', 500) }

        const reqPasswordHash = bcrypt.hashSync(body.password, user.loginData.salt)

        if (reqPasswordHash !== user.loginData.hash) { return new HttpException('Password incorrect', 400) }

        return {
            access_token: await this.jwtService.signAsync({
                email: user.email,
                idUser: user.idUser,
                role: user.role,
            }),
        }
    }


}