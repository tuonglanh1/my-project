import { CrudService } from '@app/common/services/base.service';
import { Injectable } from '@nestjs/common';
import {
  COLLECTION_NAME,
  UserDocument,
} from 'apps/portal-service/src/modules/user/schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService extends CrudService<UserDocument>(COLLECTION_NAME) {
  constructor(private readonly model: Model<UserDocument>) {
    super(model);
  }
}
