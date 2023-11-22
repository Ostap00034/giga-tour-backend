import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
	NotFoundException,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { AuthDto } from './dto/auth.dto'
import { hash, verify } from 'argon2'
import { JwtService } from '@nestjs/jwt'
import { Admin } from '@prisma/client'
import { RefreshTokenDto } from './dto/refresh-token.dto'

@Injectable()
export class AuthService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly jwt: JwtService
	) {}

	async register(dto: AuthDto) {
		const { login, password } = dto
		const oldUser = await this.prisma.admin.findUnique({
			where: {
				login: dto.login,
			},
		})

		if (oldUser) throw new BadRequestException('Пользователь уже существует')

		const admin = await this.prisma.admin.create({
			data: {
				login: login,
				password: await hash(password),
			},
		})

		const tokens = await this.issueTokens(admin.id)

		return {
			admin: this.returnAdminFields(admin),
			...tokens,
		}
	}

	private returnAdminFields(admin: Partial<Admin>) {
		return {
			id: admin.id,
			login: admin.login,
		}
	}

	async getNewTokens(dto: RefreshTokenDto) {
		const result = await this.jwt.verifyAsync(dto.refreshToken)

		if (!result) throw new UnauthorizedException('Неверный refresh token')

		// const admin = await this.admin.getById(result.id)
		const admin = await this.prisma.admin.findUnique({
			where: {
				id: result.id,
			},
		})

		const tokens = await this.issueTokens(admin.id)

		return {
			admin: this.returnAdminFields(admin),
			...tokens,
		}
	}

	private async issueTokens(adminId: number) {
		const data = { id: adminId }

		const accessToken = this.jwt.sign(data, {
			expiresIn: '1h',
		})

		const refreshToken = this.jwt.sign(data, {
			expiresIn: '6d',
		})

		return { accessToken, refreshToken }
	}

	async login(dto: AuthDto) {
		const admin = await this.validateUser(dto)
		const tokens = await this.issueTokens(admin.id)

		return {
			admin: this.returnAdminFields(admin),
			...tokens,
		}
	}

	private async validateUser(dto: AuthDto) {
		const admin = await this.prisma.admin.findUnique({
			where: {
				login: dto.login,
			},
		})

		if (!admin) throw new NotFoundException('Пользователь не найден.')

		const isValid = await verify(admin.password, dto.password)

		if (!isValid) throw new UnauthorizedException('Неверный пароль.')

		return admin
	}
}
