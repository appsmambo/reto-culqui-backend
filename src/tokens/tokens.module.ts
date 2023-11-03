import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { TokensController } from './tokens.controller';
import { DynamoDBModule } from '../dynamo-db/dynamo-db.module';

@Module({
  imports: [DynamoDBModule],
  providers: [TokensService],
  controllers: [TokensController],
})
export class TokensModule {}
