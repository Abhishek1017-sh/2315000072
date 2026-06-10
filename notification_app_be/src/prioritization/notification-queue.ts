import type { Notification, PrioritizedNotification } from "../types/notification.js";
import { scoreNotification } from "./priority-rules.js";

export class NotificationQueue {
  private readonly items: PrioritizedNotification[] = [];

  enqueue(notification: Notification): void {
    const prioritized: PrioritizedNotification = {
      ...notification,
      score: scoreNotification(notification),
    };

    this.items.push(prioritized);
    this.items.sort((a, b) => b.score - a.score);
  }

  dequeue(): PrioritizedNotification | undefined {
    return this.items.shift();
  }

  peek(): PrioritizedNotification | undefined {
    return this.items[0];
  }

  size(): number {
    return this.items.length;
  }
}
