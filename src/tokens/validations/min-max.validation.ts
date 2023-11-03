import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'MinMax' })
@Injectable()
export class MinMaxValidation implements ValidatorConstraintInterface {
  validate(value: number | string, args: ValidationArguments) {
    return (
      value &&
      !!Number(value) &&
      Number(value) >= args.constraints[0] &&
      Number(value) <= args.constraints[1]
    );
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property}${
      args.value ? ': ' + args.value : ''
    } debe estar entre ${args.constraints[0]} y ${args.constraints[1]}.`;
  }
}
