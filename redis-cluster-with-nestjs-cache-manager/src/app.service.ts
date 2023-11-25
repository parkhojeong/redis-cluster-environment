import { Injectable } from '@nestjs/common';
import {RedisCacheService} from "src/redis-cache/redis-cache.service";

@Injectable()
export class AppService {
  constructor(private redisCacheService: RedisCacheService) {
  }
  async getHello(){

    console.log(await this.redisCacheService.get('key'));
    await this.redisCacheService.set('key', 'value');
  }
}
