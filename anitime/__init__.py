import os
import random
import subprocess
import pymysql
import shutil
from flask import Flask, request, jsonify, render_template
import datetime
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
import config

app = Flask(__name__)

#ORM 객체 전역변수 선언
db = SQLAlchemy()
migrate = Migrate()

#flask 애플리케이션 팩토링
def create_app():
    app = Flask(__name__)
    app.config.from_object(config)

    #ORM 적용 및 객체 초기화
    db.init_app(app)
    migrate.init_app(app, db)
    from . import models

    #블루프린트 적용
    from .views import main_views
    app.register_blueprint(main_views.bp)       #블루프린트 객체 등록

    return app

#중복없이 reg_num 생성
alist=[]

#error handler
@app.errorhandler(500)
def serverErrorHandler(error):
    return jsonify({'message':"fail...sorry"}, 500)

if __name__=="__app__":
    app.config['TRAP_HTTP_EXCEPTIONS']=True
    app.register_error_handler(Exception,serverErrorHandler)
    app.run(host='0.0.0.0', debug=True)


