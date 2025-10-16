import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GiftCodeController } from './gift-code.controller';
import { GiftCodeService } from './gift-code.service';
import { GiftCode, GiftCodeSchema } from './schemas/gift-code.schema';
import { OneSignalModule } from '../onesignal/onesignal.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: GiftCode.name, schema: GiftCodeSchema }]),
    OneSignalModule,
  ],
  controllers: [GiftCodeController],
  providers: [GiftCodeService],
  exports: [GiftCodeService],
})
export class GiftCodeModule {}
