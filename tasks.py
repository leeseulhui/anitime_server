#tasks.py

from celery import Celery

app = Celery('tasks', broker='amqp://anitime@localhost//')

@app.task
def add(x, y):
    return x + y