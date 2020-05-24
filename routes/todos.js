const {Router} = require('express')
const router = Router()
const Todo = require('../models/todo')

router.get('/', async (req, res) => {
  const todos = await Todo.find({}).lean()

  res.render('index', {
    title: 'Todos list',
    isIndex: true,
    todos
  })
})

router.get('/create', (req, res) => {
  res.render('create', {
    title: 'Create todo',
    isCreate: true
  })
})

router.post('/create', async (req, res) => {
  const todo = new Todo({
    title: req.body.title  //title прилетает с name из input
  })

  await todo.save()
  res.redirect('/')
})

router.post('/complete', async (req, res) => {
  const todo = await Todo.findById(req.body.id)
  
  todo.completed = !!req.body.completed //при поставленной галочке прилетает с body.completed "on", а при снятой undefined. !! приводит строку к boolean значению 

  await todo.save()
  res.redirect('/')
})

router.post('/remove', async (req, res) => {
  await Todo.deleteOne({
    _id: req.body.id
  })

  res.redirect('/')
})

module.exports = router
