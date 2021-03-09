from flask import Flask, request, Response
from flask_restful import Resource, reqparse, Api
from flask_cors import CORS 
from flask_jsonpify import jsonify, jsonpify
from .serializer import *
from .connection import CreateConnectionCoreUser, CreateConnectionDriveUser
from .settings import *
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
        return jsonpify(result)
class Add(Resource):
    def post(self):
        try: 
            conn = CreateConnectionDriveUser().connect()
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
        return jsonpify(results)
class MembersOverview(Resource):
    def get(self):
        engine = CreateConnectionCoreUser()
        query = "select concat(b.first_name,' ',b.last_name) as user, sum(ROUND(a.running_time)/60000)::numeric(10,0) as exectime from public.query_execution a left join public.core_user b on a.executor_id = b.id left join public.metabase_database c on a.database_id = c.id where b.first_name is not null group by b.first_name, b.last_name order by exectime desc limit 10"
        connection = engine.connect()
        result = connection.execute(query)
        results = [dict(zip(tuple (result.keys()) ,i)) for i in result.cursor]
        li = parseFloat(results, "exectime")
        return jsonpify(li)

class MembersMostCreated(Resource):
    def get(self):
        engine = CreateConnectionCoreUser()
        query = "with totalCard as(select count(*) as sum, creator_id from report_card group by creator_id),totalDashboard as(select count(*) as sum , creator_id from report_dashboard group by creator_id),total as(select sum(a.sum+b.sum) as total, a.creator_id from totalCard a left join totalDashboard b on a.creator_id = b.creator_id group by a.creator_id) select total as total, concat(b.first_name,' ',b.last_name) as name from total a left join core_user b on a.creator_id = b.id where total is not null order by total desc limit 10"
        connection = engine.connect()
        result = connection.execute(query)
        results = [dict(zip(tuple (result.keys()) ,i)) for i in result.cursor]
        li = parseFloat(results, "total")
        return jsonpify(li)

class MembersActivenNew(Resource):
    def get(self):
        engine = CreateConnectionCoreUser()
        query = "select count(distinct executor_id) as active, started_at::date as date from query_execution group by date union select count(distinct id) as newuser, date_joined::date as date from core_user group by date_joined order by date asc"
        connection = engine.connect()
        result = connection.execute(query)
        results = [dict(zip(tuple (result.keys()) ,i)) for i in result.cursor]
        return jsonpify(results)


class Databases(Resource):
    def get(self):
        engine = CreateConnectionCoreUser()
        query = "select metabase_database.name ,count(distinct metabase_table.schema) as schema,count(metabase_table.name) as table, metabase_database.metadata_sync_schedule,metabase_database.created_at from public.metabase_table left join public.metabase_database on metabase_table.db_id = metabase_database.id group by metabase_table.db_id,metabase_database.name, metabase_database.metadata_sync_schedule, metabase_database.created_at"
        connection = engine.connect()
        result = connection.execute(query)
        results = [dict(zip(tuple (result.keys()) ,i)) for i in result.cursor]
        return jsonpify(results)

class DatabasesAvgExecAndQuery(Resource):
    def get(self):
        engine = CreateConnectionCoreUser()
        query = "select count(distinct a.id) as queries, avg(a.running_time)::numeric(10,2) as avgexectime ,b.name as db from query_execution a left join metabase_database b on a.database_id = b.id where a.card_id is not null and a.database_id is not null and b.id is not null group by b.name order by b.name asc"
        connection = engine.connect()
        result = connection.execute(query)
        results = [dict(zip(tuple (result.keys()) ,i)) for i in result.cursor]
        li = parseFloat(results, "avgexectime")
        return jsonpify(li)

