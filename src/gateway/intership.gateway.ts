import {
	MessageBody,
	OnGatewayDisconnect,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { CreateInstershipQueryDto } from 'src/intershipquery/dto/create-intership-query.dto'
import { UpdateIntershipQueryStatus } from 'src/intershipquery/dto/update-status-query.dto'

@WebSocketGateway(4201, {
	cors: {
		origin: '*',
		credentials: true,
		transports: ['websocket', 'polling'],
	},
})
export class IntershipQueryGateway implements OnGatewayDisconnect {
	@WebSocketServer()
	server: Server

	onModuleInit() {
		this.server.on('connect', socket => {
			console.log(socket.id)
			console.log('Подключились')
		})
	}

	@SubscribeMessage('create-i')
	sendCreateIntershipQuery(dto: CreateInstershipQueryDto) {
		console.log(dto)
		this.server.sockets.emit('create-i', dto)
	}

	@SubscribeMessage('update-i')
	sendUpdatedIntershipQuery(dto: UpdateIntershipQueryStatus) {
		this.server.sockets.emit('update-i', dto)
	}

	handleDisconnect(client: Socket) {
		console.log('Отключилис')
	}
}
