import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { CustomerService } from "../services/customers.service";
import { Prisma } from "@prisma/client";
import { RegisterDto } from "../../auth/dto/register.dto";
import { CreateCustomerDto } from "../dto/create-customer.dto";
import { UpdateCustomerDto } from "../dto/update-customer.dto";

@Controller('customers')
export class CustomersController {
    constructor(private readonly customerService: CustomerService) { }

    @Post()
    async createCustomer(@Body() CreateCustomerDto: CreateCustomerDto) {
        try {
            return await this.customerService.createCustomer(CreateCustomerDto);
        } catch (error) {
            return { message: error.message };
        }
    }

    @Get()
    async getCustomer() {
        return await this.customerService.getCustomers();
    }

    @Get(':id')
    async getCustomerById(@Param('id', ParseIntPipe) id: number) {
        return this.customerService.getCustomerById(id);
    }

    @Put(':id')
    async updateCustomer(@Param('id', ParseIntPipe) id: number, @Body() UpdateCustomerDto: UpdateCustomerDto) {
        return this.customerService.updateCustomer(id, UpdateCustomerDto);
    }

    @Delete(':id')
    async deleteCustomer(@Param('id', ParseIntPipe) id: number) {
        try {
            return await this.customerService.deleteCustomer(id);
        } catch (error) {
            return { message: error.message };
        }
    }
}