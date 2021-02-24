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
                    conn.execute(f'INSERT INTO {tableName} ({n}) VALUES ({v})')
                data = json.dumps({'success': True, "message": "Successfully Inserted Data to the Database"})
                return Response(data, status=200, mimetype='application/json')
        except Exception:
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

class MembersOverview(Resource):
    def get(self):
        engine = CreateConnectionCoreUser()
        query = "select b.first_name as user, sum(a.running_time) as exectime from public.query_execution a left join public.core_user b on a.executor_id = b.id left join public.metabase_database c on a.database_id = c.id where b.first_name is not null group by b.first_name order by exectime desc limit 10"     
        connection = engine.connect()
        result = connection.execute(query)
        results = [dict(zip(tuple (result.keys()) ,i)) for i in result.cursor]
        return jsonify(results)

class Databases(Resource):
    def get(self):
        engine = CreateConnectionCoreUser()
        query = "select metabase_database.name ,count(distinct metabase_table.schema) as schema,count(metabase_table.name) as table, metabase_database.metadata_sync_schedule,metabase_database.created_at from public.metabase_table left join public.metabase_database on metabase_table.db_id = metabase_database.id group by metabase_table.db_id,metabase_database.name, metabase_database.metadata_sync_schedule, metabase_database.created_at"
        connection = engine.connect()
        result = connection.execute(query)
        results = [dict(zip(tuple (result.keys()) ,i)) for i in result.cursor]
        return jsonify(results)

class Tables(Resource):
    def get(self):
        engine = CreateConnectionCoreUser()
        query = "Select metabase_table.id, metabase_database.name as db_name, metabase_table.name as table_name, metabase_table.schema, metabase_table.display_name FROM metabase_table Right Join metabase_database ON metabase_database.id=metabase_table.db_id"
        connection = engine.connect()
        result = connection.execute(query)
        results = [dict(zip(tuple (result.keys()) ,i)) for i in result.cursor]
        return jsonify(results)

class Checks(Resource):
    def get(self):
        engine = CreateConnectionCoreUser()
        query = "Select * from core_user"
        connection = engine.connect()
        result = connection.execute(query)
        results = [dict(zip(tuple (result.keys()) ,i)) for i in result.cursor]
        return jsonify(results)

class Schema(Resource):
    def get(self):
        engine = CreateConnectionCoreUser()
        query = "select b.name , a.schema as schema,count(distinct a.name) as table,(count(distinct c.id))as query from public.metabase_table a left join public.metabase_database b on a.db_id = b.id  left join public.report_card c on c.database_id = a.db_id where c.table_id is not null group by a.db_id,b.name, a.schema order by a.db_id"
        connection = engine.connect()
        result = connection.execute(query)
        results = [dict(zip(tuple (result.keys()) ,i)) for i in result.cursor]
        return jsonify(results)

class Questions(Resource):
    def get(self):
        engine = CreateConnectionCoreUser()
        query = "Select a.name as name, f.name as collection, e.name as database, b.name as table, d.first_name as created, a.public_uuid as publicLink, a.cache_ttl as cacheTTL, count(g.model_id) as views from public.report_card a left join public.metabase_table b on a.table_id = b.id left join public.core_user d on a.creator_id = d.id left join public.metabase_database e on a.database_id = e.id left join public.collection f on a.collection_id = f.id left join public.view_log g on a.id = g.model_id group by a.name,f.name,e.name,b.name,d.first_name, a.public_uuid, a.cache_ttl order by a.name asc"
        connection = engine.connect()
        result = connection.execute(query)
        results = [dict(zip(tuple (result.keys()) ,i)) for i in result.cursor]
        return jsonify(results)

class Dashboards(Resource):
    def get(self):
        engine = CreateConnectionCoreUser()
        query = "Select a.name, count(distinct b.id) as views, avg(d.running_time)::numeric(10,2) as exectime ,count(distinct c.id) as cards,e.first_name as creator, a.public_uuid as publicLink, a.created_at as created, a.updated_at as updated from public.report_dashboard a left join public.view_log b on a.id = b.model_id left join public.report_dashboardcard c on a.id = c.dashboard_id left join public.query_execution d on c.card_id = d.card_id left join public.core_user e on a.creator_id = e.id group by a.name,e.first_name,a.public_uuid,a.created_at,a.updated_at"
        connection = engine.connect()
        result = connection.execute(query)
        results = [dict(zip(tuple (result.keys()) ,i)) for i in result.cursor]
        return jsonify(results)

class AuditLog(Resource):
    def get(self):
        engine = CreateConnectionCoreUser()
        query = "select d.name as query, c.first_name as viewedBy, a.native as type,b.name as sourceDB, e.name as table, f.name as collection, a.started_at as viewedon from public.query_execution a inner join public.metabase_database b on a.database_id = b.id inner join public.core_user c on a.executor_id = c.id left join public.report_card d on a.card_id = d.id left join public.metabase_table e on d.table_id = e.id left join public.collection f on d.collection_id = f.id group by b.name,d.name, c.first_name, a.native,a.started_at,e.name,f.name order by a.started_at desc limit 20"
        connection = engine.connect()
        result = connection.execute(query)
        results = [dict(zip(tuple (result.keys()) ,i)) for i in result.cursor]
        return jsonify(results)

class Downloads(Resource):
    def get(self):
        engine = CreateConnectionCoreUser()
        query = "select a.started_at as downloadAt, a.result_rows as rowsDownloaded, b.name as query, a.native as queryType, c.name as sourceDatabases, d.name as tables, e.first_name as user from public.query_execution a left join public.report_card b on a.card_id = b.id left join public.metabase_database c on a.database_id = c.id left join public.metabase_table d on b.table_id = d.id left join public.core_user e on a.executor_id = e.id where a.context ilike 'csv-download' group by b.name,a.native,c.name,d.name,a.started_at,a.result_rows,e.first_name"
        connection = engine.connect()
        result = connection.execute(query)
        results = [dict(zip(tuple (result.keys()) ,i)) for i in result.cursor]
        return jsonify(results)


api.add_resource(Test, '/api/test')
api.add_resource(Add, '/api/add')
api.add_resource(Members, '/api/audit/members')
api.add_resource(Databases, '/api/audit/databases')
api.add_resource(Tables, '/api/audit/tables')
api.add_resource(Checks, '/api/audit/checks')
api.add_resource(Schema, '/api/audit/schemas')
api.add_resource(Questions, '/api/audit/questions')
api.add_resource(Dashboards, '/api/audit/dashboards')
api.add_resource(MembersOverview, '/api/audit/members/overview')
api.add_resource(AuditLog, '/api/audit/members/log')
api.add_resource(Downloads, '/api/audit/downloads')






if __name__ == '__main__':
     app.run()