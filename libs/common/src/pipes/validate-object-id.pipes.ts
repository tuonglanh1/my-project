import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as mongoose from 'mongoose';

@Injectable()
export class ValidateObjectIdPipe implements PipeTransform<string> {
  constructor() {}

  async transform(value: string, metadata: ArgumentMetadata) {
    const isValid = mongoose.Types.ObjectId.isValid(value);
    if (!isValid)
      throw new HttpException(
        'Id sai format hoặc không tồn tại.',
        HttpStatus.BAD_REQUEST,
      );
    return value;
  }
}
