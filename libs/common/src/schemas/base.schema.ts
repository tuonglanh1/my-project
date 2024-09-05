import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from "../user/schema/user.schema";

export class Base {
  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;

  @Prop({type:String, default:'admin'})
  created_by: string;
  //
  @Prop({type:String})
  updated_by: User['updated_by'];

  @Prop({
    type: Number,
  })
  __v: number;
}
