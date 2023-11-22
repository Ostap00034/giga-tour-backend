import { Module } from '@nestjs/common'
import { IntershipqueryService } from './intershipquery.service'
import { IntershipqueryController } from './intershipquery.controller'
import { PrismaService } from 'src/prisma.service'

@Module({
	controllers: [IntershipqueryController],
	providers: [IntershipqueryService, PrismaService],
})
export class IntershipqueryModule {}
