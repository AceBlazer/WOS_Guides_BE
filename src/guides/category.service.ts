import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = new this.categoryModel(createCategoryDto);
    const savedCategory = await category.save();
    return {
      success: true,
      message: 'Category created successfully',
      data: savedCategory,
    };
  }

  async findAll() {
    const categories = await this.categoryModel
      .find({ isActive: true })
      .populate('parentCategory', 'name')
      .sort({ createdAt: -1 })
      .exec();

    return {
      success: true,
      count: categories.length,
      data: categories,
    };
  }

  async findOne(id: string) {
    const category = await this.categoryModel
      .findById(id)
      .populate('parentCategory', 'name')
      .exec();

    if (!category) {
      return {
        success: false,
        message: 'Category not found',
      };
    }

    return {
      success: true,
      data: category,
    };
  }

  async findSubCategories(parentId: string) {
    const subCategories = await this.categoryModel
      .find({ parentCategory: parentId, isActive: true })
      .sort({ createdAt: -1 })
      .exec();

    return {
      success: true,
      count: subCategories.length,
      data: subCategories,
    };
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const updatedCategory = await this.categoryModel
      .findByIdAndUpdate(id, updateCategoryDto, { new: true })
      .populate('parentCategory', 'name')
      .exec();

    if (!updatedCategory) {
      return {
        success: false,
        message: 'Category not found',
      };
    }

    return {
      success: true,
      message: 'Category updated successfully',
      data: updatedCategory,
    };
  }

  async delete(id: string) {
    const result = await this.categoryModel.findByIdAndDelete(id).exec();
    if (!result) {
      return {
        success: false,
        message: 'Category not found',
      };
    }
    return {
      success: true,
      message: 'Category deleted successfully',
    };
  }
}
