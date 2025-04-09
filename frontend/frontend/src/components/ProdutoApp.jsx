import { useEffect, useState } from "react";

function ProdutoApp() {
  const [produtos, setProdutos] = useState([]);
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    preco: "",
  });
  const [editing, setEditing] = useState(false); // Estado para saber se estamos editando um produto

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = () => {
    fetch("http://localhost:8000/produtos/")
      .then((res) => res.json())
      .then((data) => {
        setProdutos(data);
      })
      .catch((err) => {
        console.error("Erro ao buscar produtos", err);
      });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editing) {
      fetch(`http://localhost:8000/produtos/${formData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          if (res.ok) {
            fetchProdutos();
            resetForm();
          }
        })
        .catch((err) => {
          console.error("Erro ao editar produto", err);
        });
    } else {
      fetch("http://localhost:8000/produtos/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          if (res.ok) {
            fetchProdutos();
            resetForm();
          }
        })
        .catch((err) => {
          console.error("Erro ao criar produto", err);
        });
    }
  };

  const handleEdit = (produto) => {
    setFormData(produto);
    setEditing(true);
  };

  const handleDelete = (produtoId) => {
    fetch(`http://localhost:8000/produtos/${produtoId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          fetchProdutos();
        }
      })
      .catch((err) => {
        console.error("Erro ao excluir produto", err);
      });
  };

  const resetForm = () => {
    setFormData({ nome: "", descricao: "", preco: "" });
    setEditing(false);
  };

  return (
    <div>
      <h1>Cadastrar Produto</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="nome"
          placeholder="Nome"
          value={formData.nome}
          onChange={handleChange}
          required
        />
        <input
          name="descricao"
          placeholder="Descrição"
          value={formData.descricao}
          onChange={handleChange}
        />
        <input
          name="preco"
          placeholder="Preço"
          type="number"
          value={formData.preco}
          onChange={handleChange}
          required
        />
        <button type="submit">{editing ? "Atualizar" : "Adicionar"}</button>
        {editing && <button type="button" onClick={resetForm}>Cancelar</button>}
      </form>
      <h1>Produtos Cadastrados</h1>
      <ul>
        {produtos.map((produto) => (
          <li key={produto.id}>
            <div className="info">
  <strong>ID:</strong> {produto.id}  <strong>Nome:</strong> {produto.nome}  <strong>Preço:</strong> R${produto.preco}
</div>
<div className="buttons-container">
  <button onClick={() => handleEdit(produto)}>Editar</button>
  <button onClick={() => handleDelete(produto.id)}>Excluir</button>
</div>

          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProdutoApp;
