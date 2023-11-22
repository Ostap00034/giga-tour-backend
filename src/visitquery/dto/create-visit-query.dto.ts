import { IsString } from 'class-validator'

export class CreateVisitQueryDto {
	@IsString()
	fio: string

	@IsString()
	to: string

	@IsString()
	phoneNumber: string

	@IsString()
	activity: string
}
