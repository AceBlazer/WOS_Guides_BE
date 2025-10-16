import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Guide, GuideDocument } from './schemas/guide.schema';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';

@Injectable()
export class GuideService {
  constructor(
    @InjectModel(Guide.name) private guideModel: Model<GuideDocument>,
  ) {}

  async create(createGuideDto: CreateGuideDto) {
    const guide = new this.guideModel(createGuideDto);
    const savedGuide = await guide.save();
    return {
      success: true,
      message: 'Guide created successfully',
      data: savedGuide,
    };
  }

  async findAll() {
    const guides = await this.guideModel
      .find({ isActive: true })
      .populate('category', 'name')
      .sort({ createdAt: -1 })
      .exec();

    return {
      success: true,
      count: guides.length,
      data: guides,
    };
  }

  async findByCategory(categoryId: string) {
    const guides = await this.guideModel
      .find({ category: categoryId, isActive: true })
      .populate('category', 'name')
      .sort({ createdAt: -1 })
      .exec();

    return {
      success: true,
      count: guides.length,
      data: guides,
    };
  }

  async findOne(id: string) {
    const guide = await this.guideModel
      .findById(id)
      .populate('category', 'name')
      .exec();

    if (!guide) {
      return {
        success: false,
        message: 'Guide not found',
      };
    }

    return {
      success: true,
      data: guide,
    };
  }

  async update(id: string, updateGuideDto: UpdateGuideDto) {
    const updatedGuide = await this.guideModel
      .findByIdAndUpdate(id, updateGuideDto, { new: true })
      .populate('category', 'name')
      .exec();

    if (!updatedGuide) {
      return {
        success: false,
        message: 'Guide not found',
      };
    }

    return {
      success: true,
      message: 'Guide updated successfully',
      data: updatedGuide,
    };
  }

  async delete(id: string) {
    const result = await this.guideModel.findByIdAndDelete(id).exec();
    if (!result) {
      return {
        success: false,
        message: 'Guide not found',
      };
    }
    return {
      success: true,
      message: 'Guide deleted successfully',
    };
  }
}
