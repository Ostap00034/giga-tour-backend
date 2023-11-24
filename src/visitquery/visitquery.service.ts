import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateVisitQueryDto } from './dto/create-visit-query.dto'
import { UpdateVisitQueryStatus } from './dto/update-status-query.dto'
import { VisitQueryGateway } from 'src/gateway/visitquery.gateway'

@Injectable()
export class VisitqueryService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly visitQueryGateway: VisitQueryGateway
	) {}

	async create(dto: CreateVisitQueryDto) {
		const newquery = await this.prisma.visitQuery.create({ data: dto })
		this.visitQueryGateway.sendCreateVisitQuery(newquery)
		return newquery
	}

	async updateStatus(id: number, dto: UpdateVisitQueryStatus) {
		const visitquery = await this.getById(id)

		let newquery

		if (dto.status === 'Reject')
			newquery = await this.prisma.visitQuery.update({
				where: { id },
				data: {
					status: dto.status,
					appointmentDate: null,
				},
			})

		newquery = await this.prisma.visitQuery.update({
			where: { id },
			data: {
				status: dto.status,
				appointmentDate: dto.appointmentDate,
			},
		})

		this.visitQueryGateway.sendUpdatedVisitQuery(newquery)

		return newquery
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
