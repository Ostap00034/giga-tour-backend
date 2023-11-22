import {
	Body,
	Controller,
	Get,
	HttpCode,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { IntershipqueryService } from './intershipquery.service'
import { CreateInstershipQueryDto } from './dto/create-intership-query.dto'
import { Auth } from 'src/auth/decorator/auth.decorator'

@Controller('intershipquery')
export class IntershipqueryController {
	constructor(private readonly intershipqueryService: IntershipqueryService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	async create(@Body() dto: CreateInstershipQueryDto) {
		return this.intershipqueryService.create(dto)
	}

	@Get()
	@Auth()
	async getAll() {
		return this.intershipqueryService.getAll()
	}
}
