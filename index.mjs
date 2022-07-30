import express from 'express'
import nunjucks from 'nunjucks'
import mongoose from 'mongoose'

await mongoose.connect('mongodb://127.0.0.1:27017/trade')

const app = express()

nunjucks.configure('views', {
    autoescape: true,
    express: app,
    watch: true
})

app.use(express.static('public'))


app.get('/', (request, response) => {
    response.render('index.html')
})



app.listen(8080, () => console.log('localhost:8080'))
