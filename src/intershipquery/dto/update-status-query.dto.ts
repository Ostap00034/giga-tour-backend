import { IsString } from 'class-validator'

export class UpdateIntershipQueryStatus {
	@IsString()
	status: string
}
