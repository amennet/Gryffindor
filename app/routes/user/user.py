# coding=utf-8

from app import app,User
from app.task.user.user import (query_user_by_account,
                                save_user_info,
                                check_user_info)
from flask import render_template, request, jsonify, redirect, url_for
from flask_login import login_user
import os


@app.route('/',methods=['GET'])
def default_url():
    '''
    默认路由
    :return:
    '''
    return redirect(url_for('get_user_login'))


@app.route('/user/register',methods=['POST', 'GET'])
def post_user_register():
    '''
    用户注册
    :return:
    '''
    if request.method == 'POST':
        info = {}
        try:
            info['account'] = str(request.form['account'])
            # 检测账号是否重复
            if query_user_by_account(info['account']):
                return jsonify(dict(message='repeat'))
            else:
                file = request.files['file'] if len(request.files) > 0 else None
                save_user_info(file, request.form, info)
                return jsonify(dict(message='success'))
        except Exception,e:
            return jsonify(dict(message='fail'))
    else:
        return render_template('user/register.html')


@app.route('/user/login',methods=['POST','GET'])
def get_user_login():
    '''
    用户登陆
    :return:
    '''
    next_url = request.args
    next_url = str(next_url['next']) if next_url else ''

    if request.method == 'POST':
        try:
            if check_user_info(request.form):
                user = User.objects(account=str(request.form['account'])).first()
                login_user(user)
                next_url = request.form['next']
                if (str(next_url)):
                    next_url = ''
                return jsonify(dict(message='success',next=str(next_url),img=str(user['userimage'])))
            else:
                return jsonify(dict(message='fail'))
        except Exception,e:
            return jsonify(dict(message='error'))
    else:
        return render_template('user/login.html',next=next_url)

