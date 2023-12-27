import http from 'node:http'

// Métodos HTTP: combinação de método + url
// 1. Método
// 2. URL

// GET, POST, PUT, PATCH, DELETE

// GET --> Buscar um recurso no backend
// POST --> Criar um recurso no backend
// PUT --> Atualizar um recurso no backend
// PATCH --> Atualizar uma informação específica de um recurso no backend
// DELETE --> Deletar um recurso específico do backend

const server = http.createServer((req, res) => {
    return res.end('Hello World')
})

server.listen(3333)

