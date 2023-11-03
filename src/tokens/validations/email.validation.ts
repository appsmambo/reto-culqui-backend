import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'Email' })
@Injectable()
export class EmailValidation implements ValidatorConstraintInterface {
  validate(value: string) {
    return (
      value &&
      typeof value === 'string' &&
      (value.includes('gmail.com') ||
        value.includes('hotmail.com') ||
        value.includes('yahoo.es'))
    );
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property}${
      args.value ? ': ' + args.value : ''
    } no es válido. Solo válidos: gmail.com, hotmail.com y yahoo.es`;
  }
}
