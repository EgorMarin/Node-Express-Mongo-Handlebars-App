const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const todoRoutes = require('./routes/todos')
const path = require('path')

const PORT = process.env.PORT || 3000
const app = express()

//Подключаем handlebars
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

//Чтобы считывать параметр body у title в router.post
app.use(express.urlencoded({extended: true}))

//Чтобы express нашел откуда считывать файлы для стилей, которые подключили в head
app.use(express.static(path.join(__dirname, 'public')))


app.use(todoRoutes)

async function start() {
  try {  //Подключаемся к MongoDB
    await mongoose.connect(
      'mongodb+srv://Egor:18Lavufo@cluster0-ydrsj.mongodb.net/todos', {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })
    app.listen(PORT, () => {
      console.log('Server started...')
    })
  } catch(e) {
    console.log(e)
  }
}

start()

