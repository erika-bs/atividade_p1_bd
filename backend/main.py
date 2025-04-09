from fastapi import FastAPI,Depends,HTTPException
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models import User,Endereco,Produto,Pedido
from pydantic import BaseModel
from datetime import date
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http:/127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # permite essas origens
    allow_credentials=True,
    allow_methods=["*"],    # permite todos os métodos (GET, POST, etc)
    allow_headers=["*"],    # permite todos os headers
)

class UserCreate(BaseModel):
    nome: str
    cpf: str
    telefone: str
    email: str

class UserUpdate(BaseModel):
    nome: str
    cpf: str
    telefone: str
    email: str 


class AddressCreate(BaseModel):
    user_id: int
    rua: str
    bairro: str
    numero: str 
    cidade: str 
    estado: str 
    cep: str 

class ProductCreate(BaseModel):
    nome: str
    descricao: str
    preco:float

class ProductUpdate(BaseModel):
    nome:str
    descricao:str
    preco:float

class OrderCreate(BaseModel):
    usuario_id: int
    produto_id: int
    quantidade:int
    data_pedido: date

@app.post("/users/")
def create_user(user: UserCreate,db:Session=Depends(get_db)):
    db_user = User(nome=user.nome,cpf=user.cpf,telefone=user.telefone,email=user.email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/users/")
def get_users(db:Session=Depends(get_db)):
    return db.query(User).all()

@app.get("/user/{user_id}")
def get_user(user_id:int,db:Session=Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404,detail="Usuário nao encontrado")
    return user


@app.post("/enderecos/")
def create_address(address: AddressCreate,db:Session=Depends(get_db)):
    db_address = Endereco(**address.dict())
    db.add(db_address)
    db.commit()
    db.refresh(db_address)
    return db_address

@app.get("/enderecos/")
def get_addresses(db:Session=Depends(get_db)):
    return db.query(Endereco).all()

@app.post("/produtos/")
def create_product(product: ProductCreate,db:Session=Depends(get_db)):
    db_product = Produto(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

@app.get("/produtos/")
def get_products(db:Session=Depends(get_db)):
    return db.query(Produto).all()

@app.post("/pedidos/")
def create_order(order:OrderCreate,db:Session=Depends(get_db)):
    db_order = Pedido(**order.dict())
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order

@app.get("/pedidos/")
def get_orders(db:Session=Depends(get_db)):
    return db.query(Pedido).all()


@app.put("/users/{user_id}")
def update_user(user_id:int,user:UserUpdate,db:Session=Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()

    if not db_user:
        raise HTTPException(status_code=404,detail="Usuário nao encontrado")
    
    if user.nome is not None:
        db_user.nome = user.nome
    if user.cpf is not None:
        db_user.cpf = user.cpf
    if user.telefone is not None:
        db_user.telefone = user.telefone
    if user.email is not None:
        db_user.email = user.email

    db.commit()
    db.refresh(db_user)
    return db_user

@app.delete("/users/{user_id}")
def delete_user(user_id:int,db:Session=Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()

    if not db_user:
        raise HTTPException(status_code=404,detail="Usuario nao encontrado")
    
    db.delete(db_user)
    db.commit()
    return {"detail":"Usuario deletado com sucesso"}

@app.delete("/enderecos/{endereco_id}")
def delete_address(endereco_id: int, db: Session = Depends(get_db)):
    db_endereco = db.query(Endereco).filter(Endereco.id == endereco_id).first()

    if not db_endereco:
        raise HTTPException(status_code=404, detail="Endereço não encontrado")

    db.delete(db_endereco)
    db.commit()
    return {"detail": "Endereço deletado com sucesso"}


@app.delete("/produtos/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    db_product = db.query(Produto).filter(Produto.id == product_id).first()

    if not db_product:
        raise HTTPException(status_code=404, detail="Produto não encontrado")

    db.delete(db_product)
    db.commit()
    return {"detail": "Produto deletado com sucesso"}


@app.delete("/pedidos/{order_id}")
def delete_order(order_id: int, db: Session = Depends(get_db)):
    db_order = db.query(Pedido).filter(Pedido.id == order_id).first()

    if not db_order:
        raise HTTPException(status_code=404, detail="Pedido não encontrado")

    db.delete(db_order)
    db.commit()
    return {"detail": "Pedido deletado com sucesso"}