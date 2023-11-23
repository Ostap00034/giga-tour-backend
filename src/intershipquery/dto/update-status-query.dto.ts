import { IsDate, IsOptional, IsString } from 'class-validator'

export class UpdateIntershipQueryStatus {
	@IsString()
	status: string

	@IsOptional()
	@IsDate()
	appointmentDate: Date
}
