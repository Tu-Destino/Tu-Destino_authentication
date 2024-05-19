import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import dbConfig from './db-config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof dbConfig>) => {
        const { db, env } = configService;
        const uriDb =
          env === process.env.ENVIROMENTS
            ? `${db.connection}${db.host}/${db.name}` 
            : `${db.mongo}/${db.name}?retryWrites=true&w=majority`
        return {
          uri: uriDb,
        };
      },
      inject: [dbConfig.KEY],
    }),
  ],
})
export class PersistenceModule {}