import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { OneSignalService } from './onesignal.service';
import { SendNotificationDto } from './dto/send-notification.dto';

@ApiTags('OneSignal')
@Controller('onesignal')
export class OneSignalController {
  constructor(private readonly oneSignalService: OneSignalService) {}

  @Post('send')
  @ApiOperation({ summary: 'Send a push notification via OneSignal' })
  @ApiResponse({
    status: 201,
    description: 'Notification sent successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  async sendNotification(@Body() sendNotificationDto: SendNotificationDto) {
    return this.oneSignalService.sendNotification(sendNotificationDto);
  }

  @Get('notifications')
  @ApiOperation({ summary: 'Get all notifications' })
  @ApiResponse({
    status: 200,
    description: 'Returns list of all notifications',
  })
  async getNotifications() {
    return this.oneSignalService.getNotifications();
  }

  @Get('notifications/:id')
  @ApiOperation({ summary: 'Get notification by ID' })
  @ApiParam({
    name: 'id',
    description: 'Notification ID',
    example: '12345678-1234-1234-1234-123456789012',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns notification details',
  })
  @ApiResponse({
    status: 404,
    description: 'Notification not found',
  })
  async getNotificationById(@Param('id') id: string) {
    return this.oneSignalService.getNotificationById(id);
  }
}
