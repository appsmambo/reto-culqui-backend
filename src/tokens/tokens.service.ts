import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DynamoDBService } from '../dynamo-db/dynamo-db.service';
import { CreateCardDto } from './dto/create-card.dto';
import { ICreateCard } from './interfaces/create-card.interface';
import { uid } from 'rand-token';
import { ICard } from './interfaces/card.interface';

@Injectable()
export class TokensService {
  private readonly CardTable = 'CardTable';

  constructor(private readonly dynamoDBService: DynamoDBService) {}
  async createToken(createCardDto: CreateCardDto): Promise<ICreateCard> {
    try {
      const token = uid(16);
      const createdAt = new Date();
      const expiredAt = new Date(createdAt.getTime() + 15 * 60 * 1000);
      const data = {
        ...createCardDto,
        token,
        created_at: createdAt.toISOString(),
        expired_at: expiredAt.toISOString(),
      };
      const { cvv, ...responseData } = data;
      await this.dynamoDBService.put(this.CardTable, token, data);
      return responseData;
    } catch (e) {
      throw new BadRequestException(
        e.message ? e.message : 'No se pudo crear Token.',
      );
    }
  }

  async getCardByToken(token: string): Promise<ICard> {
    try {
      const now = new Date();
      const data = await this.dynamoDBService.get(this.CardTable, token);

      if (!data) {
        throw new NotFoundException(
          'No se encontraron los datos de la tarjeta.',
        );
      }

      const expiredAt = new Date(data.expired_at);
      if (now > expiredAt) {
        // Si la tarjeta ha expirado, elimina el registro de la base de datos
        await this.dynamoDBService.delete(this.CardTable, token);
        throw new NotFoundException('La tarjeta ha expirado.');
      }
      return <ICard>{
        token,
        card_number: data.card_number,
        email: data.email,
        expiration_month: data.expiration_month,
        expiration_year: data.expiration_year,
        created_at: data.created_at,
        expired_at: data.expired_at,
      };
    } catch (e) {
      throw new BadRequestException(
        e.message ? e.message : 'No se pudo obtener datos de la DB.',
      );
    }
  }
}
