from sqlalchemy import select
from sqlalchemy.orm import Session
from blueprints.data_provider.engine import engine
from blueprints.data_provider.dtos.notification import Notification

session = Session(engine)


def getNotificationDtos():

    stmt = select(Notification)
    return session.scalars(stmt)


def addNotificationDto(notification_details, time_stamp, plant_health_attribute_id):

    new_notification = Notification(notification_details, time_stamp, plant_health_attribute_id)

    session.add(new_notification)
    session.commit()
    return new_notification


def getNotificationDtoById(notification_id):

    return session.query(Notification).get(notification_id)