class DatabasesQuery(Resource):
    def get(self):
        engine = CreateConnectionCoreUser()
        query = "select count(a.id) as queries ,b.name as db,a.started_at::DATE as date from query_execution a left join metabase_database b on a.database_id = b.id where a.database_id is not null group by database_id,date,b.name order by current_date asc"
        connection = engine.connect()
        result = connection.execute(query)
        results = [dict(zip(tuple (result.keys()) ,i)) for i in result.cursor]
        return jsonpify(results)
        

class Tables(Resource):
    def get(self):
        engine = CreateConnectionCoreUser()
        query = "Select metabase_table.id, metabase_database.name as db_name, metabase_table.name as table_name, metabase_table.schema, metabase_table.display_name FROM metabase_table Right Join metabase_database ON metabase_database.id=metabase_table.db_id"
        connection = engine.connect()
        result = connection.execute(query)
        results = [dict(zip(tuple (result.keys()) ,i)) for i in result.cursor]
        return jsonpify(results)

class TableMostQueried(Resource):
    def get(self):
        engine = CreateConnectionCoreUser()
        query = "select count(a.running_time) as exec, concat(d.name,' ', c.schema, ' ',c.name) as tables from query_execution a left join report_card b on a.card_id = b.id left join metabase_table c on b.table_id=c.id left join metabase_database d on c.db_id = d.id where c.name is not null group by c.name , d.name, c.schema order by exec desc limit 10"
        connection = engine.connect()
        result = connection.execute(query)
        results = [dict(zip(tuple (result.keys()) ,i)) for i in result.cursor]
        return jsonpify(results)


class TableLeastQueried(Resource):
    def get(self):
        engine = CreateConnectionCoreUser()
        query = "select count(a.running_time) as exec, concat(d.name,' ', c.schema, ' ',c.name) as tables from query_execution a left join report_card b on a.card_id = b.id left join metabase_table c on b.table_id=c.id left join metabase_database d on c.db_id = d.id where c.name is not null group by c.name , d.name, c.schema order by exec asc limit 10"
        connection = engine.connect()
        result = connection.execute(query)
        results = [dict(zip(tuple (result.keys()) ,i)) for i in result.cursor]
        return jsonpify(results)

class Checks(Resource):
    def get(self):
        engine = CreateConnectionCoreUser()
        query = "Select * from core_user"
        connection = engine.connect()
        result = connection.execute(query)
        results = [dict(zip(tuple (result.keys()) ,i)) for i in result.cursor]
        return jsonpify(results)

class Schema(Resource):
    def get(self):
        engine = CreateConnectionCoreUser()
        query = "select b.name , a.schema as schema,count(distinct a.name) as table,(count(distinct c.id))as query from public.metabase_table a left join public.metabase_database b on a.db_id = b.id  left join public.report_card c on c.database_id = a.db_id where c.table_id is not null group by a.db_id,b.name, a.schema order by a.db_id"
        connection = engine.connect()
        result = connection.execute(query)
        results = [dict(zip(tuple (result.keys()) ,i)) for i in result.cursor]
        return jsonpify(results)

class SchemaMostQueried(Resource):
    def get(self):
        engine = CreateConnectionCoreUser()
        query = "select count(a.running_time) as exec, concat(d.name, ' ', c.schema) as schema from query_execution a left join report_card b on a.card_id = b.id left join metabase_table c on b.table_id=c.id left join metabase_database d on c.db_id = d.id where c.name is not null group by d.name,c.schema order by exec desc limit 10"
        connection = engine.connect()
        result = connection.execute(query)
        results = [dict(zip(tuple (result.keys()) ,i)) for i in result.cursor]
        return jsonpify(results)

class SchemaSlowest(Resource):
    def get(self):
        engine = CreateConnectionCoreUser()
        query = "select avg(a.running_time)::numeric(10,2) as avgexec, concat(b.name,' ',c.schema) as schema from query_execution a left join metabase_database b on a.database_id = b.id left join metabase_table c on b.id = c.db_id where a.card_id is not null and a.database_id is not null and c.id is not null group by b.name,c.schema order by avgexec desc limit 10"
        connection = engine.connect()
        result = connection.execute(query)
        results = [dict(zip(tuple (result.keys()) ,i)) for i in result.cursor]
        li = parseFloat(results, "avgexec")
        return jsonpify(li)

