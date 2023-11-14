const express = require('express');
const bodyParser = require('body-parser');


// DB Connect String
const connect = "postgres://postgres:kamasho997@localhost/node_crud";
const pg = require('pg');
const { Pool } = require('pg');
var pool = new Pool({
    connectionString: connect,
});


const path = require('path');
const cons = require('consolidate');
const dust = require('dustjs-helpers');
const app = express();

// Assign Dust Engine to .dust Files
app.engine('dust', cons.dust);

// Set Default Ext .dust
app.set('view engine', 'dust');
app.set('views', __dirname, '/views');

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// get recipe API's
app.get('/', (req, res) => {
    // PG connection
    pool.connect((err, client, done) => {
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        client.query('SELECT * FROM recipes', (err, result) => {
            if (err) {
                return console.error('error running query', err);
            }
            res.render('views/index', { recipes: result.rows });
            done();
        });
        // pool.end();
    });
})

// Add Recipe API's
app.post('/add', (req, res) => {
    // PG connection
    pool.connect((err, client, done) => {
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        client.query('INSERT INTO recipes(name, ingredients, directions) VALUES($1, $2, $3)',
            [req.body.name, req.body.ingredients, req.body.directions],(err, result) => {
            if (err) {
                return console.error('error running query', err);
            }
            done();
            res.redirect('/');
        });
        // pool.end();
    });         
});

// Delete Recipe API's
app.delete('/delete/:id', (req, res) => {
    // PG connection
    pool.connect((err, client, done) => {
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        client.query('DELETE FROM recipes WHERE id = $1',
            [req.params.id],(err, result) => {
            if (err) {
                return console.error('error running query', err);
            }
            done();
            res.sendStatus(200);
        });
        // pool.end();
    });
});

// Update Recipe API's
app.post('/edit', (req, res) => {
    // PG connection
    pool.connect((err, client, done) => {
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        client.query('UPDATE recipes SET name=$1, ingredients=$2, directions=$3 WHERE id=$4', 
        [req.body.name, req.body.ingredients, req.body.directions, req.body.id],(err, result) => {
            if (err) {
                return console.error('error running query', err);
            }
            done();
            res.redirect('/');
        });
        // pool.end();
    });
});

// Server
app.listen(3000, () => {
    console.log("Server Started on Port 3000");
})