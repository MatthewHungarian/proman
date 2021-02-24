import persistence
import data


def get_card_status(status_id):
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    statuses = persistence.get_statuses()
    return next((status['title'] for status in statuses if status['id'] == str(status_id)), 'Unknown')


def get_boards():
    """
    Gather all boards
    :return:
    """
    return data.get_data("boards")


def get_statuses():
    return data.get_data("statuses")


def get_cards_for_board(board_id):
    persistence.clear_cache()
    all_cards = persistence.get_cards()
    matching_cards = []
    for card in all_cards:
        if card['board_id'] == str(board_id):
            card['status_id'] = get_card_status(card['status_id'])  # Set textual status for the card
            matching_cards.append(card)
    return matching_cards


def get_cards(board_id):
    return data.get_row("cards", board_id, "board_id")


def rename_board(board_id, new_name):
    return data.update_board(board_id, new_name)


def add_new_status(new_status):
    print(new_status)
    return data.add_new_row(new_status, "statuses")
