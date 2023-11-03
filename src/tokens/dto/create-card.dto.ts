import { IsNotEmpty, IsNumber, IsString, Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Import ApiProperty
import {
  EmailValidation,
  LengthValidation,
  LuhnValidation,
  MinMaxValidation,
  MinMaxYearValidation,
} from '../validations';

export class CreateCardDto {
  @Validate(LuhnValidation)
  @Validate(LengthValidation, [13, 16])
  @IsNumber(
    {},
    { message: (args) => `${args.property} debe ser de tipo numérico` },
  )
  @IsNotEmpty({ message: (args) => `${args.property} es necesario` })
  @ApiProperty({ example: 4111111111111111 })
  card_number: number;

  @Validate(LengthValidation, [3, 4])
  @IsNumber(
    {},
    { message: (args) => `${args.property} debe ser de tipo numérico` },
  )
  @IsNotEmpty({ message: (args) => `${args.property} es necesario` })
  @ApiProperty({ example: 123 })
  cvv: number;

  @Validate(MinMaxValidation, [1, 12])
  @Validate(LengthValidation, [1, 2])
  @IsString({ message: (args) => `${args.property} debe ser de tipo cadena` })
  @IsNotEmpty({ message: (args) => `${args.property} es necesario` })
  @ApiProperty({ example: '2' })
  expiration_month: string;

  @Validate(MinMaxYearValidation)
  @Validate(LengthValidation, [4, 4])
  @IsString({ message: (args) => `${args.property} debe ser de tipo cadena` })
  @IsNotEmpty({ message: (args) => `${args.property} es necesario` })
  @ApiProperty({ example: '2025' })
  expiration_year: string;

  @Validate(EmailValidation)
  @Validate(LengthValidation, [5, 100])
  @IsString({ message: (args) => `${args.property} debe ser de tipo cadena` })
  @IsNotEmpty({ message: (args) => `${args.property} es necesario` })
  @ApiProperty({ example: 'name@gmail.com' })
  email: string;
}
