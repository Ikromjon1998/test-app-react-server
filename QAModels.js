"use strict";

const dayjs = require("dayjs");

// Define the Answer class
function Answer(id, text, name, date, score = 0) {
  this.id = id;
  this.text = text;
  this.name = name;
  this.score = score;
  this.date = dayjs(date);
}

// Define the Question class
function Question(id, text, author, date) {
  this.id = id;
  this.text = text;
  this.author = author;
  this.date = dayjs(date);
}

// Export the Question and Answer classes
module.exports = { Question, Answer };
