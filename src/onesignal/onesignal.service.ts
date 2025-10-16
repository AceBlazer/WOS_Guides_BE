import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as OneSignal from 'onesignal-node';
import { SendNotificationDto } from './dto/send-notification.dto';

@Injectable()
export class OneSignalService {
  private client: OneSignal.Client;
  private appId: string;

  constructor(private configService: ConfigService) {
    this.appId = this.configService.get<string>('ONESIGNAL_APP_ID') || '';
    const apiKey = this.configService.get<string>('ONESIGNAL_API_KEY') || '';

    this.client = new OneSignal.Client(this.appId, apiKey);
  }

  async sendNotification(sendNotificationDto: SendNotificationDto) {
    const { heading, content, playerIds, segments, data } = sendNotificationDto;

    const notification = {
      headings: { en: heading },
      contents: { en: content },
      data: data || {},
    };

    // Send to specific players or segments
    if (playerIds && playerIds.length > 0) {
      notification['include_player_ids'] = playerIds;
    } else if (segments && segments.length > 0) {
      notification['included_segments'] = segments;
    } else {
      // Default to all users if no target specified
      notification['included_segments'] = ['All'];
    }

    try {
      const response = await this.client.createNotification(notification);
      return {
        success: true,
        message: 'Notification sent successfully',
        data: response.body,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to send notification',
        error: error.message,
      };
    }
  }

  async getNotifications() {
    try {
      const response = await this.client.viewNotifications();
      return {
        success: true,
        data: response.body,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch notifications',
        error: error.message,
      };
    }
  }

  async getNotificationById(notificationId: string) {
    try {
      const response = await this.client.viewNotification(notificationId);
      return {
        success: true,
        data: response.body,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch notification',
        error: error.message,
      };
    }
  }

  async sendNotificationWithButtons(payload: any) {
    const { heading, content, playerIds, segments, data, buttons, url } = payload;

    const notification = {
      headings: { en: heading },
      contents: { en: content },
      data: data || {},
      buttons: buttons || [],
    };

    // Add URL if provided
    if (url) {
      notification['url'] = url;
    }

    // Send to specific players or segments
    if (playerIds && playerIds.length > 0) {
      notification['include_player_ids'] = playerIds;
    } else if (segments && segments.length > 0) {
      notification['included_segments'] = segments;
    } else {
      notification['included_segments'] = ['All'];
    }

    try {
      const response = await this.client.createNotification(notification);
      return {
        success: true,
        message: 'Notification with buttons sent successfully',
        data: response.body,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to send notification',
        error: error.message,
      };
    }
  }
}
