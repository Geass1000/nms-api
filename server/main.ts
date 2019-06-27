import { Transport } from '@nestjs/microservices';
import { NestFactory, } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { environment } from './environments/environment';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.NATS,
    options: {
      url: environment.natsUrl,
    },
  });

  await app.listen(() => {
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
