from blueprints.data_provider.user_account_data_provider import get_user_account_dtos, get_user_account_dto_by_id
import re

regex = re.compile(r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+')


def user_account_email_is_valid(email):

    if re.fullmatch(regex, email):
        return True
    else:
        return False


def user_account_is_valid_available(user_name, user_email):

    for user_account_dto in get_user_account_dtos():
        if user_account_dto.user_name.casefold() == user_name.casefold():
            return False
    return True


def user_account_is_valid_email_available(user_email):

    for user_account_dto in get_user_account_dtos():
        if user_account_dto.email.casefold() == user_email.casefold():
            return False
    return True


def user_account_update_is_valid(user_id, user_name, user_email):
    for user_account_dto in get_user_account_dtos():
        if user_account_dto.id == user_id:
            return True
        if user_account_dto.user_name.casefold() == user_name.casefold():
            return False
        elif user_account_dto.email.casefold() == user_email.casefold():
            return False
    return True


def user_id_is_valid(user_id):
    user_dto = get_user_account_dto_by_id(user_id)
    if user_dto.id == user_id:
        return True
    return False