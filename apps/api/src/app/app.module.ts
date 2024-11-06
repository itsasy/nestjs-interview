import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { HelloCommand } from '@ocmi/api/commands/hello.command';
import { PrismaModule } from 'nestjs-prisma';
import { AuthModule } from './auth/auth.module';
//import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    //CustomersModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // HelloCommand
  ],
})
export class AppModule { }
