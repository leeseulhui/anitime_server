import os
import random
import subprocess
import pymysql
import shutil
from flask import Flask, request, jsonify, render_template
import datetime
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from .views.main_views import bp

import config

# ORM 객체 전역변수 선언
db = SQLAlchemy()
migrate = Migrate()

app = Flask(__name__)

# 라우트 등록
app.register_blueprint(bp)


# flask 애플리케이션 팩토링
def create_app():
    app = Flask(__name__)
    app.config.from_object(config)  # app.config 환경변수로 부르기 위해 추가

    # ORM 적용 및 객체 초기화
    db.init_app(app)
    migrate.init_app(app, db)

    from . import models

    # 블루프린트 적용
    from .views import main_views
    app.register_blueprint(main_views.bp)  # 블루프린트 객체 등록

    return app


# 중복없이 reg_num 생성
alist = []

# #error handler
# @app.errorhandler(500)
# def serverErrorHandler(error):
#     print('서버에 문제 생김')
#   return jsonify({'message' : 'fail'})


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001, debug=True)



