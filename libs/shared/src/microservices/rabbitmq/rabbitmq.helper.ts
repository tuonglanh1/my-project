import { COMPANY_ID_CODE } from '@app/common';
import * as amqplib from 'amqplib';
import { QUEUES } from '../enums';
// import { SummaryReport } from '@app/schemas/types/summary-report-schema.type';
import { INestApplication } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { RabbitMQConfig, RabbitMQName } from './config';
import { typeOf } from '@app/shared/utils';

export const RabbitMQHealthCheck = async (uri) => {
  try {
    const connection = await amqplib.connect(uri);
    await connection.close();
  } catch (error) {
    // throw new Error(error.message);
    throw new Error('[RabbitMQ] Connected Failed!');
  }
};

export const getQueueByCompanyCode = (
  queueName: string,
  companyCode: string,
) => (companyCode ? [queueName, companyCode].join('_') : null);

// export const getQueueByCompanyCodeApplyTime = (
//     queueName: string,
//     companyCode: string,
//     applyTime: SummaryReport.ApplyTime = 'DAY'
// ) => (companyCode ? [queueName, companyCode, applyTime].join('_') : null);

export const getAllQueuesByCompanyCode = (queueName: string) =>
  Object.values(COMPANY_ID_CODE).map((companyCode) =>
    getQueueByCompanyCode(queueName, companyCode),
  );

export const getSummaryAndKpiQueueByCompanyId = (companyId: string) => {
  const companyCode = COMPANY_ID_CODE[String(companyId)];

  return {
    SummaryQueue: getQueueByCompanyCode(QUEUES.SUMMARY_REPORT, companyCode),
    KpiQueue: getQueueByCompanyCode(QUEUES.KPI_REPORT, companyCode),
  };
};

export const getSummaryAndKpiQueue = (companyCode: string) => {
  return {
    SummaryQueue: getQueueByCompanyCode(QUEUES.SUMMARY_REPORT, companyCode),
    KpiQueue: getQueueByCompanyCode(QUEUES.KPI_REPORT, companyCode),
  };
};

// export const getSummaryAndKpiQueueApplyTime = (
//   companyCode: string,
//   applyTime: SummaryReport.ApplyTime,
// ) => {
//   return {
//     SummaryQueue: getQueueByCompanyCodeApplyTime(
//       QUEUES.SUMMARY_REPORT,
//       companyCode,
//       applyTime,
//     ),
//     KpiQueue: getQueueByCompanyCodeApplyTime(
//       QUEUES.KPI_REPORT,
//       companyCode,
//       applyTime,
//     ),
//   };
// };

// export const getSummaryQueueApplyTime = (
//     companyCode: string,
//     apply_time?: SummaryReport.ApplyTime
// ) => {
//     if (apply_time) {
//         return [
//             {
//                 queue: getSummaryAndKpiQueueApplyTime(companyCode, apply_time)
//                     .SummaryQueue,
//                 apply_time: apply_time,
//             },
//         ];
//     } else {
//         return Object.values(ENUM_SUMMARY_REPORT_APPLY_TIME).map(
//             (applyTime) => ({
//                 queue: getSummaryAndKpiQueueApplyTime(companyCode, applyTime)
//                     .SummaryQueue,
//                 apply_time: applyTime,
//             })
//         );
//     }
// };

// export const getKPIQueueApplyTime = (
//   companyCode: string,
//   apply_time?: SummaryReport.ApplyTime,
// ) => {
//   if (apply_time) {
//     return [
//       {
//         queue: getSummaryAndKpiQueueApplyTime(companyCode, apply_time).KpiQueue,
//         apply_time: apply_time,
//       },
//     ];
//   } else {
//     return Object.values(ENUM_SUMMARY_REPORT_APPLY_TIME).map((applyTime) => ({
//       queue: getSummaryAndKpiQueueApplyTime(companyCode, applyTime).KpiQueue,
//       apply_time: applyTime,
//     }));
//   }
// };

export const connectToQueueConsumers = (
  app: INestApplication,
  consumers: RabbitMQName[],
) => {
  const rmqSerivce = app.get<RabbitMQService>(RabbitMQService);
  const rmqConsumers = consumers.map((consumer) => RabbitMQConfig[consumer]);
  return rmqConsumers.map((consumer) =>
    app.connectMicroservice(
      rmqSerivce.getConsumer({
        queue: consumer.name,
        isAck: consumer.isAck,
        prefetchCount: consumer.prefetchCount,
        queueOptions: consumer.queueOptions,
        socketOptions: consumer.socketOptions,
      }),
    ),
  );
};

export const getQueueByTopic = (topic: string) => topic?.split('.')?.at(0);

export const getQueueByCmd = (command: { cmd: string }) =>
  command.cmd?.split('.')?.at(0);

export const patternIsTopic = (
  pattern: string | { cmd: string },
): pattern is string => {
  if (typeOf(pattern) === 'string') return true;
  return false;
};

export const getQueueNameByPattern = (pattern: string | { cmd: string }) =>
  patternIsTopic(pattern) ? getQueueByTopic(pattern) : getQueueByCmd(pattern);
