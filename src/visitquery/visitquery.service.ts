import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateVisitQueryDto } from './dto/create-visit-query.dto'
import { UpdateVisitQueryStatus } from './dto/update-status-query.dto'

@Injectable()
export class VisitqueryService {
	constructor(private readonly prisma: PrismaService) {}

	async create(dto: CreateVisitQueryDto) {
		return await this.prisma.visitQuery.create({ data: dto })
	}

	async updateStatus(id: number, dto: UpdateVisitQueryStatus) {
		const visitquery = await this.getById(id)

		if (dto.status === 'Reject')
			return this.prisma.visitQuery.update({
				where: { id },
				data: {
					status: dto.status,
				},
			})

		return this.prisma.visitQuery.update({
			where: { id },
			data: {
				status: dto.status,
				appointmentDate: dto.date,
			},
		})
	}

	async getById(id: number) {
		const visitquery = await this.prisma.visitQuery.findUnique({
			where: { id },
		})

		if (!visitquery) throw new NotFoundException('Такая заявка не найдена.')

		return visitquery
	}

	async getAll() {
		return await this.prisma.visitQuery.findMany({})
	}
}
