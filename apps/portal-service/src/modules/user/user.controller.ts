import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { CrudQueryPipe } from "../pipe/crud-query.pipe";
import { ICrudQuery } from "../interfaces/crud-request";
import { UserService } from "../../providers/user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserDto } from "./dto/user.dto";


@Controller('users')
export class UserController {
  constructor(private userService: UserService) {
  }

  @Get()
  async findAll(@Query(new CrudQueryPipe()) query: ICrudQuery) {
    return this.userService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id')id:string ) {
    return this.userService.findOne(id);
  }

  @Post()
  async create(@Body() createUserDto: UserDto){
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
