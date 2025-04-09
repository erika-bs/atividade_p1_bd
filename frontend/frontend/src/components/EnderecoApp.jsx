import { useEffect, useState } from "react";

function EnderecoApp() {
  const [enderecos, setEnderecos] = useState([]);
  const [formData, setFormData] = useState({
    user_id: "",
    rua: "",
    bairro: "",
    numero: "",
    cidade: "",
    estado: "",
    cep: ""
  });
  const [editing, setEditing] = useState(false); // Estado para saber se estamos editando um endereço

  useEffect(() => {
    fetchEnderecos();
  }, []);

  const fetchEnderecos = () => {
    fetch("http://localhost:8000/enderecos/")
      .then((res) => res.json())
      .then((data) => {
        setEnderecos(data);
      })
      .catch((err) => {
        console.error("Erro ao buscar endereços", err);
      });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editing) {
      fetch(`http://localhost:8000/enderecos/${formData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          if (res.ok) {
            fetchEnderecos();
            resetForm();
          }
        })
        .catch((err) => {
          console.error("Erro ao editar endereço", err);
        });
    } else {
      fetch("http://localhost:8000/enderecos/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          if (res.ok) {
            fetchEnderecos();
            resetForm();
          }
        })
        .catch((err) => {
          console.error("Erro ao criar endereço", err);
        });
    }
  };

  const handleEdit = (endereco) => {
    setFormData(endereco);
    setEditing(true);
  };

  const handleDelete = (enderecoId) => {
    fetch(`http://localhost:8000/enderecos/${enderecoId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          fetchEnderecos();
        }
      })
      .catch((err) => {
        console.error("Erro ao excluir endereço", err);
      });
  };

  const resetForm = () => {
    setFormData({
      user_id: "",
      rua: "",
      bairro: "",
      numero: "",
      cidade: "",
      estado: "",
      cep: ""
    });
    setEditing(false);
  };

  return (
    <div>
      <h1>Cadastrar Endereço</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="user_id"
          placeholder="ID do Usuário"
          value={formData.user_id}
          onChange={handleChange}
          required
        />
        <input
          name="rua"
          placeholder="Rua"
          value={formData.rua}
          onChange={handleChange}
          required
        />
        <input
          name="bairro"
          placeholder="Bairro"
          value={formData.bairro}
          onChange={handleChange}
          required
        />
        <input
          name="numero"
          placeholder="Número"
          value={formData.numero}
          onChange={handleChange}
          required
        />
        <input
          name="cidade"
          placeholder="Cidade"
          value={formData.cidade}
          onChange={handleChange}
          required
        />
        <input
          name="estado"
          placeholder="Estado"
          value={formData.estado}
          onChange={handleChange}
          required
        />
        <input
          name="cep"
          placeholder="CEP"
          value={formData.cep}
          onChange={handleChange}
          required
        />
        <button type="submit">{editing ? "Atualizar" : "Adicionar"}</button>
        {editing && <button type="button" onClick={resetForm}>Cancelar</button>}
      </form>
      <h1>Endereços Cadastrados</h1>
      <ul>
        {enderecos.map((endereco) => (
          <li key={endereco.id}>
              <div className="info">
                  <strong>ID do Cliente:</strong> {endereco.user_id}  <strong>Rua:</strong> {endereco.rua}  <strong>Bairro:</strong> {endereco.bairro}  <strong>Cidade:</strong> {endereco.cidade}
</div>
<div className="buttons-container">
  <button onClick={() => handleEdit(endereco)}>Editar</button>
  <button onClick={() => handleDelete(endereco.id)}>Excluir</button>
</div>


          </li>
        ))}
      </ul>
    </div>
  );
}

export default EnderecoApp;
