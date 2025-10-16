import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OneSignalModule } from './onesignal/onesignal.module';
import { GiftCodeModule } from './gift-codes/gift-code.module';
import { GuideModule } from './guides/guide.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    OneSignalModule,
    GiftCodeModule,
    GuideModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
