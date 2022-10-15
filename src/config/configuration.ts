import { MongooseModuleOptions } from '@nestjs/mongoose';

export interface IEmailConfig {
  service: string;
  user: string;
  password: string;
}

export interface IConfiguration {
  port: number;
  database: MongooseModuleOptions;
  email: IEmailConfig;
}

export default (): IConfiguration => ({
  port: process.env.PORT ?? 3000,
  database: {
    uri: process.env.DATABASE_URI,
  },
  email: {
    service: process.env.EMAIL_SERVICE,
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
  },
});
