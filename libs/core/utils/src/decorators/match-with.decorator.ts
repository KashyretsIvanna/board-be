import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

export function MatchWith<T extends object = Record<string, unknown>>(
  property: keyof T,
  validationOptions: ValidationOptions = {}
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (object: any, propertyName: string) => {
    validationOptions.message = validationOptions.message
      ? validationOptions.message
      : `${propertyName} should match with ${property.toString()}`;

    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MatchConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'MatchWith' })
class MatchConstraint implements ValidatorConstraintInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const relatedValue = (args.object as any)[relatedPropertyName];

    return value === relatedValue;
  }
}
