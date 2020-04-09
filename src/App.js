import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    // Buscar na api todos os repositórios e adicionar ao state
    api.get("/repositories").then(({ data }) => setRepositories(data));
  }, []);

  async function handleAddRepository() {
    const repository = {
      title: `Novo repositório ${Date.now()}`,
      url: "",
      techs: [],
    };

    const { data } = await api.post("/repositories", repository);

    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    // TODO
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(({ id, title }) => (
          <li key={id}>
            {title}

            <button onClick={() => handleRemoveRepository(id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
