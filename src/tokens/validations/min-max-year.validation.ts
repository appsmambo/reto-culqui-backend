import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'MinMaxYear' })
@Injectable()
export class MinMaxYearValidation implements ValidatorConstraintInterface {
  validate(value: number | string, args: ValidationArguments) {
    const dateNow = new Date();
    const year = dateNow.getFullYear();
    args.constraints = [year];
    return (
      value &&
      !!Number(value) &&
      Number(value) >= year &&
      Number(value) < year + 5
    );
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property}${
      args.value ? ': ' + args.value : ''
    } no acorde al rango de años`;
  }
}
