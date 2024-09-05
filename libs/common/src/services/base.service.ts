import { Document, Model } from 'mongoose';
import { Type } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ICrudQuery } from '@app/common/interfaces/crud-request';
import { IPagination } from '@app/common/paging/paginable';
import { NotFoundError } from '../errors/not-found.error';

export interface ICrudService<T> {
  create(createDto: any): Promise<T>;
  findAll(query: ICrudQuery): Promise<IPagination<any>>;
  findOne(id: string | number): Promise<T>;
  update(id: string | number, updateDto: any): Promise<T>;
  remove(id: string | number): Promise<T>;
}

export function CrudService<T extends Document>(
  modelToken: string,
): Type<ICrudService<any>> {
  class CrudServiceHost {
    constructor(@InjectModel(modelToken) private readonly model: Model<any>) {}

    async create(createDto: any): Promise<T> {
      const createdDto = new this.model({ ...createDto });
      return await createdDto.save();
    }

    async findAll(query: ICrudQuery): Promise<any> {
      const { page = 1, per_page: perPage = 100 } = query.page;
      const count = await this.model.find(query.filter).countDocuments();
      const meta = {
        perPage,
        currentPage: page,
        totalItems: count,
        totalPages: Math.ceil(count / perPage),
      };
      const skip = perPage * (page - 1);

      const data = await this.model
        .find(query.filter)
        .sort(query.sort)
        .limit(perPage)
        .populate(query.population)
        .skip(skip)
        .exec();
      return new IPagination(meta, data);
    }

    async findOne(id: string | number, options: any = {}): Promise<T> {
      return this.model
        .findById(id)
        .populate(options.population)
        .orFail(() => new NotFoundError(`${id} not found on ${modelToken}`));
    }

    async update(id: string | number, updateDto: any): Promise<T> {
      return this.model
        .findByIdAndUpdate(id, { ...updateDto, $inc: { __v: 1 } })
        .orFail(() => new NotFoundError(`${id} not found on ${modelToken}`));
    }

    async remove(id: string | number): Promise<T> {
      return this.model
        .findByIdAndDelete(id)
        .orFail(() => new NotFoundError(`${id} not found on ${modelToken}`));
    }
  }
  return CrudServiceHost;
}
