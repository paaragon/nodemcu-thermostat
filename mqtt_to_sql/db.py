from contextlib import contextmanager
from psycopg2 import pool
import config

db_pool = pool.SimpleConnectionPool(1, 10,
                                    host=config.PG_HOST,
                                    database=config.PG_DB,
                                    user=config.PG_USER,
                                    password=config.PG_PASS,
                                    port=config.PG_PORT)


@contextmanager
def db():
    con = db_pool.getconn()
    cur = con.cursor()
    try:
        yield con, cur
    finally:
        cur.close()
        db_pool.putconn(con)


def save_startup(msg):
    with db() as (conn, cursor):
        try:
            cursor.execute("INSERT INTO startup (date, message) VALUES (now(), %s)",
                           (msg,))
            conn.commit()
        except Exception as e:
            print(str(e))


def save_read(temperature, humidity):
    with db() as (conn, cursor):
        try:
            cursor.execute("INSERT INTO read (date, temperature, humidity) VALUES (now(), %s, %s)",
                           (temperature, humidity))
            conn.commit()
        except Exception as e:
            print(str(e))


def save_status(status):
    with db() as (conn, cursor):
        try:
            cursor.execute("INSERT INTO status (date, status) VALUES (now(), %s)",
                           (status,))
            conn.commit()
        except Exception as e:
            print(str(e))


def save_set(setted):
    with db() as (conn, cursor):
        try:
            cursor.execute("INSERT INTO setted (date, setted) VALUES (now(), %s)",
                           (setted,))
            conn.commit()
        except Exception as e:
            print(str(e))
