class Notification(object):
    notification_details = ''
    time_stamp = '2022-07-21 00:00:00'
    plant_health_attribute_id = 0

    # The class "constructor" - an initializer
    def __init__(self, id, notification_details, time_stamp, plant_health_attribute_id):
        self.id = id
        self.notification_details = notification_details
        self.time_stamp = time_stamp
        self.plant_health_attribute_id = plant_health_attribute_id


def make_notification(id, notification_details, time_stamp, plant_health_attribute_id):
    notification = Notification(id, notification_details, time_stamp, plant_health_attribute_id)
    return notification


def make_new_notification(id, notification_details, time_stamp, plant_health_attribute_id):
    notification = Notification(id, notification_details, time_stamp, plant_health_attribute_id)
    return notification
