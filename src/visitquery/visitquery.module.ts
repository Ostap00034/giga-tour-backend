import { Module } from '@nestjs/common'
import { VisitqueryService } from './visitquery.service'
import { VisitqueryController } from './visitquery.controller'
import { PrismaService } from 'src/prisma.service'

@Module({
	controllers: [VisitqueryController],
	providers: [VisitqueryService, PrismaService],
})
export class VisitqueryModule {}
