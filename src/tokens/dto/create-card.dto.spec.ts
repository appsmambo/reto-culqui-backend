import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateCardDto } from './create-card.dto';

describe('Email', () => {
  it('Validacion: Email necesario', async () => {
    const data = {
      card_number: 4111111111111111,
      cvv: 123,
      expiration_month: '09',
      expiration_year: '2025',
    };
    const createCardDto = plainToInstance(CreateCardDto, data);
    const errors = await validate(createCardDto);
    expect(errors.length).toBe(1);
    expect(JSON.stringify(errors)).toContain('email es necesario');
  });

  it('Validacion: Email no válido', async () => {
    const data = {
      email: 'name@google.com',
      card_number: 4111111111111111,
      cvv: 123,
      expiration_month: '09',
      expiration_year: '2025',
    };
    const createCardDto = plainToInstance(CreateCardDto, data);
    const errors = await validate(createCardDto);
    expect(errors.length).toBe(1);
    expect(JSON.stringify(errors)).toContain(
      `email: ${data.email} no es válido. Solo válidos: gmail.com, hotmail.com y yahoo.es`,
    );
  });

  it('Validacion: Email tiene una longitud', async () => {
    const data = {
      email: 'gmai',
      card_number: 4111111111111111,
      cvv: 123,
      expiration_month: '09',
      expiration_year: '2025',
    };
    const createCardDto = plainToInstance(CreateCardDto, data);
    const errors = await validate(createCardDto);
    expect(errors.length).toBe(1);
    expect(JSON.stringify(errors)).toContain(
      `email: ${data.email} debe tener entre 5 y 100 caracteres`,
    );
  });
});

describe('Numero de Tarjeta', () => {
  it('Validacion: Numero de Tarjeta necesario', async () => {
    const data = {
      email: 'name@gmail.com',
      cvv: 123,
      expiration_month: '09',
      expiration_year: '2025',
    };
    const createCardDto = plainToInstance(CreateCardDto, data);
    const errors = await validate(createCardDto);
    expect(errors.length).toBe(1);
    expect(JSON.stringify(errors)).toContain('card_number es necesario');
  });

  it('Validacion: Numero de Tarjeta debe ser de tipo numérico', async () => {
    const data = {
      email: 'name@gmail.com',
      card_number: '4111111111111111',
      cvv: 123,
      expiration_month: '09',
      expiration_year: '2025',
    };
    const createCardDto = plainToInstance(CreateCardDto, data);
    const errors = await validate(createCardDto);
    expect(errors.length).toBe(1);
    expect(JSON.stringify(errors)).toContain(
      'card_number debe ser de tipo numérico',
    );
  });

  it('Validacion: Numero de Tarjeta tiene una longitud', async () => {
    const data = {
      email: 'name@gmail.com',
      card_number: 42,
      cvv: 123,
      expiration_month: '09',
      expiration_year: '2025',
    };
    const createCardDto = plainToInstance(CreateCardDto, data);
    const errors = await validate(createCardDto);
    expect(errors.length).toBe(1);
    expect(JSON.stringify(errors)).toContain(
      `card_number: ${data.card_number} debe tener entre 13 y 16 caracteres`,
    );
  });

  it('Validacion: Numero de Tarjeta validado con LUHN', async () => {
    const data = {
      email: 'name@gmail.com',
      card_number: 4213550212527360,
      cvv: 123,
      expiration_month: '09',
      expiration_year: '2025',
    };
    const createCardDto = plainToInstance(CreateCardDto, data);
    const errors = await validate(createCardDto);
    expect(errors.length).toBe(1);
    expect(JSON.stringify(errors)).toContain(
      `card_number: ${data.card_number} no es válido`,
    );
  });
});

