import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateResidentDto } from './dto/create-resident-dto'

@Injectable()
export class ResidentService {
	constructor(private readonly prisma: PrismaService) {}

	async create(dto: CreateResidentDto) {
		return await this.prisma.resident.create({ data: { ...dto } })
	}

	async getById(id: number) {
		const resident = await this.prisma.resident.findUnique({
			where: { id },
		})

		if (!resident) throw new NotFoundException('Такая заявка не найдена')

		return resident
	}

	async getAll() {
		return await this.prisma.resident.findMany({})
	}
}
