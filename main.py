from flask import Flask, render_template, url_for, request
from util import json_response

import data_handler

app = Flask(__name__)


@app.route("/", methods=['GET', 'POST'])
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    if request.method == "POST":
        title = request.get_json()['title']
        # user_id = session["user_name"]
        user_id = 0
        data_handler.create_board(title, user_id)
    return render_template('index.html')


@app.route("/get-boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return data_handler.get_boards()


@app.route("/get-cards/<int:board_id>")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return data_handler.get_cards(board_id)


@app.route("/get-statuses")
@json_response
def get_statuses():
    return data_handler.get_statuses()


@app.route("/rename-board", methods=['POST'])
@json_response
def rename_board():
    board_id = request.get_json()['board_id']
    new_name = request.get_json()['title']
    return data_handler.rename_board(board_id, new_name)


@app.route("/create-card", methods=['POST'])
@json_response
def create_card():
    board_id = request.get_json()['board_id']
    card_title = request.get_json()['title']
    status_id = request.get_json()['status_id']
    return data_handler.create_new_card(card_title, board_id, status_id)


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
