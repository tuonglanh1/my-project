import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UserDto {

  @ApiProperty({
    description: 'User phone number',
    required: true,
    example: '0912222333',
  })
  @IsNotEmpty()
  phone: string;

  @Exclude()
  password: string;

  @Exclude()
  salt: string;

  @ApiProperty({
    description: 'User is active or not',
    required: false,
    example: false,
    default: false,
  })
  @IsOptional()
  isActive: boolean;

  // @ApiProperty({
  //   description: 'Created at',
  //   required: true,
  //   example: '2020-12-10T07:10:05.949Z',
  // })
  // @IsNotEmpty()
  // created_at: Date;
  //
  // @ApiProperty({
  //   description: 'Updated at',
  //   required: true,
  //   example: '2020-12-10T07:10:05.949Z',
  // })
  // @IsNotEmpty()
  // updated_at: Date;

  @ApiProperty({
    description: 'Created by',
    required: true,
    example: '0912222333',
  })

  created_by: string;

  @ApiProperty({
    description: 'Updated by',
    required: true,
    example: '0912222333',
  })

  updated_by: string;

  @ApiProperty({
    description: 'name',
    example: 'ADMIN',
  })
  @IsOptional()
  name: string;

  @IsString()
  group_id: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  gender:string;

  @IsOptional()
  nickname: string;

  @IsOptional()
  social_avatar: string;

  @IsOptional()
  social_avatar_original: string;

  @IsOptional()
  status: string;

  @IsOptional()
  birthday: Date;
}
