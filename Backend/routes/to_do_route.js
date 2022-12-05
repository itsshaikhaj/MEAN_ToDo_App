const express = require('express');
const router = express.Router();
const ToDo = require('../models/to_do_models');


// TODO ADD
router.post('/', async (req, res, next) => {
    console.log('req :', req.body);
    try {
        const todo = new ToDo(req.body)
        await todo.save();
        res.status(200).json({
            status: true,
            message: 'Record added successfully!'
        });
    } catch (error) {
        console.log('error :', error);
        res.status(400).json({ message: 'Something went wrong!', err: error })
    }
})

// TODO LIST
router.get('/', async (req, res, next) => {
    try {
        const todoList = await ToDo.find({}).sort({ created_at: -1 })
        res.status(200).json({
            status: true,
            message: todoList.length ? "Data found!" : "Data not found!",
            data: todoList
        });
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong!', err: error })
    }
})

// TODO get toDoById
router.get('/:_id', async (req, res, next) => {
    try {
        const todoId = req.params._id;
        const todo = await ToDo.findById(todoId)
        res.status(200).json({
            status: true,
            message: todo ? "Data found!" : "ToDo doesn't exists!",
            data: todo
        });
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong!', err: error })
    }
})

// TODO update TODO
router.put('/:_id', async (req, res, next) => {
    try {
        const update = req.body
        const todoId = req.params._id;
        await ToDo.findByIdAndUpdate(todoId, update);
        const todo = await ToDo.findById(todoId)
        res.status(200).json({
            status: true,
            message: 'Data has been updated successfully!',
            data: todo,
        });
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong!', err: error })
    }
})

// TODO delete todo
router.delete('/:_id', async (req, res, next) => {
    try {
        const todoId = req.params._id;
        console.log('todoId :', todoId);
        await ToDo.findByIdAndDelete(todoId);
        res.status(200).json({
            status: true,
            message: 'Data has been deleted successfully!',
            data: null,
        });
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong!', err: error })
    }
})



module.exports = router;