import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { HelloCommand } from '@ocmi/api/commands/hello.command';
import { PrismaModule } from 'nestjs-prisma';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    // HelloCommand
  ],
})
export class AppModule { }
