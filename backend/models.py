from sqlalchemy import Column, String, Integer,ForeignKey, Float,Date
from sqlalchemy.orm import relationship
from backend.database import Base
from datetime import date

class User(Base):
    __tablename__ = "usuarios"


    id = Column(Integer, primary_key=True,index=True)
    nome = Column(String(100),nullable=False)
    cpf = Column(String(14),unique=True,nullable=False)
    telefone = Column(String(14),nullable=False)
    email = Column(String(100), unique=True, nullable=False) 

    endereco = relationship("Endereco", back_populates="usuario", uselist=False)
    pedidos = relationship("Pedido",back_populates="usuario")

class Endereco(Base):
    __tablename__ = "enderecos"

    id = Column(Integer, primary_key=True, index=True)
    rua = Column(String(100), nullable=False)
    bairro = Column(String(30), nullable=False)
    numero = Column(String(10), nullable=False)
    cidade = Column(String(50), nullable=False)
    estado = Column(String(50), nullable=False)
    cep = Column(String(10), nullable=False)

    user_id = Column(Integer, ForeignKey("usuarios.id"))
    usuario = relationship("User", back_populates="endereco")

class Produto(Base):
    __tablename__ = "produtos"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(100), nullable=False)
    descricao = Column(String(255))
    preco = Column(Float, nullable=False)

class Pedido(Base):
    __tablename__ = "pedidos"

    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"))
    produto_id = Column(Integer,ForeignKey("produtos.id"))
    quantidade = Column(Integer,nullable=False)
    data_pedido = Column(Date, default=date.today)

    usuario = relationship("User", back_populates="pedidos")
    produto = relationship("Produto")
