import { IsString } from 'class-validator'

export class UpdateVisitQueryStatus {
	@IsString()
	status: string
}
