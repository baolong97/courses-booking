import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, QueryOptions, UpdateQuery } from 'mongoose';
import { ERole } from './constants';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService implements OnModuleInit {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    this.logger.log('Seed admin');
    const totalUser = await this.userModel.count();
    if (totalUser === 0) {
      await this.userModel.create({
        email: this.configService.get<string>('ADMIN_EMAIL', 'admin@gmail.com'),
        phoneNumber: this.configService.get<string>(
          'ADMIN_PHONE_NUMBER',
          '0123456789',
        ),
        password: this.configService.get<string>('ADMIN_PASSWORD', '@Dmin123'),
        fullName: 'Admin',
        roles: [ERole.USER, ERole.ADMIN],
      });
    }
  }

  async findById(id: string): Promise<User> {
    return await this.userModel.findById(id).lean().exec();
  }

  async find(): Promise<User[]> {
    return await this.userModel.find().lean().exec();
  }

  async create(data: Partial<User>): Promise<User> {
    return (await this.userModel.create(data)).toObject();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).lean().exec();
  }

  async findOne(filter: FilterQuery<User>): Promise<User> {
    return await this.userModel.findOne(filter).lean().exec();
  }

  async findOneAndUpdate(
    filter: FilterQuery<User>,
    update: UpdateQuery<User>,
    options?: QueryOptions<User>,
  ): Promise<User> {
    return await this.userModel
      .findOneAndUpdate(filter, update, { returnDocument: 'after', ...options })
      .lean()
      .exec();
  }
}
