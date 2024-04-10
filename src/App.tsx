import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [userData, setUserData] = useState({
    usu_nome: '',
    usu_cpf: '',
    usu_nascimento: '',
    usu_contato: {
      telefone: '',
      email:''
    },
    categorias: []
  });

  const categoriesOptions = [
    "Ficção Científica",
    "Fantasia",
    "Romance",
    "Mistério",
    "Aventura",
    "História",
    "Biografia",
    "Autoajuda",
    "Terror",
    "Poesia",
    "Drama",
    "Humor",
    "Ação",
    "Suspense",
    "Infantil",
    "Fábula",
    "Didático",
    "Religião",
    "Filosofia",
    "Policial"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name,value)
    if(name == "telefone"){
      return setUserData(prevData => ({
        ...prevData,
        usu_contato:{
          telefone:value,
          email:prevData.usu_contato.email
        }
      }));
    }
    if(name == "email") {
      setUserData(prevData => ({
        ...prevData,
        usu_contato:{
          email:value,
          telefone:prevData.usu_contato.telefone
        }
      }));
    }
    return setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setUserData(prevData => ({
        ...prevData,
        categorias: [...prevData.categorias, parseInt(value)]
      }));
    } else {
      setUserData(prevData => ({
        ...prevData,
        categorias: prevData.categorias.filter(catId => catId !== parseInt(value))
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/usuarios', userData);
      console.log('User created successfully');
      // Reset form fields after successful submission
      setUserData({
        usu_nome: '',
        usu_cpf: '',
        usu_nascimento: '',
        usu_contato: {
          telefone: '',
          email: ''
        },
        categorias: []
      });
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div>
      <h1>Open Library Frontend</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="usu_nome" value={userData.usu_nome} onChange={handleChange} required />
        </div>
        <div>
          <label>CPF:</label>
          <input type="text" name="usu_cpf" value={userData.usu_cpf} onChange={handleChange} required />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input type="date" name="usu_nascimento" value={userData.usu_nascimento} onChange={handleChange} required />
        </div>
        <div>
          <label>Phone:</label>
          <input type="text" name="telefone" value={userData.usu_contato.telefone} onChange={handleChange} required />
          <label>E-mail:</label>
          <input type="text" name="email" value={userData.usu_contato.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Categories:</label>
          {categoriesOptions.map((category, index) => (
            <div key={index}>
              <input type="checkbox" id={`category-${index + 1}`} name="categorias" value={index + 1} onChange={handleCategoryChange} />
              <label htmlFor={`category-${index + 1}`}>{category}</label>
            </div>
          ))}
        </div>
        <button type="submit">Create User</button>
      </form>
    </div>
  );
}

export default App;
