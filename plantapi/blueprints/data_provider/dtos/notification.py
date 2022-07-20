from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from blueprints.data_provider.dtos.user_accounts import plant_user_table
from blueprints.data_provider.engine import Base


class Notification(Base):
    __tablename__ = "notification"
    id = Column('id', Integer, primary_key=True)
    notification_details = Column('notification_details', String())
    time_stamp = Column('time_stamp', DateTime(), default=datetime.utcnow())
    user_account_id = Column('user_account_id', Integer, ForeignKey("user_account.id"), nullable=False)
    plant_health_attribute_id = Column('plant_health_attribute_id', Integer, ForeignKey("plant_health_attribute.id"),
                                       nullable=False)

    users_b = relationship("User_Account", secondary=plant_user_table, back_populates="notifications")

    plant_health_attributes_d = relationship("Plant_Health_Attribute", back_populates="notifications_b")

    def __init__(self, notification_details, time_stamp, user_account_id, plant_health_attribute_id):
        self.notification_details = notification_details
        self.time_stamp = time_stamp
        self.user_account_id = user_account_id
        self.plant_health_attribute_id = plant_health_attribute_id

    def __repr__(self):
        return f"Notification(notification_id={self.id!r}, notification_details={self.notification_details!r}, " \
               f"time_stamp={self.time_stamp!r}, user_account_id={self.user_account_id!r}, " \
               f"plant_health_attribute_id={self.plant_health_attribute_id!r})"
