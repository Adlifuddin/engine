from flask import Flask, request
from flask_restful import Resource, Api, reqparse
from sqlalchemy import create_engine, MetaData
import sqlalchemy as db
from flask_cors import CORS 
from json import dumps
from flask_jsonpify import jsonify
from serializer import *
from connection import CreateConnectionCoreUser

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

class Members(Resource):
    def get(self):
        engine = CreateConnectionCoreUser()
        query = "select * from core_user"
        connection = engine.connect()
        result = connection.execute(query)
        results = [dict(zip(tuple (result.keys()) ,i)) for i in result.cursor]
        return jsonify(results)

class Database(Resource):
    def get(self):
        engine = CreateConnectionCoreUser()
        query = "select metabase_database.name ,count(distinct metabase_table.schema) as schema,count(metabase_table.name) as table, metabase_database.metadata_sync_schedule,metabase_database.created_at from public.metabase_table left join public.metabase_database on metabase_table.db_id = metabase_database.id group by metabase_table.db_id,metabase_database.name, metabase_database.metadata_sync_schedule, metabase_database.created_at"
        connection = engine.connect()
        result = connection.execute(query)
        results = [dict(zip(tuple (result.keys()) ,i)) for i in result.cursor]
        return jsonify(results)


api.add_resource(Test, '/api/test')
api.add_resource(Add, '/api/add')
api.add_resource(Members, '/api/audit/members')
api.add_resource(Database, '/api/audit/database')


if __name__ == '__main__':
     app.run()