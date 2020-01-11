const express = require('./express')
const app = express()

app.get('/',(req,res)=>{
    res.end('/')
})

app.get('/hello',(req,res)=>{
    res.end('hello')
})

app.all('*',(req,res)=>{
    res.end('*')
})

app.listen(3000)