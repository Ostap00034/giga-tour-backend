import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateVisitQueryDto } from './dto/create-visit-query.dto'

@Injectable()
export class VisitqueryService {
	constructor(private readonly prisma: PrismaService) {}

	async create(dto: CreateVisitQueryDto) {
		return await this.prisma.visitQuery.create({ data: dto })
	}

	async getAll() {
		return await this.prisma.visitQuery.findMany({})
	}
}
