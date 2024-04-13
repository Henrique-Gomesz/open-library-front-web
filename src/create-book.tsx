import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "./App.css";

export const CreateLivro = () => {
  
  const [livroData, setLivroData] = useState<{
    livro_nome: string;
    lanca_ano: string;
    livro_categoria: number;
    livro_autores: string[];
    livro_paginas: number;
    livro_editora: string;
  }>({
    livro_nome: "",
    lanca_ano: "",
    livro_categoria: 1,
    livro_autores: [],
    livro_paginas: 0,
    livro_editora: "",
  });

  useEffect(() => {
    console.log(livroData);
  }, [livroData]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLivroData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAutoresChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setLivroData((prevData) => ({
      ...prevData,
      livro_autores: value.split(", ").map(author => author.trim()),
    }));
  };

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
    "Policial",
  ];

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryIndex: number = parseInt(e.target.value);
    console.log(selectedCategoryIndex)
    setLivroData((prevData) => ({
      ...prevData,
      livro_categoria: selectedCategoryIndex,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(livroData)
    try {
      const usuarios = await axios.post("http://172.17.22.87:8000/livro", livroData);
      console.log("Livro criado com sucesso");
      setLivroData({
        livro_nome: "",
        lanca_ano: "",
        livro_categoria: 0,
        livro_autores: [],
        livro_paginas: 0,
        livro_editora: "",
      });
      console.log(usuarios.data)
      alert(JSON.stringify(usuarios.data.usuarios))
    } catch (error) {
      console.error("Erro ao criar livro:", error);
    }
  };

  return (
    <>
      <form className="livroForm" onSubmit={handleSubmit}>
        <div>
          <label>Nome do Livro:</label>
          <input
            type="text"
            name="livro_nome"
            value={livroData.livro_nome}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Data de Lançamento:</label>
          <input
            type="date"
            name="lanca_ano"
            value={livroData.lanca_ano}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Categorias:</label>
          <select name="categorias" onChange={handleCategoryChange} value={livroData.livro_categoria}>
            {categoriesOptions.map((category, index) => (
              <option key={index} value={index + 1}>{category}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Autores (separados por vírgula):</label>
          <input
            type="text"
            name="livro_autores"
            value={livroData.livro_autores.join(", ")}
            onChange={handleAutoresChange}
            required
          />
        </div>
        <div>
          <label>Número de Páginas:</label>
          <input
            type="number"
            name="livro_paginas"
            value={livroData.livro_paginas}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Editora:</label>
          <input
            type="text"
            name="livro_editora"
            value={livroData.livro_editora}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Criar Livro</button>
      </form>
    </>
  );
};
