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
import { IntershipqueryService } from './intershipquery.service'
import { CreateInstershipQueryDto } from './dto/create-intership-query.dto'
import { Auth } from 'src/auth/decorator/auth.decorator'
import { UpdateIntershipQueryStatus } from './dto/update-status-query.dto'

@Controller('intershipquery')
export class IntershipqueryController {
	constructor(private readonly intershipqueryService: IntershipqueryService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	async create(@Body() dto: CreateInstershipQueryDto) {
		return this.intershipqueryService.create(dto)
	}

	@Auth()
	@Put(':id')
	async updateStatus(
		@Param('id') id: string,
		@Body() dto: UpdateIntershipQueryStatus
	) {
		return this.intershipqueryService.updateStatus(+id, dto)
	}

	@Get(':id')
	@Auth()
	async getById(@Param('id') id: string) {
		return this.intershipqueryService.getById(+id)
	}

	@Get()
	@Auth()
	async getAll() {
		return this.intershipqueryService.getAll()
	}
}
