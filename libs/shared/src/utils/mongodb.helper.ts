import { PipelineStage } from 'mongoose';
import { $getMetadataAggregate } from './functions.util';
import { MongoDBHelper } from './types/mongodb.type';

export const LookupOneToOne = ({
    from,
    localField,
    project,
    extraPipelineStage = [],
    foreignField = '_id',
    as = undefined,
}: MongoDBHelper.LookupOneToOne): Array<
    PipelineStage.Lookup | PipelineStage.Set | PipelineStage.Unwind
> => {
    const alias = as ?? localField;
    return [
        {
            $lookup: {
                from,
                let: { refId: { $toObjectId: `$${localField}` } },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: [
                                    '$$refId',
                                    { $toObjectId: '$' + `${foreignField}` },
                                ],
                            },
                        },
                    },
                    ...extraPipelineStage,
                    project && { $project: project },
                ].filter(Boolean),
                as: alias,
            },
        },
        {
            $set: {
                [alias]: {
                    $ifNull: [
                        {
                            $arrayElemAt: [`$${alias}`, 0],
                        },
                        null,
                    ],
                },
            },
        },
    ];
};

export const LookupOneToMany = ({
    from,
    localField,
    project,
    extraPipelineStage = [],
    foreignField = '_id',
    $matchOperator = '$eq',
    as = undefined,
}: MongoDBHelper.LookupOneToMany): Array<PipelineStage.Lookup> => {
    const alias = as ?? localField;
    return [
        {
            $lookup: {
                from,
                let: { refId: `$${localField}` },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                [$matchOperator]: [
                                    '$$refId',
                                    '$' + `${foreignField}`,
                                ],
                            },
                        },
                    },
                    ...extraPipelineStage,
                    project && { $project: project },
                ].filter(Boolean),
                as: alias,
            },
        },
    ];
};

export const LookupManyToOne = ({
    from,
    localField,
    project,
    extraPipelineStage = [],
    foreignField = '_id',
    $matchOperator = '$in',
    as = undefined,
}: MongoDBHelper.LookupOneToMany): Array<PipelineStage.Lookup> => {
    const alias = as ?? localField;
    return [
        {
            $lookup: {
                from,
                let: { refIds: `$${localField}` },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                [$matchOperator]: [
                                    '$' + `${foreignField}`,
                                    '$$refId',
                                ],
                            },
                        },
                    },
                    ...extraPipelineStage,
                    project && { $project: project },
                ].filter(Boolean),
                as: alias,
            },
        },
    ];
};

export const getMetadataAggregate = (page, limit): any[] => {
    return [
        {
            $count: 'count',
        },
        {
            $addFields: $getMetadataAggregate(page, limit, '$count'),
        },
        {
            $unset: ['count'],
        },
    ];
};

export const $IfNullThen = ($field: `$${string}`, $default: any = 0) => ({
    $ifNull: [$field, $default],
});

export const $ifMissingThen = (
    $field: `$${string}`,
    $value: any,
    $default: any = $field
) => ({
    $cond: [$isMissingCondition($field), $value, $default],
});

export const $firstItem = ($field: any) => ({
    $arrayElemAt: [$field, 0],
});

export const $concatTwoDimensionArray = ($field: `$${string}`) => ({
    $reduce: {
        input: $field,
        initialValue: [],
        in: {
            $concatArrays: ['$$value', '$$this'],
        },
    },
});

export const $isMissingCondition = ($field: string) => ({
    $or: [
        { $in: [$field, [null, undefined, [], {}, NaN]] },
        { $eq: [{ $type: $field }, 'missing'] },
    ],
});

export const $flatTwoDimensionArray = ($field: string) => ({
    $addFields: {
        [$field.replace('$', '')]: {
            $reduce: {
                input: _fillDollarSign($field),
                initialValue: [],
                in: {
                    $concatArrays: [
                        '$$value',
                        {
                            $cond: [
                                { $isArray: '$$this' },
                                '$$this',
                                ['$$this'],
                            ],
                        },
                    ],
                },
            },
        },
    },
});

export const $round = ($field: `$${string}`, decimal: number = 2) => ({
    $round: [$IfNullThen($field, 0), decimal],
});

export const $divide = ($divider: string, $dividend: string): any => ({
    $divide: [
        _fillDollarSign($divider),
        {
            $cond: [
                { $eq: [_fillDollarSign($dividend), 0] },
                1,
                _fillDollarSign($dividend),
            ],
        },
    ] as any,
});

export const $multiply = (...$fields: any[]): any => ({
    $multiply: $fields.flat(1),
});

export const $sizeOfArray = ($field: string) => ({
    $cond: {
        if: { $isArray: _fillDollarSign($field) },
        then: {
            $size: _fillDollarSign($field),
        },
        else: 0,
    },
});

export const _fillDollarSign = (
    $field: string | `$${string}`
): `$${string}` | `$$${string}` => {
    if ($field?.startsWith('$$')) return $field as `$$${string}`;
    return $field?.startsWith('$') ? ($field as `$${string}`) : `$${$field}`;
};

export const $cond = (condition: object, thenValue: any, elseValue: any) => ({
    $cond: [condition, thenValue, elseValue],
});

export const $uniqArray = (
    $field: string,
    subField: string = '',
    getOnlySubField: boolean = true
): any => {
    const $property = [_fillDollarSign($field), getOnlySubField ? subField : '']
        .filter(Boolean)
        .join('.');

    return {
        $reduce: {
            input: $property,
            initialValue: [],
            in: {
                $concatArrays: [
                    '$$value',
                    $cond(
                        {
                            $in: [
                                ['$$this', getOnlySubField ? '' : subField]
                                    .filter(Boolean)
                                    .join('.'),
                                ['$$value', getOnlySubField ? '' : subField]
                                    .filter(Boolean)
                                    .join('.'),
                            ],
                        },
                        [],
                        ['$$this']
                    ),
                ],
            },
        },
    };
};

export const $toArray = ($field: string) => ({
    $cond: [
        {
            $isArray: _fillDollarSign($field),
        },
        _fillDollarSign($field),
        [],
    ],
});
