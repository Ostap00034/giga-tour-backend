import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateInstershipQueryDto } from './dto/create-intership-query.dto'
import { UpdateIntershipQueryStatus } from './dto/update-status-query.dto'
import { IntershipQueryGateway } from 'src/gateway/intership.gateway'

@Injectable()
export class IntershipqueryService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly intershipQueryGateway: IntershipQueryGateway
	) {}

	async create(dto: CreateInstershipQueryDto) {
		const newquery = await this.prisma.intershipQuery.create({ data: dto })

		this.intershipQueryGateway.sendCreateIntershipQuery(newquery)

		return newquery
	}

	async updateStatus(id: number, dto: UpdateIntershipQueryStatus) {
		const intershipquery = await this.getById(id)

		let newquery

		if (dto.status === 'Reject')
			newquery = await this.prisma.intershipQuery.update({
				where: { id },
				data: {
					status: dto.status,
					appointmentDate: null,
				},
			})

		newquery = await this.prisma.intershipQuery.update({
			where: { id },
			data: {
				status: dto.status,
				appointmentDate: dto.appointmentDate,
			},
		})

		this.intershipQueryGateway.sendUpdatedIntershipQuery(newquery)

		return newquery
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
