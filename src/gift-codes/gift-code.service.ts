import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GiftCode, GiftCodeDocument } from './schemas/gift-code.schema';
import { CreateGiftCodeDto } from './dto/create-gift-code.dto';
import { OneSignalService } from '../onesignal/onesignal.service';

@Injectable()
export class GiftCodeService {
  constructor(
    @InjectModel(GiftCode.name) private giftCodeModel: Model<GiftCodeDocument>,
    private oneSignalService: OneSignalService,
  ) {}

  async create(createGiftCodeDto: CreateGiftCodeDto) {
    const giftCode = new this.giftCodeModel({
      code: createGiftCodeDto.code,
      validUntil: new Date(createGiftCodeDto.validUntil),
    });

    const savedGiftCode = await giftCode.save();

    // Send notification with copy button
    await this.oneSignalService.sendNotificationWithButtons({
      heading: '🎁 New Gift Code!',
      content: savedGiftCode.code,
      segments: ['All'],
      data: {
        giftCode: savedGiftCode.code,
        validUntil: savedGiftCode.validUntil.toISOString(),
        action: 'copy_gift_code',
      },
      buttons: [
        {
          id: 'copy-button',
          text: '📋 Copy Code',
          icon: 'ic_menu_share',
        },
      ],
    });

    return {
      success: true,
      message: 'Gift code created and notification sent',
      data: savedGiftCode,
    };
  }

  async findAllValid() {
    const now = new Date();
    const validGiftCodes = await this.giftCodeModel
      .find({
        validUntil: { $gte: now },
        isActive: true,
      })
      .sort({ createdAt: -1 })
      .exec();

    return {
      success: true,
      count: validGiftCodes.length,
      data: validGiftCodes,
    };
  }

  async findAll() {
    const giftCodes = await this.giftCodeModel.find().sort({ createdAt: -1 }).exec();
    return {
      success: true,
      count: giftCodes.length,
      data: giftCodes,
    };
  }

  async findOne(id: string) {
    const giftCode = await this.giftCodeModel.findById(id).exec();
    if (!giftCode) {
      return {
        success: false,
        message: 'Gift code not found',
      };
    }
    return {
      success: true,
      data: giftCode,
    };
  }

  async delete(id: string) {
    const result = await this.giftCodeModel.findByIdAndDelete(id).exec();
    if (!result) {
      return {
        success: false,
        message: 'Gift code not found',
      };
    }
    return {
      success: true,
      message: 'Gift code deleted successfully',
    };
  }
}
