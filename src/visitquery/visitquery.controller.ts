import {
	Body,
	Controller,
	Get,
	HttpCode,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { VisitqueryService } from './visitquery.service'
import { CreateVisitQueryDto } from './dto/create-visit-query.dto'
import { Auth } from 'src/auth/decorator/auth.decorator'

@Controller('visitquery')
export class VisitqueryController {
	constructor(private readonly visitqueryService: VisitqueryService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	async create(@Body() dto: CreateVisitQueryDto) {
		return this.visitqueryService.create(dto)
	}

	@Get()
	// @Auth()
	async getAll() {
		return this.visitqueryService.getAll()
	}
}
