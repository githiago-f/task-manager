import { ClassSerializerInterceptor, Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import swagger from './app/config/swagger';
import { NestFactory, Reflector } from '@nestjs/core';
import { ConfigType } from '@nestjs/config';
import serverConfig, { httpsOptionsFactory } from './app/config/server-config';
import { serializationInterceptor, validationPipe } from './app/config/validation-config';

type ConfigService = ConfigType<typeof serverConfig>;
async function bootstrap() {
  const httpsOptions = httpsOptionsFactory();
  const app = await NestFactory.create(AppModule, { 
    httpsOptions
  });
  const config = app.get<ConfigService>(serverConfig.KEY);
  swagger(config.swaggerPath, app);

  app.useGlobalPipes(validationPipe());
  app.useGlobalInterceptors(serializationInterceptor(app.get(Reflector)));

  const port = httpsOptions ? config.sslPort : config.appPort;
  app.enableCors({ origin: '*' });
  app.listen(port, () => {
    const protocol = httpsOptions?'https':'http';
    const message = `Server listening on port ${port} throug ${protocol}`;
    Logger.log(message, 'NestApplication');
  });
}
bootstrap();
