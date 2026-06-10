import { NotificationQueue } from "../prioritization/index.js";
import type { Notification } from "../types/notification.js";

export class NotificationService {
  private readonly queue = new NotificationQueue();

  submit(notification: Notification): void {
    this.queue.enqueue(notification);
  }

  dispatchNext() {
    return this.queue.dequeue();
  }

  pendingCount(): number {
    return this.queue.size();
  }
}
