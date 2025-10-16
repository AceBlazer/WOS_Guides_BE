import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsMongoId, IsBoolean } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({
    description: 'Category name',
    example: 'Events',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Category description',
    example: 'All event-related guides',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Parent category ID (for sub-categories)',
    example: '507f1f77bcf86cd799439011',
    required: false,
  })
  @IsMongoId()
  @IsOptional()
  parentCategory?: string;

  @ApiProperty({
    description: 'Active status',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
