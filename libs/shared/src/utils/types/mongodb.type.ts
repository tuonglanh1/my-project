import { AggregateOptions, PipelineStage } from 'mongoose';

export namespace MongoDBHelper {
    export type LookupOneToOne = {
        from: string;
        localField: string;
        project?: any;
        foreignField?: string;
        extraPipelineStage?: Exclude<
            PipelineStage,
            PipelineStage.Merge | PipelineStage.Out
        >[];
        as?: string;
    };
    export type LookupOneToMany = {
        from: string;
        localField: string;
        project?: any;
        foreignField?: string;
        extraPipelineStage?: Exclude<
            PipelineStage,
            PipelineStage.Merge | PipelineStage.Out
        >[];
        $matchOperator?: '$eq' | '$in';
        as?: string;
    };
}
