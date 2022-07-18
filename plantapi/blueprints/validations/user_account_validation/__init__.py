from blueprints.data_provider.user_account_data_provider import getUserAccountDtos


def user_account_is_valid(user_name, user_email):

    for user_account_dto in getUserAccountDtos():
        if user_account_dto.user_name.casefold() == user_name.casefold():
            return False
        elif user_account_dto.email.casefold() == user_email.casefold():
            return False
    return True
