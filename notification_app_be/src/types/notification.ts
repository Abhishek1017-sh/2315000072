export type NotificationPriority = "low" | "normal" | "high" | "critical";

export type NotificationChannel = "in_app" | "push" | "email";

export interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string;
  priority: NotificationPriority;
  channel: NotificationChannel;
  createdAt: Date;
  metadata?: Record<string, unknown>;
}

export interface PrioritizedNotification extends Notification {
  score: number;
}
