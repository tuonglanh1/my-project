import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { Document } from 'mongoose';
import { UserDto } from '../dto/user.dto';
import { transform } from "../../libs/mongoose-transformer";

export const COLLECTION_NAME = 'users';
export type UserDocument = User & Document;
import { COLLECTION_NAME as GROUP_COLLECTION } from '../../user-groups/schema/user-group.schema';


@Schema({
  collection: COLLECTION_NAME,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  optimisticConcurrency: true,
  toObject: {
    transform: transform(UserDto),
  },
})
export class User {

  @Prop({ unique: true })
  phone: string;

  @Prop()
  password: string;

  @Prop()
  salt: string;

  @Prop()
  isActive: boolean;

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;

  @Prop({type:String, default:'admin'})
  created_by: string;

  @Prop({type:String, default:'admin'})
  updated_by: string;

  @Prop()
  name: string;

  @Prop({ref:GROUP_COLLECTION})
  group_id: string;

  @Prop()
  email:string;

  @Prop()
  gender: string;

  @Prop()
  nickname:string;

  @Prop()
  social_avatar:string;

  @Prop()
  social_avatar_original:string;

  @Prop()
  birthday: string

}

export const UserSchema = SchemaFactory.createForClass(User);
