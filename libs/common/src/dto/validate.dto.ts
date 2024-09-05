import {ApiProperty} from "@nestjs/swagger";
import {IsOptional, IsString} from "class-validator";

export default class ValidateDto {
    @ApiProperty({
        description: 'Paginate: offset param',
        required: false,
        default: 0
    })
    @IsOptional()
    @IsString()
    offset: number;

    @ApiProperty({
        description: 'Paginate: current the same to offset param',
        required: false,
        default: 0
    })
    @IsOptional()
    @IsString()
    current: number;

    @ApiProperty({
        description: 'Paginate: limit param',
        required: false,
        default: 10
    })
    @IsOptional()
    @IsString()
    limit: number;

    @ApiProperty({
        description: 'Paginate: pageSize the same to limit param',
        required: false,
        default: 10
    })
    @IsOptional()
    @IsString()
    pageSize: number;

    @ApiProperty({
        description: 'Search by ids',
        required: false,
    })
    @IsOptional()
    @IsString()
    ids: any;

    @ApiProperty({
        description: 'Search by customer phone',
        required: false,
    })
    @IsOptional()
    @IsString()
    customerPhone: string;

    @ApiProperty({
        description: 'Select fields',
        required: false,
    })
    @IsOptional()
    @IsString()
    selectFields: string;

    @ApiProperty({
        description: 'Example: /users?sort=name_desc,createdAt_asc . default sort by createdAt desc',
        required: false,
    })
    @IsOptional()
    @IsString()
    sort: any = 'createdAt_desc';

    getIds() {
        let ids: any = [];
        if (this.ids) ids = this.ids.split(',');
        return ids;
    }

    getOffset() {
        let offset = this.offset || 0;

        // calculate offset from current and pageSize
        if (this.current && this.pageSize) {
            offset = (this.current - 1) * this.pageSize;
        }
        return Number(offset);
    }

    getLimit() {
        return Number(this.limit || this.pageSize || 10);
    }

    getCustomerPhone() {
        let phone = this.customerPhone;
        if (phone && phone.length > 0 && phone.substr(0, 1) === '0') {
            phone = `+84${phone.substr(1, phone.length)}`;
        }
        return phone;
    }

    getSelectFields() {
        let selectFields: any = null;

        if (this.selectFields) {
            const keys = this.selectFields.split(',');
            selectFields = {};
            for (let i = 0; i < keys.length; i++) {
                selectFields[keys[i]] = 1;
            }
        }

        return selectFields;
    }

    getSort() {
        let sort: any = {_id: -1};

        const fields = this.sort.split(',');
        if (fields.length > 0) sort = {};

        for (let i = 0; i < fields.length; i++) {
            const arrTem = fields[i].split('_');

            if (arrTem[1] === 'desc' || arrTem[1] === 'asc') {
                sort[arrTem[0]] = arrTem[1] === 'desc' ? -1 : 1;
            }
        }

        return sort;
    }
}
