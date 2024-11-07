import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Customer, Prisma } from "@prisma/client";
import { PrismaService } from "nestjs-prisma";
import * as bcrypt from 'bcrypt';
import { CreateCustomerDto } from "../dto/create-customer.dto";
import { UpdateCustomerDto } from "../dto/update-customer.dto";

@Injectable()
export class CustomerService {
    constructor(private prisma: PrismaService) { }

    async createCustomer(CreateCustomerDto: CreateCustomerDto) {
        const hashedPassword = await bcrypt.hash('password', 10);
        const roleId = 2; //Customer Role

        const existingUser = await this.prisma.user.findUnique({
            where: { email: CreateCustomerDto.email }
        })

        if (existingUser) {
            throw new BadRequestException('Customer with this email already exists');
        }

        try {
            const createdUser = await this.prisma.user.create({
                data: {
                    email: CreateCustomerDto.email,
                    password: hashedPassword,
                    name: CreateCustomerDto.name,
                    roleId: roleId
                }
            });

            const createdCustomer = await this.prisma.customer.create({
                data: {
                    userId: createdUser.id
                }
            });

            return {
                status: 'success',
                message: 'Customer created successfully',
                createdCustomer
            }

        } catch (error) {
            throw new Error('Error creating customer');
        }
    }

    async getCustomers() {
        const customers = await this.prisma.customer.findMany({
            select: {
                id: true,
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            }
        });

        const results = customers.map(customer => {
            return {
                id: customer.id,
                name: customer.user.name,
                email: customer.user.email
            }
        })

        return { customers: results }
    }

    async getCustomerById(id: number) {
        const customer = await this.prisma.customer.findUnique({
            where: { id },
            select: {
                id: true,
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            }
        });

        return customer ? {
            id: customer.id,
            name: customer.user.name,
            email: customer.user.email
        } : null
    }

    async updateCustomer(id: number, UpdateCustomerDto: UpdateCustomerDto) {
        try {
            const updatedCustomer = await this.prisma.customer.update({
                where: { id },
                data: {
                    /* Update User */
                    user: {
                        update: {
                            name: UpdateCustomerDto.name,
                            email: UpdateCustomerDto.email
                        }
                    }
                },
                select: {
                    id: true,
                    user: {
                        select: {
                            name: true,
                            email: true
                        }
                    }
                }
            });

            return {
                id: updatedCustomer.id,
                name: updatedCustomer.user.name,
                email: updatedCustomer.user.email
            };

        } catch (error) {
            throw new Error('Error updating customer');
        }
    }

    async deleteCustomer(id: number) {
        try {
            const customer = await this.prisma.customer.findUnique({ where: { id } });

            if (!customer) {
                throw new NotFoundException('Customer not found');
            }

            await this.prisma.customer.delete({
                where: { id }
            });

            await this.prisma.user.delete({
                where: { id: customer.userId }
            });

            return {
                status: 'success',
                message: 'Customer and associated deleted successfully',
            }

        } catch (error) {
            throw new InternalServerErrorException('Error deleting customer');
        }
    }
}