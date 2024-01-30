import http from "node:http";
import { json } from "./middlewares/json.js";
import { Database } from "./database.js";

// Métodos HTTP: combinação de método + url
// 1. Método
// 2. URL

// GET, POST, PUT, PATCH, DELETE

// GET --> Buscar um recurso no backend
// POST --> Criar um recurso no backend
// PUT --> Atualizar um recurso no backend
// PATCH --> Atualizar uma informação específica de um recurso no backend
// DELETE --> Deletar um recurso específico do backend

// Stateful !== Stateless

// Statefull --> Dados armazenados em memoria
// Stateless --> Necessita de um recurso externo para armazenar dados: banco de dados, arquivo JSON...

// JSON - JavaScript Object Notation

// Cabeçalhos (Headers) --> Metadados

// 1. Content-type --> Especificar tipo de conteúdo (JSON / String)
// 2. Status-code --> Reportar o status da requisição (Success / Error) E o motivo do erro (Erro inesperado / Não autenticado, Credenciais Inválidas)
// 100 - 199 --> Informational responses
// 200 - 299 --> Successful responses
// 300 - 399 --> Redirectional messages
// 400 - 499 --> Client error responses
// 500 - 599 --> Server error responses

const database = new Database();
const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  if (method === "GET" && url === "/users") {
    const users = database.select("users");
    return res.end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    const { name, email } = req.body;

    const user = {
      id: 1,
      name,
      email,
    };

    database.insert("users", user);
    return res.writeHead(201).end();
  }

  return res.writeHead(404).end("Not found");
});

server.listen(3333);
