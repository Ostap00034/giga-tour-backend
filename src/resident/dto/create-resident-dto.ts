import { IsArray, IsString } from 'class-validator'

export class CreateResidentDto {
	@IsString()
	name: string

	@IsString()
	creator: string

	@IsString()
	created: string

	@IsString()
	info: string

	@IsString()
	service: string

	@IsString()
	fieldOfActivity: string

	@IsArray()
	hotSpotArr: string[]

	@IsString()
	scenePanoImg: string

	@IsArray()
	init: string[]
}
