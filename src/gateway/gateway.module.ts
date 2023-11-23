import { Module } from '@nestjs/common'
import { VisitQueryGateway } from './visitquery.gateway'
import { IntershipQueryGateway } from './intership.gateway'

@Module({
	providers: [VisitQueryGateway, IntershipQueryGateway],
	exports: [VisitQueryGateway, IntershipQueryGateway],
})
export class GatewayModule {}
