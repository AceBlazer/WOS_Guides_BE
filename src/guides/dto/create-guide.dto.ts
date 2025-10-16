import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateGuideDto {
  @ApiProperty({
    description: 'Guide title',
    example: 'How to participate in events',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'HTML content of the guide',
    example: '<h1>Event Guide</h1><p>Follow these steps...</p>',
  })
  @IsString()
  @IsNotEmpty()
  htmlContent: string;

  @ApiProperty({
    description: 'Category ID',
    example: '507f1f77bcf86cd799439011',
  })
  @IsMongoId()
  @IsNotEmpty()
  category: string;
}
