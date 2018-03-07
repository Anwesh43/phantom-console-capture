const express = require('express')
const router = express.Router()
router.post('/postError', function(req,res) {
    console.log(req.body)
    res.send("successful")
})
module.exports = router
