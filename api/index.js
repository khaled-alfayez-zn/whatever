const express = require('express');
const { Client } = require('pg');

const app = express();
app.use(express.json());
const PORT = 3000;

const pgHost = process.env.PG_HOST || "localhost";
const pgUser = process.env.PG_USER || "postgres";
const pgPassword = process.env.PG_PASSWORD || "password123";
const pgDatabase = process.env.PG_DATABASE || "companies";

// create a new PostgreSQL client
let client;

app.use((req, res, next) => {
    client = new Client({
        user: pgUser,
        host: pgHost,
        database: pgDatabase,
        password: pgPassword,
        port: 5432
    });

    client.connect()
        .then(() => next())
        .catch(err => next(err));
});

// create a new company in the 'company_details' table
app.post('/companies', (req, res, next) => {
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
        SET name = COALESCE( $2, name), 
            founded_date = COALESCE( $3, founded_date), 
            website = COALESCE( $4, website), 
            industry = COALESCE( $5, industry), 
            revenue = COALESCE( $6, revenue), 
            headquarters = COALESCE( $7, headquarters)
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

