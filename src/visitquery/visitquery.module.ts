import { Module } from '@nestjs/common'
import { VisitqueryService } from './visitquery.service'
import { VisitqueryController } from './visitquery.controller'
import { PrismaService } from 'src/prisma.service'
import { VisitQueryGateway } from 'src/gateway/visitquery.gateway'

@Module({
	controllers: [VisitqueryController],
	providers: [VisitqueryService, PrismaService, VisitQueryGateway],
})
export class VisitqueryModule {}
