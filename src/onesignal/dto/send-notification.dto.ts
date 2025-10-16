import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsOptional, IsObject } from 'class-validator';

export class SendNotificationDto {
  @ApiProperty({
    description: 'Notification heading/title',
    example: 'Welcome!',
  })
  @IsString()
  heading: string;

  @ApiProperty({
    description: 'Notification message content',
    example: 'Thank you for subscribing to our notifications',
  })
  @IsString()
  content: string;

  @ApiProperty({
    description: 'Array of player IDs (device tokens) to send notification to',
    example: ['player-id-1', 'player-id-2'],
    required: false,
  })
  @IsArray()
  @IsOptional()
  playerIds?: string[];

  @ApiProperty({
    description: 'Segments to target (e.g., "All", "Active Users")',
    example: ['All'],
    required: false,
  })
  @IsArray()
  @IsOptional()
  segments?: string[];

  @ApiProperty({
    description: 'Additional data to send with notification',
    example: { userId: '123', action: 'view_profile' },
    required: false,
  })
  @IsObject()
  @IsOptional()
  data?: Record<string, any>;
}
