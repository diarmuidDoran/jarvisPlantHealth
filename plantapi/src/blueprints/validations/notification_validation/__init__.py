from blueprints.data_provider.notification_data_provider import getNotificationDtos


def notification_is_valid(notification_details, notification_time_stamp):

    for notificationDto in getNotificationDtos():
        if (
            notificationDto.notification_details.casefold()
            == notification_details.casefold()
        ) and (
            notificationDto.time_stamp.casefold() == notification_time_stamp.casefold()
        ) and (notificationDto.is_deleted is False):
            return False
    return True
