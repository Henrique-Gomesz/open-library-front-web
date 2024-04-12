import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "./App.css";

export const CreateUser = () => {
  const [userData, setUserData] = useState<{
    usu_nome: string;
    usu_cpf: string;
    usu_nascimento: string;
    usu_contato: {
      telefone: string;
      email: string;
    };
    categorias: number[];
  }>({
    usu_nome: "",
    usu_cpf: "",
    usu_nascimento: "",
    usu_contato: {
      telefone: "",
      email: "",
    },
    categorias: [],
  });
  useEffect(() => {
    console.log(userData);
  }, [userData]);

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (name == "telefone") {
      return setUserData((prevData) => ({
        ...prevData,
        usu_contato: {
          telefone: value,
          email: prevData.usu_contato.email,
        },
      }));
    }
    if (name == "email") {
      setUserData((prevData) => ({
        ...prevData,
        usu_contato: {
          email: value,
          telefone: prevData.usu_contato.telefone,
        },
      }));
    }
    return setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setUserData((prevData) => ({
        ...prevData,
        categorias: [...prevData.categorias, parseInt(value)],
      }));
    } else {
      setUserData((prevData) => ({
        ...prevData,
        categorias: prevData.categorias.filter(
          (catId) => catId !== parseInt(value)
        ),
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/usuarios", userData);
      console.log("User created successfully");
      // Reset form fields after successful submission
      setUserData({
        usu_nome: "",
        usu_cpf: "",
        usu_nascimento: "",
        usu_contato: {
          telefone: "",
          email: "",
        },
        categorias: [],
      });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <>
      <form className="userForm" onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="usu_nome"
            value={userData.usu_nome}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>CPF:</label>
          <input
            type="text"
            name="usu_cpf"
            value={userData.usu_cpf}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Data de nascimento:</label>
          <input
            type="date"
            name="usu_nascimento"
            value={userData.usu_nascimento}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Telefone:</label>
          <input
            type="text"
            name="telefone"
            value={userData.usu_contato.telefone}
            onChange={handleChange}
            required
          />
          <label>E-mail:</label>
          <input
            type="text"
            name="email"
            value={userData.usu_contato.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Categorias:</label>
          {categoriesOptions.map((category, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={`category-${index + 1}`}
                name="categorias"
                value={index + 1}
                onChange={handleCategoryChange}
              />
              <label htmlFor={`category-${index + 1}`}>{category}</label>
            </div>
          ))}
        </div>
        <button type="submit">Criar Usuário</button>
      </form>
    </>
  );
};
