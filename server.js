"use strict";

const express = require("express");
const morgan = require("morgan");
const dao = require("./dao");
const {check, validationResult} = require('express-validator');
const cors = require('cors');

// initialize
const app = express();
const port = 3003;

// Middlewares
app.use(express.json());
app.use(morgan('dev'));
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

// Routes
// GET /api/questions
app.get("/api/questions", (request, response) => {
  dao
    .listQuestions()
    .then((questions) => response.json(questions))
    .catch(() => response.status(500).end());
});

// GET /api/questions/<id>
app.get('/api/questions/:id', async(req, res) => {
    try {
        const question = await dao.getQuestion(req.params.id);
        res.json(question);
    } catch {
        res.status(500).end();
    }
});

// POST /api/answers/<id>/vote
app.post('/api/answers/:id/vote', async (req, res) => {
    try{
        const num = await dao.voteAnswer(req.params.id, req.body.vote);
        if(num === 1)
            res.status(204).end();
        else
            throw new Error();
    } catch {
        res.status(503).end();
    }
});

// Start the server
app.listen(port, () => "API Server is running on the port" + port);
