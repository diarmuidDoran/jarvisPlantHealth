import { Notification } from "shared/types";

export type NotificationResponse = Notification;

export type NotificationRequest = {
    notification_details: string;
    time_stamp: string;
    plant_health_attribute_id: number;
}