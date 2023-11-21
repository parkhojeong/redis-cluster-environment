import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Redis from "ioredis";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const cluster = new Redis.Cluster([
    {
      port: 7001,
      host: "127.0.0.1"
    }
  ]);

  console.log(await cluster.get("c"));
  await cluster.set("c", "123");


  await app.listen(3000);
}
bootstrap();
