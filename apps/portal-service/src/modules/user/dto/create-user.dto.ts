import { OmitType } from '@nestjs/swagger';
import { CREATE_EXCLUDED_FIELDS } from "../../dto/create-excluded-fields";
import { UserDto } from "./user.dto";

export class CreateUserDto extends OmitType(
  UserDto,
  CREATE_EXCLUDED_FIELDS as any,
) {}
