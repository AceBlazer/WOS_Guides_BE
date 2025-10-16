import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateGiftCodeDto {
  @ApiProperty({
    description: 'Gift code string',
    example: 'SUMMER2024',
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    description: 'Date until the gift code is valid (ISO 8601 format)',
    example: '2024-12-31T23:59:59.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  validUntil: string;
}
