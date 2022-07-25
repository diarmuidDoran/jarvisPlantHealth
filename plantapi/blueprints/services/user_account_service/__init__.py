from blueprints.data_provider.user_account_data_provider import *
from blueprints.models.plants import make_plant
from blueprints.models.user_accounts import *


def getUserAccounts():
    user_account_models = []
    for userAccountDto in getUserAccountDtos():
        user_account_models.append(make_user_account(userAccountDto.id, userAccountDto.user_name,
                                                     userAccountDto.first_name, userAccountDto.last_name,
                                                     userAccountDto.email, userAccountDto.password))

    return user_account_models


def postUserAccount(user_name, first_name, last_name, email, password):
    user_account_dto = addUserAccountDto(user_name, first_name, last_name, email, password)
    return user_account_dto


def getUserAccountById(id):
    user_account_dto = getUserAccountDtoById(id)
    return make_user_account(user_account_dto.id, user_account_dto.user_name, user_account_dto.first_name,
                             user_account_dto.last_name, user_account_dto.email, user_account_dto.password)


def getUserAccountPlantsById(id):
    user_account_dto = getUserAccountDtoById(id)
    userPlantModels = []
    for userPlantDto in getPlants():
        if userPlantDto.room_id == id:
            userPlantModels.append(make_plant(userPlantDto.id, userPlantDto.name, userPlantDto.room_id))
    return make_user_account_with_plant_list(user_account_dto.id,
                                             user_account_dto.user_name,
                                             userPlantModels)


def deleteUserAccountById(id):
    deleteUserAccountDtoById(id)


def updateUserAccountById(new_user_account_id, new_user_name, new_first_name, new_last_name, new_email, new_password):
    update_user_account = updateUserAccountDtoById(new_user_account_id, new_user_name, new_first_name, new_last_name,
                                                   new_email, new_password)
    return update_user_account
