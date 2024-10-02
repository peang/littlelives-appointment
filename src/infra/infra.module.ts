import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import * as os from 'os';
import { AppointmentModel } from './models/AppointmentModel';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: async () => ({
        dialect: 'postgres',
        pool: {
          max: os.cpus().length * 4,
          min: os.cpus().length,
          acquire: 30000,
          idle: 10000,
        },
        logging: process.env.CLI_LOGGING === 'true' ? console.log : false,
        host: process.env.SQL_HOST,
        port: Number(process.env.SQL_PORT),
        username: process.env.SQL_USERNAME,
        password: process.env.SQL_PASSWORD,
        database: process.env.SQL_DB,
        models: [AppointmentModel],
        synchronize: false,
      }),
    }),
  ],
})
export class InfraModule { }
