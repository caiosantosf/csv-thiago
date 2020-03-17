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

app.listen(3000, function () {
  console.log('app listening on port 3000!')
})

