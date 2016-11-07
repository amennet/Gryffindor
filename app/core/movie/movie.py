# coding=utf-8

from app import BasicInfo
from config import DEFAULT_PAGE_SIZE
import re

def select_basic_info_by_name_blur(name, num):
    '''
    通过名字片段查找电影基本信息
    （中文名字和英文名字都参加匹配）
    :param name: 名字片段
    :return:
    '''
    search = { '__raw__' :
                   { '$or': [{'info.cnname': re.compile(name)},
                             {'info.enname': re.compile(name)}] }}
    try:
        basic = BasicInfo.objects(**search).paginate(page=num, per_page=DEFAULT_PAGE_SIZE)
        if basic:
            return basic
        else:
            return None
    except Exception,e:
        print e.message
        return None

def select_by_id(db,id):
    '''
    通过id查找电影的某种信息
    :param db: 表
    :param id: 电影的id
    :return:
    '''
    try:
        info = db.objects(movieid=id).first()
        if info:
            return info.to_dict()
        else:
            return None
    except Exception,e:
        print e.message
        return None

def select_by_userid_movieid(db,userid,movieid):
    '''
    通过用户id、电影id查找表里面的信息
    :param db: 表
    :param userid: 用户的id
    :param movieid: 电影的id
    :return:
    '''
    try:
        info = db.objects(userId=userid,movieId=movieid).first()
        if info:
            return info
        else:
            return None
    except Exception,e:
        print e.message
        return None

def select_by_userid_movieid_all(db,userid,movieid):
    '''
    通过用户id、电影id查找表里面的所有信息
    :param db: 表
    :param userid: 用户id
    :param movieid: 电影的id
    :return:
    '''
    try:
        info = db.objects(userId=userid,movieId=movieid).all()
        if info:
            return info
        else:
            return None
    except Exception,e:
        print e.message
        return None

def select_by_objectid(db,id):
    '''
    通过默认的id进行查询
    :param db:
    :param id:
    :return:
    '''
    try:
        info=db.objects(id=id).first()
        if info:
            return info.to_dict()
        else:
            return None
    except Exception,e:
        print e.message
        return None