import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    telefone: "",
    email: "",
  });

  const [editing, setEditing] = useState(false); // Estado para saber se estamos editando um usuário

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch("http://localhost:8000/users/")
      .then((res) => {
        console.log("Response status:", res.status);  
        return res.json();
      })
      .then((data) => {
        console.log("Fetched users:", data);  
        setUsers(data);
      })
      .catch((err) => {
        console.error("Erro ao buscar usuários", err);  
      });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editing) {
      console.log("Editing user:", formData);  
      fetch(`http://localhost:8000/users/${formData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          if (res.ok) {
            fetchUsers(); // Atualiza a lista de usuários
            resetForm(); // Limpa o formulário
          } else {
            console.log("Failed to update user:", res.status); 
          }
        })
        .catch((err) => {
          console.error("Erro ao editar usuário", err); 
        });
    } else {
      console.log("Creating new user:", formData);  
      fetch("http://localhost:8000/users/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          if (res.ok) {
            fetchUsers(); // Atualiza a lista de usuários
            resetForm(); // Limpa o formulário
          } else {
            console.log("Failed to create user:", res.status);  
          }
        })
        .catch((err) => {
          console.error("Erro ao criar usuário", err);  
        });
    }
  };

  const handleEdit = (user) => {
    setFormData(user); // Preenche o formulário com os dados do usuário
    setEditing(true); // Ativa o modo de edição
  };

  const handleDelete = (userId) => {
    console.log("Deleting user with ID:", userId);  
    fetch(`http://localhost:8000/users/${userId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          fetchUsers(); // Atualiza a lista de usuários após exclusão
        } else {
          console.log("Failed to delete user:", res.status);  
        }
      })
      .catch((err) => {
        console.error("Erro ao excluir usuário", err);  
      });
  };

  const resetForm = () => {
    setFormData({ nome: "", cpf: "", telefone: "", email: "" }); 
    setEditing(false); 
  };

  return (
    <div>
      <h1>Cadastrar Usuários</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="nome"
          placeholder="Nome"
          value={formData.nome}
          onChange={handleChange}
          required
        />
        <input
          name="cpf"
          placeholder="CPF"
          value={formData.cpf}
          onChange={handleChange}
          required
        />
        <input
          name="telefone"
          placeholder="Telefone"
          value={formData.telefone}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <button type="submit">{editing ? "Atualizar" : "Adicionar"}</button>
        {editing && <button type="button" onClick={resetForm}>Cancelar</button>}
      </form>

      <h1>Usuários Cadastrados</h1>
      <ul>
  {users.map((user) => (
    <li key={user.id}>
      <div className="info">
        <strong>ID:</strong> {user.id}  <strong>Nome:</strong> {user.nome}  <strong>Email:</strong> {user.email}
      </div>
      <div className="buttons-container">
        <button onClick={() => handleEdit(user)}>Editar</button>
        <button onClick={() => handleDelete(user.id)}>Excluir</button>
      </div>
    </li>
  ))}
</ul>

    </div>
  );
}

export default App;
