import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';

import { TokensService } from './tokens.service';
import { ICreateCard } from './interfaces/create-card.interface';
import { CreateCardDto } from './dto/create-card.dto';
import { ICard } from './interfaces/card.interface';
import { DynamoDBService } from '../dynamo-db/dynamo-db.service';
import * as randToken from 'rand-token'; // Importa la biblioteca para generar tokens aleatorios

describe('TokensService', () => {
  let tokensService: TokensService;
  let dynamoDBService: DynamoDBService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokensService, DynamoDBService],
    }).compile();

    tokensService = module.get<TokensService>(TokensService);
    dynamoDBService = module.get<DynamoDBService>(DynamoDBService);
  });

  const body: CreateCardDto = {
    email: 'name@gmail.com',
    card_number: 4111111111111111,
    cvv: 123,
    expiration_month: '09',
    expiration_year: '2025',
  };

  const token = 'p8lBCIhxrBVfSn73';

  // Simulamos la generación de un token aleatorio
  jest.spyOn(randToken, 'uid').mockReturnValue(token);

  // Simulamos la gestión de fechas
  describe('Crear Token', () => {
    it('Creación Exitosa', async () => {
      const result: ICreateCard = {
        email: 'name@gmail.com',
        card_number: 4111111111111111,
        expiration_month: '09',
        expiration_year: '2025',
        token,
      };
      jest
        .spyOn(dynamoDBService, 'put')
        .mockImplementation(() => Promise.resolve(null));
      expect(await tokensService.createToken(body)).toEqual(
        expect.objectContaining(result),
      );
    });

    it('Error: No se pudo crear Token', async () => {
      const message = 'No se pudo crear Token';
      jest.spyOn(dynamoDBService, 'put').mockImplementation(() => {
        throw new BadRequestException(message);
      });

      await expect(tokensService.createToken(body)).rejects.toThrowError(
        message,
      );
    });
  });

  describe('Traer datos de tarjeta', () => {
    it('Creación Exitosa', async () => {
      const result = {
        card_number: 4111111111111111,
        expiration_month: '09',
        expiration_year: '2025',
        email: 'name@gmail.com',
        token,
      };
      jest.spyOn(dynamoDBService, 'get').mockResolvedValue(result);

      expect(await tokensService.getCardByToken(token)).toEqual(
        expect.objectContaining(result),
      );
    });

    it('Error: no existe datos', async () => {
      jest.spyOn(dynamoDBService, 'get').mockResolvedValue(null);

      await expect(tokensService.getCardByToken(token)).rejects.toThrowError(
        'No se encontraron los datos de la tarjeta.',
      );
    });

    it('Creación Exitosa', async () => {
      const message = 'No se pudo obtener datos de la DB.';
      jest.spyOn(dynamoDBService, 'get').mockImplementation(() => {
        throw new BadRequestException(message);
      });

      await expect(tokensService.getCardByToken(token)).rejects.toThrowError(message);
    });
  });
});
