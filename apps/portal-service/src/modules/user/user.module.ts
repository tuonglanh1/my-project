import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { COLLECTION_NAME, User, UserSchema } from './schema/user.schema';
import { UserService } from '../../providers/user.service';
import { UserController } from "./user.controller";
import { UserPagesModule } from "../user-pages/user-pages.module";
import { UserModulesModule } from "../user-modules/user-modules.module";
import { UserRolesModule } from "../user-roles/user-roles.module";
import { UserActionsModule } from "../user-actions/user-actions.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: COLLECTION_NAME, schema: UserSchema }]),
    UserPagesModule, UserModulesModule , UserRolesModule, UserActionsModule
  ],
  controllers:[UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
