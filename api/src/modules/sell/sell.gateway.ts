import { OnGatewayConnection, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SellItemEntity } from './sell-item.entity';
import { SellEntity } from './sell.entity';

@WebSocketGateway({ namespace: 'sell' })
export class SellGateway implements OnGatewayConnection {
  @WebSocketServer()
  private server: Server;

  public handleConnection(socket: Socket) {
    if (socket.request?.user?.id) {
      socket.join(socket.request.user.id.toString());
    } else {
      socket.disconnect();
    }
  }

  public sellStatusChanged(userId: string, sell: Partial<SellEntity>) {
    this.server.to(userId).emit('sell-status-changed', { ...sell });
  }

  public sellingRightNow(items: SellItemEntity[]) {
    this.server.emit('selling-right-now', { items });
  }
}
