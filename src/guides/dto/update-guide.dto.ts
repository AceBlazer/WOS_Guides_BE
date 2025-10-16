import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsMongoId, IsOptional, IsBoolean } from 'class-validator';

export class UpdateGuideDto {
  @ApiProperty({
    description: 'Guide title',
    example: 'How to participate in events',
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'HTML content of the guide',
    example: '<h1>Event Guide</h1><p>Follow these steps...</p>',
    required: false,
  })
  @IsString()
  @IsOptional()
  htmlContent?: string;

  @ApiProperty({
    description: 'Category ID',
    example: '507f1f77bcf86cd799439011',
    required: false,
  })
  @IsMongoId()
  @IsOptional()
  category?: string;

  @ApiProperty({
    description: 'Active status',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
