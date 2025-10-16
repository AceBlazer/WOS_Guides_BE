import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryController } from './category.controller';
import { GuideController } from './guide.controller';
import { CategoryService } from './category.service';
import { GuideService } from './guide.service';
import { Category, CategorySchema } from './schemas/category.schema';
import { Guide, GuideSchema } from './schemas/guide.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
      { name: Guide.name, schema: GuideSchema },
    ]),
  ],
  controllers: [CategoryController, GuideController],
  providers: [CategoryService, GuideService],
  exports: [CategoryService, GuideService],
})
export class GuideModule {}
