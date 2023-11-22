import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateInstershipQueryDto } from './dto/create-intership-query.dto'

@Injectable()
export class IntershipqueryService {
	constructor(private readonly prisma: PrismaService) {}

	async create(dto: CreateInstershipQueryDto) {
		return await this.prisma.intershipQuery.create({ data: dto })
	}

	async getAll() {
		return await this.prisma.intershipQuery.findMany({})
	}
}
