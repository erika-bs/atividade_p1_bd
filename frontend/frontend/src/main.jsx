import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; 
import App from './components/App'; 
import EnderecoApp from './components/EnderecoApp'; 
import ProdutoApp from './components/ProdutoApp'; 
import PedidoApp from './components/PedidoApp'; 

function MainPage() {
  return (
    <div className="main-page">
      <div className="button-container">
        <button><Link className="nav-button" to="/usuarios">Cadastrar/Ver Usuários</Link></button>
        <button><Link className="nav-button" to="/enderecos">Cadastrar/Ver Endereços</Link></button>
        <button><Link className="nav-button" to="/produtos">Cadastrar/Ver Produtos</Link></button>
        <button><Link className="nav-button" to="/pedidos">Cadastrar/Ver Pedidos</Link></button>
      </div>
    </div>
  );
}


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} /> {/* Página Principal com os Botões */}
        <Route path="/usuarios" element={<App />} /> {/* Cadastrar Usuários */}
        <Route path="/ver-usuarios" element={<App />} /> {/* Ver Usuários */}
        <Route path="/produtos" element={<ProdutoApp />} /> {/* Cadastrar Produtos */}
        <Route path="/ver-produtos" element={<ProdutoApp />} /> {/* Ver Produtos */}
        <Route path="/pedidos" element={<PedidoApp />} /> {/* Cadastrar Pedidos */}
        <Route path="/ver-pedidos" element={<PedidoApp />} /> {/* Ver Pedidos */}
        <Route path="/enderecos" element={<EnderecoApp />} /> {/* Página de Endereços */}
      </Routes>
    </Router>
  </React.StrictMode>
);
