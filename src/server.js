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


const users = []


const server = http.createServer(async (req, res) => {
    const { method, url } = req

    const buffers = []

    for await (const chunk of req) {
        buffers.push(chunk)
    }



    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch {
        req.body = null
    }   

    if (method === 'GET' && url === '/users') {

        return res
            .setHeader('Content-type', 'application/json')
            .end(JSON.stringify(users))
    }

    if (method === 'POST' && url === '/users') {
        const { name, email } = req.body
        users.push({
            id: 1,
            name,
            email
        })


        return res.writeHead(201).end()
    }

    return res.writeHead(404).end('Not found')
})

server.listen(3333)

