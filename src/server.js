const express = require("express")
const server = express()

const db = require('./database/db')

/* Configurar pasta public */
server.use(express.static("public"))

/* Habilitar o req.body*/
server.use(express.urlencoded({ extended: true }))

// template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

/* Configurar as rotas  */
server.get("/", (req, res) => {
    res.render("index.html", {
        tittle: 'Seu marketplace de coleta de resíduos'
    })
})

server.get("/create-point", (req, res) => {
    //Query String's da URL
    // console.log(req.query)

    res.render("create-point.html")
})

/* 1:33 */
server.post("/savepoint", (req, res) => {
    const query = `
        INSERT INTO places
        (
            name,
            image,
            adress,
            adress2,
            state,
            city,
            items
        )
        VALUES
        (?,?,?,?,?,?,?);
    `
    const values = [
        req.body.name,
        req.body.image,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.cidade,
        req.body.items
    ]

    function afterInsertData(err) {
        if (err) {
            return console.log(err)
            return res.send("Erro no cadastro")
        }

        console.log("Cadastrado com sucesso!")
        console.log(this)

        return res.render("create-point.html", { saved: true })
    }

    //Usando this não pode usar arrow function
    db.run(query, values, afterInsertData)
})

server.get("/search-results", (req, res) => {
    const search = req.query.search

    if (search == "") {
        return res.render("search-results.html", { total: 0 })
    }

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if (err) {
            console.log(err)
        }

        const total = rows.length

        res.render("search-results.html", { places: rows, total: total })
    })
})

/* ligar o servidor */
server.listen(3000)