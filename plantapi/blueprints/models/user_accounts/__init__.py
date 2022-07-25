from blueprints.services.plant_service import getPlants


class User_Account(object):
    id = 0
    user_name = ""
    first_name = ""
    last_name = ""
    email = ""
    password = ""

    # The class "constructor" - an initializer
    def __init__(self, id, user_name, first_name, last_name, email, password):
        self.id = id
        self.user_name = user_name
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = password


class User_Account_Plants(object):
    id = 0
    user_name = ""
    plants = []

    # The class "constructor" - an initializer
    def __init__(self, id, user_name, plants):
        self.id = id
        self.user_name = user_name
        self.plants = plants


def make_user_account(id, user_name, first_name, last_name, email, password):
    user_account = User_Account(id, user_name, first_name, last_name, email, password)
    return user_account


def make_user_account_with_plant_list(id, user_name, plants):
    user_account_data = User_Account_Plants(id, user_name, plants)
    return user_account_data


def make_new_user_account(user_name, first_name, last_name, email, password):
    user_account = User_Account(user_name=user_name, first_name=first_name, last_name=last_name, email=email,
                                password=password)
    return user_account
