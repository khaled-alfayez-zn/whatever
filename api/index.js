const express = require('express');
const { Client } = require('pg');

const app = express();
app.use(express.json());
var PORT = 3000;

// create a new PostgreSQL client
const client = new Client({
    user: 'postgres',
    host: '0.0.0.0',
    database: 'companies',
    password: 'password123',
    port: 5432
});

app.use((req, res, next) => {
    client.connect()
        .then(() => next())
        .catch(err => next(err));
});

// create a new company in the 'company_details' table
app.post('/companies', (req, res) => {
    const { name, founded_date, website, industry, revenue, headquarters } = req.body;
    const query = `
        INSERT INTO company_details (name, founded_date, website, industry, revenue, headquarters)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
        `;
    const values = [name, founded_date, website, industry, revenue, headquarters];

    client.query(query, values)
        .then(result => res.send(result.rows[0]))
        .catch(err => res.status(500).send(err))
        .finally(() => client.end());
});

// retrieve a company from the 'company_details' table by its 'id'
app.get('/companies/:id', (req, res) => {
    const query = `
        SELECT *
        FROM company_details
        WHERE id = $1;
        `;
    const values = [req.params.id];

    client.query(query, values)
        .then(result => res.send(result.rows[0]))
        .catch(err => res.status(500).send(err))
        .finally(() => client.end());
});

// retrieves all companies from the 'company_details' table
app.get('/companies', (req, res) => {
    const query = `
        SELECT *
        FROM company_details`;

    client.query(query)
        .then(result => res.send(result.rows))
        .catch(err => res.status(500).send(err))
        .finally(() => client.end());
});

// update a company in the 'company_details' table
app.put('/companies/:id', (req, res) => {
    const { name, founded_date, website, industry, revenue, headquarters } = req.body;
    const query = `
        UPDATE company_details
        SET name = $2, founded_date = $3, website = $4, industry = $5, revenue = $6, headquarters = $7
        WHERE id = $1
        RETURNING *;
        `;
    const values = [req.params.id, name, founded_date, website, industry, revenue, headquarters];

    client.query(query, values)
        .then(result => res.send(result.rows[0]))
        .catch(err => res.status(500).send(err))
        .finally(() => client.end());
});

// delete a company from the 'company_details' table
app.delete('/companies/:id', (req, res) => {
    const query = `
        DELETE FROM company_details
        WHERE id = $1
        RETURNING *;
        `;
    const values = [req.params.id];

    client.query(query, values)
        .then(result => res.send(result.rows[0]))
        .catch(err => res.status(500).send(err))
        .finally(() => client.end());
});


// start the express app on port 3000
app.listen(PORT, function (err) {
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})

