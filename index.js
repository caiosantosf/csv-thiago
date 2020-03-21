const csv = require('csv-parser')
const fs = require('fs')
const express = require('express')
const app = express()

app.use((req, res, next) => {
    res.header('Content-Type', 'application/json; charset=utf-8')
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', req.header('access-control-request-headers' || '*'))
    res.header('Access-Control-Allow-Methods', 'GET')
    next()
});

app.get('/alunos', function (req, res) {
    const alunos = []

    fs.createReadStream('data.csv')
        .pipe(csv())
        .on('data', function(linha) {
            alunos.push(linha)
        })
        .on('end', function() {
            return res.send(alunos).status(200);
    });
})

app.get('/genero', function (req, res) {
    let total = 0
    let masculino = 0
    let feminino = 0
    let outros = 0

    fs.createReadStream('data.csv')
        .pipe(csv())
        .on('data', function(linha) {

            if (linha["6 - Qual o seu gênero?"].toLowerCase() == "masculino") masculino += 1
            else if (linha["6 - Qual o seu gênero?"].toLowerCase() == "feminino") feminino += 1
            else outros += 1

            total += 1

        })
        .on('end', function() {

            feminino = (feminino * 100 / total).toFixed(2) + ' %'
            masculino = (masculino * 100 / total).toFixed(2) + ' %'
            outros = (outros * 100 / total).toFixed(2) + ' %'

            return res.send({feminino, masculino, outros}).status(200)
    });
})

app.listen(3000, function () {
  console.log('app listening on port 3000!')
})

