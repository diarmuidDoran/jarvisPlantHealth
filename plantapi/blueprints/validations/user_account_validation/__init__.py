from blueprints.data_provider.user_account_data_provider import get_user_account_dtos


def user_account_is_valid(user_name, user_email):

    for user_account_dto in get_user_account_dtos():
        if user_account_dto.user_name.casefold() == user_name.casefold():
            return False
        elif user_account_dto.email.casefold() == user_email.casefold():
            return False
    return True