class Questions(Resource):
    def get(self):
        engine = CreateConnectionCoreUser()
        query = "Select a.name as name, f.name as collection, e.name as database, b.name as table, d.first_name as created, a.public_uuid as publicLink, a.cache_ttl as cacheTTL, count(g.model_id) as views from public.report_card a left join public.metabase_table b on a.table_id = b.id left join public.core_user d on a.creator_id = d.id left join public.metabase_database e on a.database_id = e.id left join public.collection f on a.collection_id = f.id left join public.view_log g on a.id = g.model_id group by a.name,f.name,e.name,b.name,d.first_name, a.public_uuid, a.cache_ttl order by a.name asc"
        connection = engine.connect()
        result = connection.execute(query)
        results = [dict(zip(tuple (result.keys()) ,i)) for i in result.cursor]
        return jsonpify(results)


class QuestionsPopularQueries(Resource):
    def get(self):
        engine = CreateConnectionCoreUser()
        query = "select b.name as card, count(a.id) as executions from query_execution a left join report_card b on a.card_id = b.id where a.card_id is not null and b.id is not null group by b.name order by executions desc limit 10"
        connection = engine.connect()
        result = connection.execute(query)
        results = [dict(zip(tuple (result.keys()) ,i)) for i in result.cursor]
        return jsonpify(results)

class QuestionsSlowestQueries(Resource):
    def get(self):
        engine = CreateConnectionCoreUser()
        query = "select b.name as card, avg(a.running_time)::numeric(10,2) as avgrunningtime from query_execution a left join report_card b on a.card_id = b.id where a.card_id is not null and b.id is not null group by b.name order by avgrunningtime desc limit 10"
        connection = engine.connect()
        result = connection.execute(query)
        results = [dict(zip(tuple (result.keys()) ,i)) for i in result.cursor]
        li = parseFloat(results, "avgrunningtime")
        return jsonpify(li)

class Dashboards(Resource):
    def get(self):
        engine = CreateConnectionCoreUser()
        query = "Select a.name, count(distinct b.id) as views, avg(d.running_time)::numeric(10,2) as exectime ,count(distinct c.id) as cards,e.first_name as creator, a.public_uuid as publicLink, a.created_at as created, a.updated_at as updated from public.report_dashboard a left join public.view_log b on a.id = b.model_id left join public.report_dashboardcard c on a.id = c.dashboard_id left join public.query_execution d on c.card_id = d.card_id left join public.core_user e on a.creator_id = e.id group by a.name,e.first_name,a.public_uuid,a.created_at,a.updated_at"
        connection = engine.connect()
        result = connection.execute(query)
        results = [dict(zip(tuple (result.keys()) ,i)) for i in result.cursor]
        return jsonpify(results)

class DashboardsMostPopular(Resource):
    def get(self):
        engine = CreateConnectionCoreUser()
        query = "select count(distinct a.id) as views, b.name as dashboard, avg(distinct d.running_time)::numeric(10,2) as avgrunningtime from view_log a left join report_dashboard b on a.model_id = b.id left join report_dashboardcard c on a.model_id = c.card_id left join query_execution d on c.card_id = d.card_id where a.model_id is not null and b.id is not null and c.card_id is not null group by b.name order by views desc limit 10"
        connection = engine.connect()
        result = connection.execute(query)
        results = [dict(zip(tuple (result.keys()) ,i)) for i in result.cursor]
        li = parseFloat(results, "avgrunningtime")
        return jsonpify(li)

