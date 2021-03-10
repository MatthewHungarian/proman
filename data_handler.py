import data
import util


def get_boards():
    return data.get_data("boards")


def get_statuses():
    return data.get_data("statuses")


def get_cards(board_id):
    return data.get_row("cards", board_id, "board_id")


def create_board(title, user_id):
    data_dictionary = {"title": title, "user_id": user_id}
    return data.add_new_row(data_dictionary, "boards")


def rename_board(board_id, new_name):
    return data.update_row('boards', 'title', new_name, board_id)


def rename_column(id, new_name):
    return data.update_row('statuses', 'title', new_name, id)


def rename_card(id, new_name):
    return data.update_row('cards', 'title', new_name, id)


def create_new_card(card_name, board_id, status_id):
    card_data = {"title": card_name, "board_id": board_id, "status_id": status_id, "order_n": 0, "is_archived": False}
    return data.add_new_row(card_data, 'cards')


def add_new_status(new_status):
    return data.add_new_row(new_status, "statuses")


def update_card_status(card_data):
    return data.update_row('cards', 'status_id', card_data['status_id'], card_data['card_id'])


def update_card_order(card_data):
    for card in card_data:
        data.update_row('cards', 'order_n', card['order_n'], card['card_id'])
        
        
def check_user_data(username):
    return data.get_row("users", username, "username")


def add_new_user(username, password):
    hashed_password = util.hash_password(password)
    return data.add_new_row({"username": username, "hashed_password": hashed_password}, "users")


def delete_card(card_id):
    return data.delete_row('cards', card_id)


def update_archive_status(card_data):
    return data.update_row('cards', 'is_archived', card_data['is_archived'], card_data['card_id'])


def update_board_archive_status(board_data):
    return data.update_row('boards', 'has_archive', board_data['has_archive'], board_data['board_id'])
