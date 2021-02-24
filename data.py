import util
from psycopg2.extras import RealDictCursor, DictCursor
from psycopg2 import sql
import database_common


@database_common.connection_handler
def add_new_row(cursor: DictCursor, dictionary: dict, target_table: str):
    value_list, column_list = util.generate_col_value_list(dictionary)
    query = sql.SQL("INSERT INTO {} ({}) VALUES ({})").format(
        sql.Identifier(target_table),
        sql.SQL(', ').join(column_list),
        sql.SQL(', ').join([sql.Placeholder()] * len(value_list)))
    cursor.execute(query, tuple(value_list))


@database_common.connection_handler
def get_row(cursor: RealDictCursor, table: str, text_id: int, col: str):
    query = f"SELECT * FROM {table} WHERE {col} = '{text_id}'"
    cursor.execute(query)
    data = cursor.fetchall()
    return data


@database_common.connection_handler
def delete_row(cursor: RealDictCursor, table: str, id: int):
    cursor.execute(f"DELETE FROM {table} WHERE id = {id}")


@database_common.connection_handler
def get_data(cursor: RealDictCursor, table: str):
    query = f"SELECT * FROM {table} ORDER BY id"
    cursor.execute(query)
    return cursor.fetchall()


@database_common.connection_handler
def update_board(cursor: RealDictCursor, board_id: int, new_title: str):
    cursor.execute(f"UPDATE boards SET title = '{new_title}' WHERE id = {board_id}")


@database_common.connection_handler
def update_column(cursor: RealDictCursor, id: int, new_title: str):
    cursor.execute(f"UPDATE statuses SET title = '{new_title}' WHERE id = {id}")