class DashboardsCommonQuestion(Resource):
    def get(self):
        engine = CreateConnectionCoreUser()
        query = "select  count(a.card_id) as count, b.name as card from report_dashboardcard a left join report_card b on a.card_id = b.id group by card_id, b.name order by count desc limit 10"
        connection = engine.connect()
        result = connection.execute(query)
        results = [dict(zip(tuple (result.keys()) ,i)) for i in result.cursor]
        return jsonpify(results)

class DashboardsViewsnSaved(Resource):
    def get(self):
        engine = CreateConnectionCoreUser()
        query = "select count(*) as count, timestamp::date as date from view_log where model ilike 'dashboard' group by timestamp::date union all select count(*) as count , created_at::date as date from report_dashboard group by created_at::date order by date asc"
        connection = engine.connect()
        result = connection.execute(query)
        results = [dict(zip(tuple (result.keys()) ,i)) for i in result.cursor]
        return jsonpify(results)       


class AuditLog(Resource):
    def get(self):
        engine = CreateConnectionCoreUser()
        query = "select d.name as query, c.first_name as viewedBy, a.native as type,b.name as sourceDB, e.name as table, f.name as collection, a.started_at as viewedon from public.query_execution a inner join public.metabase_database b on a.database_id = b.id inner join public.core_user c on a.executor_id = c.id left join public.report_card d on a.card_id = d.id left join public.metabase_table e on d.table_id = e.id left join public.collection f on d.collection_id = f.id group by b.name,d.name, c.first_name, a.native,a.started_at,e.name,f.name order by a.started_at desc limit 20"
        connection = engine.connect()
        result = connection.execute(query)
        results = [dict(zip(tuple (result.keys()) ,i)) for i in result.cursor]
        return jsonpify(results)

class Downloads(Resource):
    def get(self):
        engine = CreateConnectionCoreUser()
        query = "select a.started_at as downloadAt, a.result_rows as rowsDownloaded, b.name as query, a.native as queryType, c.name as sourceDatabases, d.name as tables, e.first_name as user from public.query_execution a left join public.report_card b on a.card_id = b.id left join public.metabase_database c on a.database_id = c.id left join public.metabase_table d on b.table_id = d.id left join public.core_user e on a.executor_id = e.id where a.context ilike 'csv-download' or a.context ilike 'json-download' or a.context ilike 'xlsx-download' group by b.name,a.native,c.name,d.name,a.started_at,a.result_rows,e.first_name"
        connection = engine.connect()
        result = connection.execute(query)
        results = [dict(zip(tuple (result.keys()) ,i)) for i in result.cursor]
        return jsonpify(results)

class DownloadsOverview(Resource):
    def get(self):
        engine = CreateConnectionCoreUser()
        query = "select a.started_at as date, a.result_rows as rows, e.first_name as user from public.query_execution a left join public.core_user e on a.executor_id = e.id where a.context ilike 'csv-download' or a.context ilike 'json-download' or a.context ilike 'xlsx-download' group by a.started_at,a.result_rows,e.first_name"
        connection = engine.connect()
        result = connection.execute(query)
        results = [dict(zip(tuple (result.keys()) ,i)) for i in result.cursor]
        return jsonpify(results)

class downloadsPerUser(Resource):
    def get(self):
        engine = CreateConnectionCoreUser()
        query = "select count(distinct a.id)as count, concat(b.first_name,' ',b.last_name) as name from query_execution a left join core_user b on a.executor_id = b.id where a.context ilike 'csv-download' or a.context ilike 'json-download' or a.context ilike 'xlsx-download' group by b.first_name, b.last_name order by count desc limit 10"
        connection = engine.connect()
        result = connection.execute(query)
        results = [dict(zip(tuple (result.keys()) ,i)) for i in result.cursor]
        return jsonpify(results)

