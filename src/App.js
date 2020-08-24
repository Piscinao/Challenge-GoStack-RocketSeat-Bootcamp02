import React, { useState, useEffect } from 'react';
import api from './services/api';



import './styles.css';

import Header from './components/Header';


function App() {
  // Usando estado e imutabilidade 
  const [repositories, setRepositories] = useState([]);
  // primeiro parametro é qual função segundo é quando ?
  

  //useeffect nao pode ser async
  useEffect(() => { 
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })

  }, [])
  async function handleAddRepository() {
    //setRepositories([...repositories, `Novo repositório ${Date.now()}`]);
    const response = await api.post('repositories', {
      title: `New repository`,
      url: 'https://github.com',
      techs: ['Node.js', 'React']
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }


  async function handleRemoveRepository(id) {

     await api.delete(`repositories/${id}`);

   
//mostra os repositorios cujo o id são diferentes do removido
    setRepositories(repositories.filter(
      repository => repository.id !== id
    ))
   
  }


  // Maneira antiga js normal
  // const repositories = ['Desenvolvimento de app', 'Front-end'];

  // function handleAddProject(){
  //   repositories.push(`Novo Projeto ${Date.now()}`)
  //   console.log(repositories);
  // }
  return (
    <>

      <Header title="Repositories" />
  

      <ul data-testid="repository-list">
        
      
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
        
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button> 
        
        
        </li>
        
        ))}
                
      </ul>


      <button type="button" onClick={handleAddRepository}>Adicionar</button>
    </>
  );

}


export default App;