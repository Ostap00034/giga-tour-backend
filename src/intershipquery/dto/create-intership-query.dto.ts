import { IsString } from 'class-validator'

export class CreateInstershipQueryDto {
	@IsString()
	fio: string

	@IsString()
	to: string

	@IsString()
	phoneNumber: string

	@IsString()
	activity: string

	@IsString()
	skills: string
}
