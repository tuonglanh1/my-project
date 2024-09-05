import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { COLLECTION_NAME, UserSchema } from './schema/user.schema';
import { UserService } from '../../../../../libs/module/users/user.service';
import { UserController } from './user.controller';
import { CONNECTION_NAME } from '@app/common';

@Module({
  imports: [
    // MongooseModule.forFeature(
    //   [
    //     {
    //       name: COLLECTION_NAME,
    //       schema: UserSchema,
    //       collection: 'area_groups',
    //     },
    //   ],
    //   CONNECTION_NAME.PRIMARY,
    // ),
    MongooseModule.forFeature([{ name: COLLECTION_NAME, schema: UserSchema }]),
  ],

  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
