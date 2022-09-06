from src.blueprints.data_provider.notification_data_provider import *
from src.blueprints.models.notifications import *


def getNotifications():
    notificationModels = []
    for notificationDto in getNotificationDtos():
        notificationModels.append(
            make_notification(
                notificationDto.id,
                notificationDto.notification_details,
                notificationDto.time_stamp,
                notificationDto.plant_health_attribute_id,
            )
        )
    return notificationModels


def postNotification(notification_details, time_stamp, plant_health_attribute_id):
    notificationDto = addNotificationDto(
        notification_details, time_stamp, plant_health_attribute_id
    )
    return notificationDto


def getNotificationById(notification_id):
    notificationDto = getNotificationDtoById(notification_id)
    return make_notification(
        notificationDto.id,
        notificationDto.notification_details,
        notificationDto.time_stamp,
        notificationDto.plant_health_attribute_id,
    )
