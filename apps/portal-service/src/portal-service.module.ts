import { Module } from '@nestjs/common';
import { PortalServiceController } from './portal-service.controller';
import { PortalServiceService } from './portal-service.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QUEUES, RabbitMQModule } from '@app/shared';
import { CoreModule } from '@app/common/core.module';
import { MongooseDynamicModule } from '@app/common/mongoose';
import { CONNECTION_NAME, ENVIRONMENT_PARAM } from '@app/common';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        `config/.env.${process.env.ENVIRONMENT || process.env.NODE_ENV}`,
      ],
      isGlobal: true,
    }),
    RabbitMQModule.register({ name: QUEUES.PORTAL }),
    CoreModule,
    MongooseDynamicModule.registerAsync({
      connectionName: CONNECTION_NAME.PRIMARY,
    }),
    // MongooseDynamicModule.registerAsync({
    //   connectionName: CONNECTION_NAME.SECONDARY,
    // }),
    MongooseModule.forRootAsync({
      //connectionName: 'eticket',
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        // let db = configService.get('db');
        // if (!db || (!db.uri && !db.host)) db = configs.db;
        // console.log({ db });

        // let uri = db.uri || null;
        // // console.log({ uri });

        // if (!uri) {
        //   uri = 'mongodb://';

        //   if (db.username && db.pass) {
        //     uri += `${db.username}:${db.pass}@`;
        //   }
        //   uri += `${db.host}:${db.port}/${db.name}?directConnection=true`;
        //   if (db.replicaSet) uri += `&replicaSet=${db.replicaSet}`;
        // }
        let uri = configService.get(ENVIRONMENT_PARAM.MONGO_URI);
        console.log({ uri });
        return {
          uri,
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [PortalServiceController],
  providers: [PortalServiceService],
})
export class PortalServiceModule {}
