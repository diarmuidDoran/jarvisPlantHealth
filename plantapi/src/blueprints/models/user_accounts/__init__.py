class User_Account(object):
    id = 0
    user_name = ""
    first_name = ""
    last_name = ""
    email = ""
    password = ""
    is_deleted = bool

    # The class "constructor" - an initializer
    def __init__(self, id, user_name, first_name, last_name, email, password, is_deleted):
        self.id = id
        self.user_name = user_name
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = password
        self.is_deleted = is_deleted


class All_User_Account_Plant(object):
    id = 0
    user_name = ""
    first_name = ""
    last_name = ""
    email = ""
    password = ""
    is_delete = bool
    plants_b = []

    # The class "constructor" - an initializer
    def __init__(self, id, user_name, first_name, last_name, email, password, is_deleted, plants_b):
        self.id = id
        self.user_name = user_name
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = password
        self.is_delete = is_deleted
        self.plants_b = plants_b


class User_Account_Plants(object):
    id = 0
    user_name = ""
    is_delete = bool
    plants = []

    # The class "constructor" - an initializer
    def __init__(self, id, user_name, is_deleted, plants):
        self.id = id
        self.user_name = user_name
        self.is_delete = is_deleted
        self.plants = plants


def make_user_account(id, user_name, first_name, last_name, email, password, is_deleted):
    user_account = User_Account(id, user_name, first_name, last_name, email, password, is_deleted)
    return user_account


def make_user_account_with_plant_list(id, user_name, is_deleted, plants):
    user_account_data = User_Account_Plants(id, user_name, is_deleted, plants)
    return user_account_data


def make_new_user_account(user_name, first_name, last_name, email, password):
    user_account = User_Account(
        user_name=user_name,
        first_name=first_name,
        last_name=last_name,
        email=email,
        password=password,
        is_deleted=False
    )
    return user_account
