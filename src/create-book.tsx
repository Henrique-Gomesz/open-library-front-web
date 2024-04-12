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
    livro_categoria: 0,
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
      livro_autores: value.split(","),
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://192.168.15.61:8000/livro", livroData);
      console.log("Livro criado com sucesso");
      setLivroData({
        livro_nome: "",
        lanca_ano: "",
        livro_categoria: 0,
        livro_autores: [],
        livro_paginas: 0,
        livro_editora: "",
      });
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
          <label>Categoria:</label>
          <select
            name="livro_categoria"
            value={livroData.livro_categoria}
            onChange={handleChange}
            required
          >
            <option value={1}>Categoria 1</option>
            <option value={2}>Categoria 2</option>
            {/* Adicione mais opções conforme necessário */}
          </select>
        </div>
        <div>
          <label>Autores (separados por vírgula):</label>
          <input
            type="text"
            name="livro_autores"
            value={livroData.livro_autores.join(",")}
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
