import { BadRequestException } from '@nestjs/common';

import { TokensController } from './tokens.controller';
import { TokensService } from './tokens.service';

import { ICreateCard } from './interfaces/create-card.interface';
import { CreateCardDto } from './dto/create-card.dto';
import { ICard } from './interfaces/card.interface';
import { DynamoDBService } from '../dynamo-db/dynamo-db.service';

describe('TokensController', () => {
  let tokensController: TokensController;
  let tokensService: TokensService;
  let dynamoDBService: DynamoDBService;

  beforeEach(() => {
    tokensService = new TokensService(dynamoDBService);
    tokensController = new TokensController(tokensService);
  });

  const body: CreateCardDto = {
    email: 'name@gmail.com',
    card_number: 4111111111111111,
    cvv: 123,
    expiration_month: '09',
    expiration_year: '2025',
  };
  describe('Crear Token', () => {
    it('Creación Exitosa', async () => {
      const result: ICreateCard = {
        email: 'name@gmail.com',
        card_number: 4111111111111111,
        expiration_month: '09',
        expiration_year: '2025',
        token: 'vGTaR1bNnb2CuttH',
      };
      jest
        .spyOn(tokensService, 'createToken')
        .mockImplementation(() => Promise.resolve(result));

      expect(await tokensController.createToken(body)).toBe(result);
    });
    it('Error: No se pudo crear Token', async () => {
      const message = 'No se pudo crear Token';
      jest.spyOn(tokensService, 'createToken').mockImplementation(() => {
        throw new BadRequestException(message);
      });

      await expect(tokensController.createToken(body)).rejects.toThrowError(
        message,
      );
    });
  });

  describe('Traer datos de tarjeta', () => {
    const token = 'vGTaR1bNnb2CuttH';
    it('Creación Exitosa', async () => {
      const result: ICard = {
        card_number: 4111111111111111,
        expiration_month: '09',
        expiration_year: '2025',
        email: 'name@gmail.com',
        token,
        created_at: '2021-01-01T00:00:00.000Z',
        expired_at: '2022-01-01T00:00:00.000Z',
      };
      jest
        .spyOn(tokensService, 'getCardByToken')
        .mockImplementation(() => Promise.resolve(result));

      expect(await tokensController.getCardByToken(token)).toBe(result);
    });
    it('Error: No se traer datos', async () => {
      const message = 'No se pudo obtener datos de la DB.';
      jest.spyOn(tokensService, 'getCardByToken').mockImplementation(() => {
        throw new BadRequestException(message);
      });

      await expect(tokensController.getCardByToken(token)).rejects.toThrowError(
        message,
      );
    });
  });
});
