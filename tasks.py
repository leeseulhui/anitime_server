from flask import Flask
from celery import Celery

app = Flask(__name__)

# Celery 앱 생성
celery_app = Celery(
    'anitime',
    broker='amqp://anitime:anitime@localhost:5672//',
    backend='redis://localhost:6379/0',
    include=['tasks']  # Celery 작업 위치 설정 (tasks.py 파일을 포함하는 경우)
)

# Flask 앱 객체와 Celery 앱 객체 연결
celery_app.conf.update(app.config)

# Celery 작업 정의
@celery_app.task
def anitime():
    import datetime

    now = datetime.datetime.now()
    result = f"Current time is: {now}"

    # 작업 결과 반환
    return result

# Flask 라우트
@app.route('/')
def send_message():
    # Celery 작업 실행
    anitime.delay()

    return 'Task sent to Celery'

if __name__ == '__main__':
    app.run()
