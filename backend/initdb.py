from sqlalchemy import inspect
from backend.database import Base,engine
from backend.models import User

print("Tabelas declaradas no SQLALCHEMY:",Base.metadata.tables.keys())

inspector = inspect(engine)
print("Tabelas existentes no banco de dados", inspector.get_table_names())

Base.metadata.create_all(bind=engine)

print("Criação da tabela finalizada")