import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { UserService } from './user.service';

@WebSocketGateway({ namespace: 'user' })
export class UserGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private userService: UserService) {}

  async handleConnection(socket: Socket) {
    if (socket.request?.user?.id) {
      const { id } = socket.request.user;

      await this.userService.updateIsOnline(id, true);
      await this.userService.updateLastVisitedAt(id, new Date());
    }
  }

  async handleDisconnect(socket: Socket) {
    if (socket.request?.user?.id) await this.userService.updateIsOnline(socket.request.user.id, false);
  }
}
