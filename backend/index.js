const express = require('express');
const loki = require('lokijs');
const {v4: uuid} = require('uuid');

const app = express();
const APP_PORT = 3000;

app.use(express.json());
const db = new loki('comments');
db.loadDatabase({}, () => {
    const commentsCollection = db.getCollection('comments');

    app.post('/', (req, res) => {
        const {author_name, body, parent_id} = req.body;

        if (!(author_name && body)) {
            res.status(400).send('Bad request');
        }

        const id = uuid();
        const datetime = new Date();
        const comment = {id, parent_id, author_name, body, datetime}

        commentsCollection.insert(comment);

        res.send(comment);
    });

    app.get('/', (req, res) => {
        const comments = commentsCollection.chain().find().data();
        res.send(comments);
    });

    app.get('*', function(req, res){
        res.status(404).send('Nothing found');
    });

    app.listen(APP_PORT, () => {
        console.log('Started app on port ' + APP_PORT)
    });
});

process.on('SIGINT', function() {
    console.log("Shutting down...");

    db.saveDatabase();
    process.exit();
});