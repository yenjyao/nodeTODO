require('dotenv').config()

const express = require("express")
const mongoose = require("mongoose")

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true})

// Create a schema - like a blueprint
const todoSchema = new mongoose.Schema({
    item: String
})

const Todo = mongoose.model('Todo', todoSchema)
/* let itemOne = Todo({item: "water plants"}).save((err) => {
    if(err) throw err
    console.log('item saved')
}) */

var urlencodedParser = express.urlencoded({ extended: false })
// let data = [{item: 'get milk'}, {item: 'water plants'}, {item: 'do work'}]

module.exports = app => {

    app.get('/todo', (req, res) => {
        // Find all in the Todo database and render
        Todo.find({}, (err, data) => {
            if(err) throw err
            res.render('todo', {todos: data})
        })
    })

    app.post('/todo', urlencodedParser, (req, res) => {
        // get data from the view and add to mongoDB
        let newTodo = new Todo(req.body).save((err, data) => {
            if(err) throw err
            res.json(data)
        })
    })

    app.delete('/todo/:item', (req, res) => {
        // Delete req item from mongoDb
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove((err, data) => {
            if(err) throw err
            res.json(data)
        })
    })
}