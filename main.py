from flask import Flask, render_template, url_for, request, session, redirect, flash
from util import json_response

import data_handler
import util

app = Flask(__name__)
app.secret_key = b'kn,jhliuZ=(ZUIH,(/%(ds)*)'


@app.route("/", methods=['GET', 'POST'])
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    if "username" in session:
        return render_template('index.html', username=session["username"], user_id=session['user_id'])
    else:
        return render_template('index.html', username=None)


@app.route("/create-board", methods=['POST'])
@json_response
def create_board():
    print(request.get_json())
    title = request.get_json()['title']
    user_id = request.get_json()['user_id']
    return data_handler.create_board(title, user_id)


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


@app.route("/add-column", methods=['POST'])
@json_response
def add_column():
    data = request.get_json()
    return data_handler.add_new_status(data)


@app.route("/update-card-status", methods=['POST'])
@json_response
def update_card_status():
    data = request.get_json()
    return data_handler.update_card_status(data)


@app.route("/update-card-order", methods=['POST'])
@json_response
def update_card_order():
    data = request.get_json()
    return data_handler.update_card_order(data)


@app.route("/rename-column", methods=['POST'])
@json_response
def rename_column():
    status_id = request.get_json()['id']
    new_name = request.get_json()['title']
    return data_handler.rename_column(status_id, new_name)


@app.route("/rename-card", methods=['POST'])
@json_response
def rename_card():
    card_id = int(request.get_json()['id'])
    new_name = request.get_json()['title']
    return data_handler.rename_card(card_id, new_name)


@app.route('/delete-card/<int:card_id>', methods=['DELETE'])
@json_response
def delete_card(card_id):
    return data_handler.delete_card(card_id)


@app.route('/delete-column/<int:column_id>', methods=['DELETE'])
@json_response
def delete_column(column_id):
    return data_handler.delete_column(column_id)

  
@app.route('/registration', methods=['GET', 'POST'])
def registration():
    error = None
    if request.method == 'POST':
        user_data = data_handler.check_user_data(request.form["username"])
        if not user_data:
            data_handler.add_new_user(request.form["username"], request.form["password"])
            flash("Successful registration. Log in to continue.")
            return redirect('/login')
        else:
            error = "Username already taken"
    return render_template('registration.html', error=error)


@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        user_data = data_handler.check_user_data(request.form["username"])
        if user_data:
            correct_password = user_data[0]['hashed_password']
            if util.verify_password(request.form["password"], correct_password):
                session['username'] = user_data[0]["username"]
                session['user_id'] = user_data[0]["id"]
                return redirect('/')
            else:
                error = "Pass or username is wrong!"
        else:
            error = "Pass or username is wrong!"
    return render_template('login.html', error=error)


@app.route('/logout')
def logout():
    session.pop('username', None)
    session.pop('user_id', None)
    return redirect('/')


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
