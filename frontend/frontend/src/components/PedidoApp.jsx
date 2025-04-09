import { useEffect, useState } from "react";

function PedidoApp() {
  const [pedidos, setPedidos] = useState([]);
  const [formData, setFormData] = useState({
    usuario_id: "",
    produto_id: "",
    quantidade: "",
    data_pedido: "", 
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchPedidos();
  }, []);

  const fetchPedidos = () => {
    fetch("http://localhost:8000/pedidos/")
      .then((res) => res.json())
      .then((data) => setPedidos(data))
      .catch((err) => console.error("Erro ao buscar pedidos", err));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = editing
      ? `http://localhost:8000/pedidos/${formData.id}`
      : "http://localhost:8000/pedidos/";

    const method = editing ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.ok) {
          fetchPedidos();
          resetForm();
        }
      })
      .catch((err) =>
        console.error(editing ? "Erro ao editar pedido" : "Erro ao criar pedido", err)
      );
  };

  const handleEdit = (pedido) => {
    setFormData({
      ...pedido,
      data_pedido: pedido.data_pedido ? pedido.data_pedido.split("T")[0] : "", // remove hora se tiver
    });
    setEditing(true);
  };

  const handleDelete = (pedidoId) => {
    fetch(`http://localhost:8000/pedidos/${pedidoId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) fetchPedidos();
      })
      .catch((err) => console.error("Erro ao excluir pedido", err));
  };

  const resetForm = () => {
    setFormData({
      usuario_id: "",
      produto_id: "",
      quantidade: "",
      data_pedido: "",
    });
    setEditing(false);
  };

  return (
    <div>
      <h1>Cadastrar Pedido</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="usuario_id"
          placeholder="ID do Usuário"
          value={formData.usuario_id}
          onChange={handleChange}
          required
        />
        <input
          name="produto_id"
          placeholder="ID do Produto"
          value={formData.produto_id}
          onChange={handleChange}
          required
        />
        <input
          name="quantidade"
          placeholder="Quantidade"
          value={formData.quantidade}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="data_pedido"
          value={formData.data_pedido}
          onChange={handleChange}
          required
        />
        <button type="submit">{editing ? "Atualizar" : "Adicionar"}</button>
        {editing && <button type="button" onClick={resetForm}>Cancelar</button>}
      </form>
      <h1>Histórico de Pedidos</h1>
      <ul>
        {pedidos.map((pedido) => (
          <li key={pedido.id}>
            <div className="info">
  <strong>Usuário ID:</strong> {pedido.usuario_id}  <strong>Produto ID:</strong> {pedido.produto_id}  <strong>Quantidade:</strong> {pedido.quantidade}  <strong>Data:</strong> {pedido.data_pedido}
</div>
<div className="buttons-container">
  <button onClick={() => handleDelete(pedido.id)}>Excluir</button>
</div>

          </li>
        ))}
      </ul>
    </div>
  );
}

export default PedidoApp;
