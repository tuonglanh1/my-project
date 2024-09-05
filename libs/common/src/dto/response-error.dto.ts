import {ApiProperty} from "@nestjs/swagger";

export default class ResponseErrorDto {
    constructor(params: any) {
        // object.assign will overwrite defaults if params exist
        Object.assign(this, params);
    }
    @ApiProperty()
    type?: string;

    @ApiProperty()
    code: number;

    @ApiProperty()
    subCode?: number;

    @ApiProperty()
    subTitle?: string;

    @ApiProperty()
    message: string;

    @ApiProperty()
    name?: string;
}
