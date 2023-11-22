import {
	Body,
	Controller,
	Get,
	Put,
	HttpCode,
	Param,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { VisitqueryService } from './visitquery.service'
import { CreateVisitQueryDto } from './dto/create-visit-query.dto'
import { Auth } from 'src/auth/decorator/auth.decorator'
import { UpdateVisitQueryStatus } from './dto/update-status-query.dto'

@Controller('visitquery')
export class VisitqueryController {
	constructor(private readonly visitqueryService: VisitqueryService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	async create(@Body() dto: CreateVisitQueryDto) {
		return this.visitqueryService.create(dto)
	}

	@Get(':id')
	async getById(@Param('id') id: string) {
		return this.visitqueryService.getById(+id)
	}

	@Auth()
	@UsePipes(new ValidationPipe())
	@Put(':id')
	async updateStatus(
		@Param('id') id: string,
		@Body() dto: UpdateVisitQueryStatus
	) {
		return this.visitqueryService.updateStatus(+id, dto)
	}

	@Get()
	@Auth()
	async getAll() {
		return this.visitqueryService.getAll()
	}
}
