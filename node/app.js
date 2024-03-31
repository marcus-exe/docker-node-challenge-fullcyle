const express = require('express')
const app = express()
const port = 3000

const config = {
   host: 'db',
   user: 'root',
   password: '"root"',
   database: 'nodedb'
};

const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sql = `INSERT INTO people(name) values('Marcus')`

//connection.query(sql)

connection.query(sql, (err, results, fields) => {
   if (err) {
       console.error('Error executing query: ' + err.stack);
       return;
   }
   console.log('Query executed successfully');
   // You can process the results here if needed
   // Remember to close the connection after processing
   connection.end();
});

//connection.end()

app.get('/', (req, res) => {
    res.send('<h1>Full Cycle Rocks!<h1>')
 })

 app.listen(port, ()=>{
    console.log('Rodando na porta '+ port)
 })