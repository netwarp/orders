import express from 'express'
import nunjucks from 'nunjucks'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import 'dotenv/config'

await mongoose.connect('mongodb://127.0.0.1:27017/trade')

const app = express()

nunjucks.configure('views', {
    autoescape: true,
    express: app,
    watch: true
})

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (request, response) => {
    response.render('index.html')
})


import * as ApiController from './controllers/API/ApiController.mjs'
app.get('/api/orders', ApiController.orders)
app.post('/api/post-order', ApiController.postOrder)
app.get('/api/orders/refresh', ApiController.refresh)
app.get('/api/orders/prefill', ApiController.prefill)

app.listen(8080, () => console.log('localhost:8080'))