class downloadsPerSize(Resource):
    def get(self):
        engine = CreateConnectionCoreUser()
        query = "WITH range_values AS ( SELECT min(result_rows) as minval,max(result_rows) as maxval,started_at FROM query_execution group by started_at) select generate_series(a.minval,a.maxval,100) as rows, count(b.id) as download from range_values a left join query_execution b on a.started_at = b.started_at where b.context ilike 'json-download' or b.context ilike 'csv-download' or b.context ilike 'xlsx-download' group by rows order by rows asc"
        connection = engine.connect()
        result = connection.execute(query)
        results = [dict(zip(tuple (result.keys()) ,i)) for i in result.cursor]
        return jsonpify(results)


class PeopleActive(Resource):
    def get(self):
        engine = CreateConnectionCoreUser()
        query = "select a.id, a.first_name, a.last_name, a.email, STRING_AGG(d.name, ',') as groups, a.last_login as last_login from (core_user a left join permissions_group_membership c on a.id = c.user_id left join permissions_group d on c.group_id = d.id) where a.is_active = 'true' group by a.id, c.user_id order by a.last_login desc"
        connection = engine.connect()
        result = connection.execute(query)
        results = [dict(zip(tuple (result.keys()) ,i)) for i in result.cursor]
        return jsonify(results)


class PeopleDeactive(Resource):
    def get(self):
        engine = CreateConnectionCoreUser()
        query = "select a.id, a.first_name, a.last_name, a.email, STRING_AGG(d.name, ',') as groups, a.updated_at as deactivated from (core_user a left join permissions_group_membership c on a.id = c.user_id left join permissions_group d on c.group_id = d.id) where a.is_active = 'false' group by a.id, c.user_id order by a.last_login desc"
        connection = engine.connect()
        result = connection.execute(query)
        results = [dict(zip(tuple (result.keys()) ,i)) for i in result.cursor]
        return jsonify(results)


class PeopleGroups(Resource):
    def get(self):
        engine = CreateConnectionCoreUser()
        query = "select count(a.id) as count, b.name as groups from permissions_group_membership a left join permissions_group b on a.group_id = b.id group by b.id"
        connection = engine.connect()
        result = connection.execute(query)
        results = [dict(zip(tuple (result.keys()) ,i)) for i in result.cursor]
        return jsonify(results)

class PeopleListGroups(Resource):
    def get(self):
        engine = CreateConnectionCoreUser()
        query = "select * from permissions_group"
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
api.add_resource(MembersMostCreated, '/api/audit/members/mostCreated')
api.add_resource(TableMostQueried, '/api/audit/tables/mostqueried')
api.add_resource(TableLeastQueried, '/api/audit/tables/leastqueried')
api.add_resource(SchemaMostQueried, '/api/audit/schemas/mostqueried')
api.add_resource(SchemaSlowest, '/api/audit/schemas/slowestschema')
api.add_resource(DatabasesAvgExecAndQuery, '/api/audit/databases/queriesnavgexec')
api.add_resource(DatabasesQuery, '/api/audit/databases/queries')
api.add_resource(QuestionsPopularQueries, '/api/audit/questions/popularqueries')
api.add_resource(QuestionsSlowestQueries, '/api/audit/questions/slowestqueries')
api.add_resource(DashboardsMostPopular, '/api/audit/dashboards/mostpopular')
api.add_resource(DownloadsOverview, '/api/audit/downloads/overview')
api.add_resource(downloadsPerUser, '/api/audit/downloads/downloadperuser')
api.add_resource(DashboardsCommonQuestion, '/api/audit/dashboards/commonquestion')
api.add_resource(downloadsPerSize, '/api/audit/downloads/downloadpersize')
api.add_resource(MembersActivenNew, '/api/audit/members/activennew')
api.add_resource(DashboardsViewsnSaved, '/api/audit/dashboards/viewsnsaved')
api.add_resource(PeopleActive, '/api/people/activepeople')
api.add_resource(PeopleDeactive, '/api/people/deactivepeople')
api.add_resource(PeopleGroups, '/api/people/groups')
api.add_resource(PeopleListGroups, '/api/people/listgroups')


if __name__ == '__main__':
    api.run()