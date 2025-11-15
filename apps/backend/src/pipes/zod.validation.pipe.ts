import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ZodType } from 'zod';

export class ZodValidationPipe<T> implements PipeTransform {
  constructor(private schema: ZodType<T>) {}

  transform(value: T, metadata: ArgumentMetadata) {
    try {
      // const parsedValue = this.schema.parse(value);
      console.log(metadata, 'metadata');
      console.log(value, 'value');
      return value;
    } catch (error) {
      console.error(error, 'error');
      throw new BadRequestException(error.message);
    }
  }
}
