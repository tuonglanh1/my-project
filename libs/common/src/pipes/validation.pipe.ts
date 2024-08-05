import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Logger,
  Inject,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { I18nService } from 'nestjs-i18n';
import * as _ from 'lodash';
import '@app/shared/utils/dotenv';
import { Common } from '../function';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  @Inject()
  private readonly i18n: I18nService;

  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errorsList = await validate(object);
    if (errorsList.length > 0) {
      const errors = [];
      for (const error of errorsList) {
        if (_.isArray(error.children) && error.children.length == 0) {
          errors.push(
            ...(await this.parseErrors(error, error?.target?.constructor.name)),
          );
        } else {
          for (const item of error.children) {
            if (_.isArray(item.children) && item.children.length > 0) {
              for (const subItem of item.children) {
                errors.push(
                  ...(await this.parseErrors(
                    {
                      ...subItem,
                      property: `${error.property}.${item.property}.${subItem.property}`,
                    },
                    subItem?.target?.constructor.name,
                  )),
                );
              }
            } else {
              errors.push(
                ...(await this.parseErrors(
                  {
                    ...item,
                    property: `${error.property}.${item.property}`,
                  },
                  item?.target?.constructor.name,
                )),
              );
            }
          }
        }
      }
      if (JSON.parse(process.env.IS_DEBUG)) {
        const logger = new Logger('Validation');
        logger.error(errors);
      }
      if (errors.length > 0) {
        throw new HttpException(
          { statusCode: HttpStatus.BAD_REQUEST, message: errors },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    return value;
  }

  async parseErrors(error: any, constructorName: string) {
    const errors = [];
    if (!error.constraints) {
      return errors;
    }
    const errorsObject = error.constraints;
    const { property, target } = error;
    // let object_name =
    //     Common.translateObjectMapping(constructorName) + '.' + property;
    let object_name = '';
    object_name = await this.i18n.translate('fields.' + object_name, {});
    const {
      isNotEmpty,
      isString,
      isEmail,
      length,
      isIn,
      arrayMinSize,
      isEnum,
      isArray,
      validateNested,
      isObject,
      max,
      maxLength,
      isMongoId,
      isBoolean,
      min,
    } = errorsObject;
    if (isNotEmpty) {
      errors.push(
        await this.i18n.translate('validations.required', {
          args: { attribute: object_name },
        }),
      );
    }

    if (isString) {
      errors.push(
        await this.i18n.translate('validations.string', {
          args: { attribute: object_name },
        }),
      );
    }

    if (isEmail) {
      errors.push(
        await this.i18n.translate('validations.not_regex', {
          args: { attribute: object_name },
        }),
      );
    }

    if (length) {
      const parameter1 = length?.split(' ')[0];
      const parameter2 = length?.split(' ')[1];
      errors.push(
        await this.i18n.translate('validations.between.string', {
          args: {
            attribute: object_name,
            min: parameter1,
            max: parameter2,
          },
        }),
      );
    }

    if (isIn) {
      // const parameter1 = isIn.split(' ')[0];
      const parameter1 = isIn.toString();
      errors.push(
        await this.i18n.translate('validations.enum', {
          args: { attribute: object_name, values: parameter1 },
        }),
      );
    }

    if (isArray) {
      errors.push(
        await this.i18n.translate('validations.not_regex', {
          args: { attribute: object_name },
        }),
      );
    }

    if (isObject) {
      errors.push(
        await this.i18n.translate('validations.not_regex', {
          args: { attribute: object_name },
        }),
      );
    }

    if (validateNested) {
      errors.push(
        await this.i18n.translate('validations.not_regex', {
          args: { attribute: object_name },
        }),
      );
    }

    if (max) {
      const parameter1 = max?.split(' ')[0];
      errors.push(
        await this.i18n.translate('validations.max.numeric', {
          args: { attribute: object_name, max: parameter1 },
        }),
      );
    }

    if (min) {
      const param = min?.split(' ');
      const parameter1 = param[param.length - 1];
      errors.push(
        await this.i18n.translate('validations.min.numeric', {
          args: { attribute: object_name, min: parameter1 },
        }),
      );
    }
    if (maxLength) {
      const parameter1 = maxLength?.split(' ')[0];
      errors.push(
        await this.i18n.translate('validations.max.string', {
          args: { attribute: object_name, max: parameter1 },
        }),
      );
    }

    if (isEnum) {
      const parameter1 = isEnum?.split(' ')[0];
      errors.push(
        await this.i18n.translate('validations.enum', {
          args: { attribute: object_name, values: parameter1 },
        }),
      );
    }

    if (arrayMinSize) {
      const parameter1 = arrayMinSize?.split(' ')[0];
      errors.push(
        await this.i18n.translate('validations.min.array', {
          args: { attribute: object_name, min: parameter1 },
        }),
      );
    }

    if (isMongoId) {
      errors.push(
        await this.i18n.translate('validations.not_regex', {
          args: { attribute: object_name },
        }),
      );
    }

    if (isBoolean) {
      errors.push(
        await this.i18n.translate('validations.not_regex', {
          args: { attribute: object_name },
        }),
      );
    }

    return errors;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }

  private isEmpty(value: any) {
    if (Object.keys(Common.detectNullToObject(value)).length > 0) {
      return false;
    }
    return true;
  }
}
