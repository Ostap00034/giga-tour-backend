import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateInstershipQueryDto } from './dto/create-intership-query.dto'
import { UpdateIntershipQueryStatus } from './dto/update-status-query.dto'

@Injectable()
export class IntershipqueryService {
	constructor(private readonly prisma: PrismaService) {}

	async create(dto: CreateInstershipQueryDto) {
		return await this.prisma.intershipQuery.create({ data: dto })
	}

	async updateStatus(id: number, dto: UpdateIntershipQueryStatus) {
		const intershipquery = await this.getById(id)

		if (dto.status === 'Reject')
			return this.prisma.intershipQuery.update({
				where: { id },
				data: {
					status: dto.status,
				},
			})

		return this.prisma.intershipQuery.update({
			where: { id },
			data: {
				status: dto.status,
				appointmentDate: dto.date,
			},
		})
	}

	async getById(id: number) {
		const intershipquery = await this.prisma.intershipQuery.findUnique({
			where: { id },
		})

		if (!intershipquery) throw new NotFoundException('Такая заявка не найдена')

		return intershipquery
	}

	async getAll() {
		return await this.prisma.intershipQuery.findMany({})
	}
}
