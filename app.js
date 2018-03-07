const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use((req,res,next)=> {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})
const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/api',require('./router'))
app.listen(8093, () => {
    console.log("server started listening")
})
