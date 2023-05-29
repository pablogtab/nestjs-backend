
import { JwtModuleOptions } from '@nestjs/jwt'

const dotenv = require('dotenv');
dotenv.config({ path: 'config/.env' });

export const jwtConfig: JwtModuleOptions = {
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions:{
        expiresIn: '1d'
    }
}
