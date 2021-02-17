from flask import Flask, request
from flask_restful import Resource, Api, reqparse
from sqlalchemy import create_engine
from flask_cors import CORS 
from json import dumps
from flask_jsonpify import jsonify
from . import serializer

db_connect = create_engine("postgres://postgres:skymind123@192.168.1.124:5432/google_drive")
app = Flask(__name__)
CORS(app)
api = Api(app)

parser = reqparse.RequestParser()

class Test(Resource):
    def get(self):
        conn = db_connect.connect() # connect to database
        query = conn.execute("select * from test") # This line performs query and returns json result
        result = {'data': [dict(zip(tuple (query.keys()) ,i)) for i in query.cursor]}
        return jsonify(result)

class Add(Resource):
    def post(self):
        conn = db_connect.connect()
        args = request.json
        t = serializer.unpack(args)
        n = serializer.createTitle(args)
        print(t)
        conn.execute(f"CREATE TABLE test ({t})")
        for d in args:
            va = []
            value = list(d.values())
            for i in value:
                s = i.replace("'", "")
                va.append(s)
            str1 = " ' , ' ".join(va)
            v = f"' {str1} '"
            conn.execute(f'INSERT INTO test ({n}) VALUES ({v})')

        return jsonify({'status': 200, 'success': True})

api.add_resource(Test, '/api/test')
api.add_resource(Add, '/api/add')

if __name__ == '__main__':
     app.run()