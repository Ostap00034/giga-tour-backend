import { Module } from '@nestjs/common'
import { IntershipqueryService } from './intershipquery.service'
import { IntershipqueryController } from './intershipquery.controller'
import { PrismaService } from 'src/prisma.service'
import { IntershipQueryGateway } from 'src/gateway/intership.gateway'

@Module({
	controllers: [IntershipqueryController],
	providers: [IntershipqueryService, PrismaService, IntershipQueryGateway],
})
export class IntershipqueryModule {}
