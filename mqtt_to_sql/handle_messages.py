import db
import json


def handle_startup(msg):
    print("handle_startup")
    db.save_startup(msg)


def handle_read(msg):
    fixed_quotes = msg.replace("'", "\"")
    print("handle_read " + fixed_quotes)
    read_info = json.loads(fixed_quotes)
    temperature = read_info["temp"]
    humidity = read_info["hum"]
    db.save_read(temperature, humidity)


def handle_status(msg):
    print("handle_status")
    db.save_status(int(msg))


def handle_set(msg):
    print("handle_set")
    db.save_set(int(msg))
