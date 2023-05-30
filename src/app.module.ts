import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { UsersModule } from './modules/users/users.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './helpers/jwtConstants';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { ClientsModule } from './modules/clients/clients.module';
import { ProjectsModule } from './modules/projects/projects.module';

@Module({
  imports: [
    JwtModule.register(jwtConfig),
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    TasksModule,
    ClientsModule,
    ProjectsModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: 'APP_GUARD', useClass: AuthGuard },
    { provide: 'APP_GUARD', useClass: RoleGuard }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
