import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Admin } from '@prisma/client'

export const CurrentUser = createParamDecorator(
	(data: keyof Admin, context: ExecutionContext) => {
		const request = context.switchToHttp().getRequest()
		const admin = request.admin

		return data ? admin[data] : admin
	}
)
