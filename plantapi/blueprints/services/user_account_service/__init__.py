from blueprints.data_provider.user_account_data_provider import *
from blueprints.models.user_accounts import *


def get_user_accounts():
    user_account_models = []
    for userAccountDto in get_user_account_dtos():
        user_account_models.append(
            make_user_account(
                userAccountDto.id,
                userAccountDto.user_name,
                userAccountDto.first_name,
                userAccountDto.last_name,
                userAccountDto.email,
                userAccountDto.password
            )
        )

    return user_account_models


def post_user_account(user_name, first_name, last_name, email, password):
    user_account_dto = add_user_account_dto(
        user_name, first_name, last_name, email, password
    )
    return user_account_dto


def get_user_account_by_id(id):
    user_account_dto = get_user_account_dto_by_id(id)
    try:
        return make_user_account(
            user_account_dto.id,
            user_account_dto.user_name,
            user_account_dto.first_name,
            user_account_dto.last_name,
            user_account_dto.email,
            user_account_dto.password,
        )
    except AttributeError:
        return None


def get_user_account_plants_by_id(id):
    user_account_dto = get_user_account_dto_by_id(id)
    try:
        return make_user_account_with_plant_list(
            user_account_dto.id, user_account_dto.user_name, user_account_dto.plants_b
        )
    except AttributeError:
        return None


def delete_user_account_by_id(id):
    delete_user_account_dto_by_id(id)


def update_user_account_by_id(
    new_user_account_id,
    new_user_name,
    new_first_name,
    new_last_name,
    new_email,
    new_password,
):
    update_user_account = update_user_account_dto_by_id(
        new_user_account_id,
        new_user_name,
        new_first_name,
        new_last_name,
        new_email,
        new_password,
    )
    return update_user_account
