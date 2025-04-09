from sqlalchemy import create_engine

DATABASE_URL = 'mysql+pymysql://admin:123456@localhost/sistema_db'

engine = create_engine(DATABASE_URL)

try:
    with engine.connect() as conn:
        print("conexão bem sucedida")
except Exception as e:
    print("Erro ao conectar ao banco de dados.")