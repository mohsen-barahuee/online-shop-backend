import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGaurd } from './auth/gaurd/jwt-auth.gaurd';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalGuards(new JwtAuthGaurd()); //useing gaurd for all routes
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
