import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { UserDto } from '../user/dto/user.dto';

export class BaseDto {
  // @ApiProperty({
  //   description: 'Dummy field for compatibility with front end',
  //   required: true,
  //   example: 12345678,
  // })
  // @IsOptional()
  // @IsNumber()
  // @Exclude()
  // id: number;

  @ApiProperty({
    description: 'Created at',
    required: true,
    example: '2020-12-10T07:10:05.949Z',
  })
  @IsNotEmpty()
  created_at: Date;

  @ApiProperty({
    description: 'Updated at',
    required: true,
    example: '2020-12-10T07:10:05.949Z',
  })
  @IsNotEmpty()
  updated_at: Date;

  @ApiProperty({
    description: 'Created by',
    required: true,
  })
  @IsNotEmpty()
  @Type(() => UserDto)
  created_by: UserDto;

  @ApiProperty({
    description: 'Updated by',
    required: true,
  })
  @IsNotEmpty()
  @Type(() => UserDto)
  updated_by: UserDto;

  @ApiProperty({
    description: 'Version',
    required: true,
    example: 1,
  })
  @IsNotEmpty()
  __v: number;
}
