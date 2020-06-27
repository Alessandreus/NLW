const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database("./src/database/database.db")

//Para poder usar o require
module.exports = db

//String com crase vc pode pular linha (template string)
// db.serialize(() => {
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places
//         (
//             id      INTEGER PRIMARY KEY AUTOINCREMENT,
//             name    VARCHAR,
//             image   TEXT,
//             adress  TEXT,
//             adress2 TEXT,
//             state   TEXT,
//             city    TEXT,
//             items   TEXT
//         );
//     `)

//     // db.run(`UPDATE places SET items = 'Papéis e Papelão' WHERE id = 3`)

//     //     const query = `
//     //     INSERT INTO places
//     //     (
//     //         name,
//     //         image,
//     //         adress,
//     //         adress2,
//     //         state,
//     //         city,
//     //         items
//     //     )
//     //     VALUES
//     //     (?,?,?,?,?,?,?);
//     // `
//     //     const values = [
//     //         "Papersider",
//     //         "https://images.unsplash.com/photo-1558583055-d7ac00b1adca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//     //         "Guilherme Gemballa, Jardim América",
//     //         "Nº 260",
//     //         "Santa Catarina",
//     //         "Rio do Sul",
//     //         "Resíduos Eletrônicos, Lâmpadas"
//     //     ]

//     //     function afterInsertData(err) {
//     //         if (err) {
//     //             return console.log(err)
//     //         }

//     //         console.log("Cadastrado com sucesso!")
//     //         console.log(this)
//     //     }

//     //     //Usando this não pode usar arrow function
//     //     db.run(query, values, afterInsertData)

//     //     db.all(`SELECT * FROM places`, function(err, rows) {
//     //         if (err) {
//     //             return console.log(err)
//     //         }

//     //         console.log("Aqui estão os seus registros")
//     //         console.log(rows)
//     //     })

//     // db.run(`DELETE FROM places WHERE id = ?`, [1], function(err) {
//     //     if (err) {
//     //         return console.log(err)
//     //     }

//     //     console.log("Registro deletado com sucesso")
//     // })
// })