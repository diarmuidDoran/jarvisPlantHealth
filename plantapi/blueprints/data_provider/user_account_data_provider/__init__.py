from flask import request
from sqlalchemy import select
from sqlalchemy.orm import Session
from blueprints.data_provider.engine import engine
from blueprints.data_provider.dtos.user_accounts import User_Account

session = Session(engine)


def getUserAccountDtos():

    stmt = select(User_Account)
    return session.scalars(stmt)


def addUserAccountDto():
    data = request.get_json()

    user_name = data.get('user_name')
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    email = data.get('email')
    password = data.get('password')

    new_user_account = User_Account(user_name=user_name, first_name=first_name, last_name=last_name, email=email,
                                    password=password)

    session.add(new_user_account)
    session.commit()
    return new_user_account


def getUserAccountDtoById(user_account_id):

    '''stmt = select(User_Account).where(User_Account.id == user_account_id)'''
    """return session.query(User_Account).filter(User_Account.id == user_account_id)"""
    return session.query(User_Account).get(user_account_id)


def deleteUserAccountDtoById(user_account_id):
    user_account = getUserAccountDtoById(user_account_id)
    session.delete(user_account)
    session.commit()

    return {'Room ' + user_account.user_name + ' deleted'}

def updateUserAccountDtoById(user_account_id):
    user_account_to_update = getUserAccountDtoById(user_account_id)
    data = request.get_json()

    user_account_to_update.name = data.get('user_name')
    user_account_to_update.first_name = data.get('first_name')
    user_account_to_update.last_name = data.get('last_name')
    user_account_to_update.email = data.get('email')
    user_account_to_update.password = data.get('password')

    session.commit()

    return user_account_to_update

