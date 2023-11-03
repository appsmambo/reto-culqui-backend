import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';

const convertNumber = (num: number): number =>
  num > 9 ? Number(String(num)[0]) + Number(String(num)[1]) : num;

const isValidWithLuhn = (num: number): boolean => {
  const parseNumber = (num: string) => Number(num);
  const arrNum = Array.from(String(num), parseNumber).reverse();
  let sum = 0;
  arrNum.forEach((item, index) => {
    if (index % 2 === 1) sum += convertNumber(item * 2);
    else sum += item;
  });
  return sum % 10 === 0 && sum !== 0;
};

@ValidatorConstraint({ name: 'Luhn' })
@Injectable()
export class LuhnValidation implements ValidatorConstraintInterface {
  validate(value: number) {
    return value && isValidWithLuhn(value);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property}${
      args.value ? ': ' + args.value : ''
    } no es válido`;
  }
}
