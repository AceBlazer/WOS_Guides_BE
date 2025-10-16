import { Module } from '@nestjs/common';
import { OneSignalController } from './onesignal.controller';
import { OneSignalService } from './onesignal.service';

@Module({
  controllers: [OneSignalController],
  providers: [OneSignalService],
  exports: [OneSignalService],
})
export class OneSignalModule {}
