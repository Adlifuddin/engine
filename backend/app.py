from flask import Flask, request, Response
from flask_restful import Resource, Api, reqparse
from sqlalchemy import MetaData, exc
import sqlalchemy as db
from flask_cors import CORS 
from json import dumps
from flask_jsonpify import jsonify
from serializer import *
from connection import CreateConnectionCoreUser
from settings import *
import json

app = Flask(__name__)
CORS(app)
api = Api(app)

parser = reqparse.RequestParser()

class Test(Resource):
    def get(self):
        conn = CreateConnectionCoreUser().connect() # connect to database
        query = conn.execute("SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE';") # This line performs query and returns json result
        data = [dict(zip(tuple (query.keys()) ,i)) for i in query.cursor]
        for i in data:
            print(list(i.values()))
        result = {'data': [dict(zip(tuple (query.keys()) ,i)) for i in query.cursor]}
        return jsonify(result)
class Add(Resource):
    def post(self):
        try: 
            conn = CreateConnectionCoreUser().connect()
            args = request.json
            tableName = args[0]
            file = args[1]
            t = unpack(file)
            n = createTitle(file)
            h = validateName(tableName)
            if h == True:
                data = json.dumps({'success': False, "message": "Table Name Exist"})
                return Response(data, status=400, mimetype='application/json')
            elif h == False:
                conn.execute(f"CREATE TABLE {tableName} ({t})")
                for d in file:
                    va = []
                    value = list(d.values())
                    for i in value:
                        s = i.replace("'", "")
                        va.append(s)
                    str1 = " ' , ' ".join(va)
                    v = f"' {str1} '"
                    conn.execute(f"INSERT INTO {tableName} ({n}) VALUES ({v})")

                data = json.dumps({'success': True, "message": "Successfully Inserted Data to the Database"})
                return Response(data, status=200, mimetype='application/json')
        except Exception:
            print(exc.ProgrammingError.__class__)
            conn.execute(f"DROP TABLE {tableName}")
            data = json.dumps({'success': False, "message": "Error Found"})
            return Response(data, status=400, mimetype='application/json')

class Members(Resource):
    def get(self):
        engine = CreateConnectionCoreUser()
        query = "select a.id, a.first_name, a.last_name, a.email, a.last_login, a.date_joined,c.user_id , STRING_AGG(d.name, ',') as user from (core_user a left join permissions_group_membership c on a.id = c.user_id left join permissions_group d on c.group_id = d.id) group by a.id, c.user_id"     
        connection = engine.connect()
        result = connection.execute(query)
        results = [dict(zip(tuple (result.keys()) ,i)) for i in result.cursor]
        return jsonify(results)


api.add_resource(Test, '/api/test')
api.add_resource(Add, '/api/add')
api.add_resource(Members, '/api/audit/members')

if __name__ == '__main__':
     app.run()