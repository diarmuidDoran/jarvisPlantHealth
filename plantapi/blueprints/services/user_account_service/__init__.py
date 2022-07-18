from blueprints.data_provider.user_account_data_provider import *
from blueprints.models.user_accounts import *


def getUserAccounts():
    user_account_models = []
    for userAccountDto in getUserAccountDtos():
        user_account_models.append(make_user_account(userAccountDto.id, userAccountDto.user_name,
                                                     userAccountDto.first_name, userAccountDto.last_name,
                                                     userAccountDto.email, userAccountDto.password))

    return user_account_models


def postUserAccount():
    user_account_dto = addUserAccountDto()
    return user_account_dto


def getUserAccountById(id):
    user_account_dto = getUserAccountDtoById(id)
    return make_user_account(user_account_dto.id, user_account_dto.user_name, user_account_dto.first_name,
                             user_account_dto.last_name, user_account_dto.email, user_account_dto.password)


def getUserAccountPlantsById(id):
    user_account_dto = getUserAccountDtoById(id)
    return make_user_account_with_plant_list(user_account_dto.id,
                                             user_account_dto.user_name,
                                             user_account_dto.plants_b)


def deleteUserAccountById(id):
    deleteUserAccountDtoById(id)


def updateUserAccountById(id):
    update_user_account = updateUserAccountDtoById(id)
    return update_user_account
