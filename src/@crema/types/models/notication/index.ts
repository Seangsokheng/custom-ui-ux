export enum NotificationType {
    CLUB_APPROVAL = 'club_approval',
    MEMBER_REQUEST = 'member_request'
  }
  
  export interface Notification {
    id: number;
    user_id: number;
    type: NotificationType;
    is_read: boolean;
    message: string;
    created_at: string;
    updated_at: string;
  }