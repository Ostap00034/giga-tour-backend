import {
	MessageBody,
	OnGatewayDisconnect,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { CreateVisitQueryDto } from 'src/visitquery/dto/create-visit-query.dto'
import { UpdateVisitQueryStatus } from 'src/visitquery/dto/update-status-query.dto'

@WebSocketGateway(4201, {
	cors: {
		origin: ['https://eye-walk.ru', 'http://localhost:3000'],
		credentials: true,
		transports: ['websocket', 'polling'],
	},
})
export class VisitQueryGateway implements OnGatewayDisconnect {
	@WebSocketServer()
	server: Server

	onModuleInit() {
		this.server.on('connect', socket => {
			console.log(socket.id)
			console.log('Подключились')
		})
	}

	@SubscribeMessage('create-v')
	sendCreateVisitQuery(dto: CreateVisitQueryDto) {
		console.log(dto)
		this.server.sockets.emit('create-v', dto)
	}

	@SubscribeMessage('update-v')
	sendUpdatedVisitQuery(dto: UpdateVisitQueryStatus) {
		this.server.sockets.emit('update-v', dto)
	}

	handleDisconnect(client: Socket) {
		console.log('Отключилис')
	}
}
