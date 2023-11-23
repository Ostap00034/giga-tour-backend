import {
	Controller,
	Post,
	Get,
	Param,
	UsePipes,
	ValidationPipe,
	HttpCode,
	Body,
	Put,
} from '@nestjs/common'
import { ResidentService } from './resident.service'
import { Auth } from 'src/auth/decorator/auth.decorator'
import { CreateResidentDto } from './dto/create-resident-dto'
import { UpdateResidentDto } from './dto/update-resident.dto'

@Controller('resident')
export class ResidentController {
	constructor(private readonly residentService: ResidentService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Post()
	async create(@Body() dto: CreateResidentDto) {
		return this.residentService.create(dto)
	}

	@Auth()
	@Put(':id')
	async update(@Param('id') id: string, @Body() dto: UpdateResidentDto) {
		return this.residentService.update(+id, dto)
	}

	@Get()
	async getAll() {
		return this.residentService.getAll()
	}

	@Get(':id')
	async getById(@Param('id') id: string) {
		return this.residentService.getById(+id)
	}
}
