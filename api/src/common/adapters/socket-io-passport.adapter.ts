import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server } from 'socket.io';
import * as redisIoAdapter from 'socket.io-redis';

export class SocketIoSessionRedisPassportAdapter extends IoAdapter {
  constructor(private app: INestApplication, private sessionMiddleware, private passport) {
    super(app);
  }

  private wrap = middleware => (socket, next) => middleware(socket.request, {}, next);

  public createIOServer(port: number, options?) {
    const server: Server = super.createIOServer(port, options);
    const configService = this.app.get(ConfigService);
    const redis = configService.get('socketIo.redis');
    const redisAdapter = redisIoAdapter({ host: redis.host, port: redis.port });
    const { sessionMiddleware } = this;

    server.use(this.wrap(sessionMiddleware));
    server.use(this.wrap(this.passport.initialize()));
    server.use(this.wrap(this.passport.session()));
    server.adapter(redisAdapter);
    return server;
  }
}
