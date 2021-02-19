import sqlalchemy as db
from sqlalchemy import create_engine, MetaData
from sqlalchemy import inspect
from flask_sqlalchemy import SQLAlchemy
import pandas as pd

 #DATABASE CONNECTION
def CreateConnectionCoreUser():
    db_url='postgres://{user}:{password}@{host}:{port}/{database}'.format(user='postgres', password='skymind123', host='192.168.1.124', port='5432', database='google_drive')
    engine = create_engine(db_url)
    return engine

# for column in inspector.get_columns("core_user", schema="public"):
#     columns.append(column['name'])

# inspector = inspect(engine)
# schemas = inspector.get_schema_names()

# for schema in schemas:
#     print("schema: %s" % schema)
#     for table_name in inspector.get_table_names(schema=schema):
#         for column in inspector.get_columns(table_name, schema=schema):
#             print("Column: %s" % column)