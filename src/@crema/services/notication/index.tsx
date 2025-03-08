import jwtAxios from '@crema/services/auth/jwt-auth/index';
import { Notification } from '@crema/types/models/notification';

const NOTIFICATIONS_ENDPOINT = 'notifications';

/**
 * Fetch notifications for a specific user
 * @param userId The ID of the user to fetch notifications for
 */
export const fetchUserNotifications = async (userId: string): Promise<Notification[]> => {
  try {
    const response = await jwtAxios.get(`${NOTIFICATIONS_ENDPOINT}?user_id=${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user notifications:', error);
    throw error;
  }
};

/**
 * Mark a notification as read
 * @param notificationId The ID of the notification to mark as read
 */
export const markNotificationAsRead = async (notificationId: number): Promise<void> => {
  try {
    await jwtAxios.patch(`${NOTIFICATIONS_ENDPOINT}/${notificationId}`, { is_read: true });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
};