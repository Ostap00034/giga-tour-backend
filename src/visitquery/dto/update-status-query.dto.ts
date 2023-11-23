import { IsDate, IsOptional, IsString } from 'class-validator'

export class UpdateVisitQueryStatus {
	@IsString()
	status: string

	@IsOptional()
	@IsDate()
	date: Date
}