describe('CVV', () => {
  it('Validacion: CVV es necesario', async () => {
    const data = {
      email: 'name@gmail.com',
      card_number: 4111111111111111,
      expiration_month: '09',
      expiration_year: '2025',
    };
    const createCardDto = plainToInstance(CreateCardDto, data);
    const errors = await validate(createCardDto);
    expect(errors.length).toBe(1);
    expect(JSON.stringify(errors)).toContain('cvv es necesario');
  });

  it('Validacion: CVV debe ser un numero', async () => {
    const data = {
      email: 'name@gmail.com',
      cvv: '1234',
      card_number: 4111111111111111,
      expiration_month: '09',
      expiration_year: '2025',
    };
    const createCardDto = plainToInstance(CreateCardDto, data);
    const errors = await validate(createCardDto);
    expect(errors.length).toBe(1);
    expect(JSON.stringify(errors)).toContain(`cvv debe ser de tipo numérico`);
  });

  it('Validacion: CVV tiene una logitud', async () => {
    const data = {
      email: 'name@gmail.com',
      cvv: 1,
      card_number: 4111111111111111,
      expiration_month: '09',
      expiration_year: '2025',
    };
    const createCardDto = plainToInstance(CreateCardDto, data);
    const errors = await validate(createCardDto);
    expect(errors.length).toBe(1);
    expect(JSON.stringify(errors)).toContain(
      `cvv: ${data.cvv} debe tener entre 3 y 4 caracteres`,
    );
  });
});

describe('Mes de Expiración', () => {
  it('Validacion: Mes de Expiración es neceario', async () => {
    const data = {
      email: 'name@gmail.com',
      cvv: 1234,
      card_number: 4111111111111111,
      expiration_year: '2025',
    };
    const createCardDto = plainToInstance(CreateCardDto, data);
    const errors = await validate(createCardDto);
    expect(errors.length).toBe(1);
    expect(JSON.stringify(errors)).toContain(`expiration_month es necesario`);
  });

  it('Validacion: Mes de Expiración debe ser una cadena', async () => {
    const data = {
      email: 'name@gmail.com',
      cvv: 1234,
      card_number: 4111111111111111,
      expiration_month: 1,
      expiration_year: '2025',
    };
    const createCardDto = plainToInstance(CreateCardDto, data);
    const errors = await validate(createCardDto);
    expect(errors.length).toBe(1);
    expect(JSON.stringify(errors)).toContain(
      `expiration_month debe ser de tipo cadena`,
    );
  });

  it('Validacion: Mes de Expiración tiene una logitud', async () => {
    const data = {
      email: 'name@gmail.com',
      cvv: 1234,
      card_number: 4111111111111111,
      expiration_month: '132',
      expiration_year: '2025',
    };
    const createCardDto = plainToInstance(CreateCardDto, data);
    const errors = await validate(createCardDto);
    expect(errors.length).toBe(1);
    expect(JSON.stringify(errors)).toContain(
      `expiration_month: ${data.expiration_month} debe tener entre 1 y 2 caracteres`,
    );
    expect(JSON.stringify(errors)).toContain(
      `expiration_month: ${data.expiration_month} debe estar entre 1 y 12.`,
    );
  });
});

describe('Año de Expiración', () => {
  it('Validacion: Año de Expiración es necesario', async () => {
    const data = {
      email: 'name@gmail.com',
      cvv: 1234,
      card_number: 4111111111111111,
      expiration_month: '09',
    };
    const createCardDto = plainToInstance(CreateCardDto, data);
    const errors = await validate(createCardDto);
    expect(errors.length).toBe(1);
    expect(JSON.stringify(errors)).toContain(`expiration_year es necesario`);
  });

  it('Validacion: Año de Expiración debe ser una cadena', async () => {
    const data = {
      email: 'name@gmail.com',
      cvv: 1234,
      card_number: 4111111111111111,
      expiration_year: 2025,
      expiration_month: '09',
    };
    const createCardDto = plainToInstance(CreateCardDto, data);
    const errors = await validate(createCardDto);
    expect(errors.length).toBe(1);
    expect(JSON.stringify(errors)).toContain(
      `expiration_year debe ser de tipo cadena`,
    );
  });

  it('Validacion: Año de Expiración tiene una longitud', async () => {
    const data = {
      email: 'name@gmail.com',
      cvv: 1234,
      card_number: 4111111111111111,
      expiration_year: '20251',
      expiration_month: '09',
    };
    const createCardDto = plainToInstance(CreateCardDto, data);
    const errors = await validate(createCardDto);
    expect(errors.length).toBe(1);
    expect(JSON.stringify(errors)).toContain(
      `expiration_year: ${data.expiration_year} debe tener 4 caracteres`,
    );
    expect(JSON.stringify(errors)).toContain(
      `expiration_year: ${data.expiration_year} no acorde al rango de años`,
    );
  });
});
