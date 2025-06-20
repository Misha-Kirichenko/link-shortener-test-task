/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsFutureDate(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isFutureDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions as ValidationOptions,
      validator: {
        validate(value: unknown): boolean {
          return (
            typeof value === 'string' && new Date(value).getTime() > Date.now()
          );
        },
        defaultMessage(args: ValidationArguments): string {
          const field =
            typeof args?.property === 'string' ? args.property : 'field';
          return `${field} must be a valid future date`;
        },
      },
    });
  };
}
