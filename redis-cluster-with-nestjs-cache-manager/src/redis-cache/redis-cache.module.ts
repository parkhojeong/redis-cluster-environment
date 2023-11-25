import {Global, Module} from '@nestjs/common';
import redisStore from 'cache-manager-redis-store';
import { RedisCacheService } from './redis-cache.service';
import { CacheModule } from '@nestjs/cache-manager';

@Global()
@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: '127.0.0.1',
      port: 6379,
    }),
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}
