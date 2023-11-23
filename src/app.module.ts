import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { PrismaService } from './prisma.service'
import { ConfigModule } from '@nestjs/config'
import { AdminModule } from './admin/admin.module';
import { VisitqueryModule } from './visitquery/visitquery.module';
import { IntershipqueryModule } from './intershipquery/intershipquery.module';
import { ResidentModule } from './resident/resident.module';
import { GatewayModule } from './gateway/gateway.module';

@Module({
	imports: [ConfigModule.forRoot(), AuthModule, AdminModule, VisitqueryModule, IntershipqueryModule, ResidentModule, GatewayModule],
	controllers: [AppController],
	providers: [AppService, PrismaService],
})
export class AppModule {}
