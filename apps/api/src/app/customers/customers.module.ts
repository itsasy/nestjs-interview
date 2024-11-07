import { Module } from '@nestjs/common';
import { CustomersController } from './controllers/customers.controller';
import { CustomerService } from './services/customers.service';
import { PrismaService } from 'nestjs-prisma';

@Module({
    controllers: [CustomersController],
    providers: [
        CustomerService,
        PrismaService
    ],
    exports: [CustomerService]
})

export class CustomersModule { }
