import type { Notification, NotificationPriority } from "../types/notification.js";

const PRIORITY_WEIGHTS: Record<NotificationPriority, number> = {
  low: 1,
  normal: 2,
  high: 3,
  critical: 4,
};

export function getPriorityWeight(priority: NotificationPriority): number {
  return PRIORITY_WEIGHTS[priority];
}

export function scoreNotification(notification: Notification): number {
  const baseScore = getPriorityWeight(notification.priority);
  const ageMinutes = (Date.now() - notification.createdAt.getTime()) / 60_000;

  // Placeholder: older notifications receive a slight boost
  return baseScore + ageMinutes * 0.01;
}
