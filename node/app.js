const express = require('express');
const app = express();
const port = 3000;

const config = {
   host: 'db',
   user: 'root',
   password: '"root"',
   database: 'nodedb'
};
const mysql = require('mysql');

const connection = mysql.createConnection(config);

// Function to fetch all names from the database
const getAllNames = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT name FROM people';
        connection.query(sql, (error, results) => {
            if (error) {
                reject(error);
            } else {
                const names = results.map(row => row.name);
                resolve(names);
            }
        });
    });
};

// Function to insert a new name into the database
const insertName = (name) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO people(name) VALUES('${name}')`;
        connection.query(sql, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
};

app.get('/', async (req, res) => {
    try {
        // Fetch all names from the database
        const names = await getAllNames();
        
        // Generate a new name
        const newName = 'Name ' + (names.length + 1);
        
        // Insert the new name into the database
        await insertName(newName);

        // Send the list of names as a response
        let htmlResponse = '<h1>Full Cycle</h1>';
        htmlResponse += '<ul>';
        names.forEach(name => {
            htmlResponse += `<li>${name}</li>`;
        });
        htmlResponse += '</ul>';
        res.send(htmlResponse);
    } catch (error) {
        res.status(500).send('Error: ' + error.message);
    }
});

app.listen(port, () => {
    console.log('Rodando na porta ' + port);
});
