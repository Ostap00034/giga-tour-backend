import { IsArray, IsOptional, IsString } from 'class-validator'

export class UpdateResidentDto {
	@IsOptional()
	@IsString()
	name: string

	@IsOptional()
	@IsString()
	creator: string

	@IsOptional()
	@IsString()
	created: string

	@IsOptional()
	@IsString()
	info: string

	@IsOptional()
	@IsString()
	service: string

	@IsOptional()
	@IsString()
	fieldOfActivity: string

	@IsOptional()
	@IsArray()
	hotSpotArr: string[]

	@IsOptional()
	@IsString()
	scenePanoImg: string

	@IsOptional()
	@IsArray()
	init: string[]
}
