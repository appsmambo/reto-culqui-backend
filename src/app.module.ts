import { Module } from '@nestjs/common';
import { TokensModule } from './tokens/tokens.module';

@Module({
  imports: [TokensModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
