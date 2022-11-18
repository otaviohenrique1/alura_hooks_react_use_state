import { useState } from "react";
import './App.css';

function App() {
  const [endereco, setEndereco] = useState({});

  const [enderecos, setEnderecos] = useState([]);

  function manipularEndereco(evento) {
    const cep = evento.target.value;
    setEndereco({ cep });

    if (cep && cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((resposta) => resposta.json())
        .then((dados) => {
          setEnderecos((lista) => [...lista, endereco]);

          setEndereco((enderecoAntigo) => {
            return {
              ...enderecoAntigo,
              cep: cep,
              rua: dados.logradouro,
              bairro: dados.bairro,
              cidade: dados.cidade,
              estado: dados.uf,
            }
          });

          /*
          setEndereco({
            cep: cep,
            rua: dados.logradouro,
            bairro: dados.bairro,
            cidade: dados.cidade,
            estado: dados.uf,
          });
          */
        });
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Hooks - useState</h1>
        <input
          type="number"
          placeholder="Digite o cep"
          onChange={manipularEndereco}
        />
        <div>
          <h2>Endereço</h2>
          <ul>
            <li>CEP: {endereco.cep}</li>
            <li>Rua: {endereco.rua}</li>
            <li>Bairro: {endereco.bairro}</li>
            <li>Cidade: {endereco.cidade}</li>
            <li>Estado: {endereco.estado}</li>
          </ul>
        </div>
        <div>
          <h2>Endereços</h2>
          <ul>
            {enderecos.map((endereco, index) => {
              return (
                <li key={index}>{endereco}</li>
              );
            })}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;

/*
import { useState } from "react";
import './App.css';

function App() {
  const [cep, setCep] = useState("");

  return (
    <div className="App">
      <header className="App-header">
        <input
          type="number"
          placeholder="Digite o cep"
          onChange={(evento) => setCep(evento.target.value)}
        />
        <ul>
          <li>CEP: {cep}</li>
        </ul>
      </header>
    </div>
  );
}

export default App;
*/
