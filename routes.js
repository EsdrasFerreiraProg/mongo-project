const express = require('express');
const router = express.Router();
const userSchema = require('./schema');

router.get("/css/styles-index.css", (req, res)=>{
    
    res.sendFile(__dirname + '/css/styles-index.css');

});

router.get("/css/styles-listar.css", (req, res)=>{
    
    res.sendFile(__dirname + '/css/styles-listar.css');

});

router.get("/", (req, res)=>{
    res.redirect("/diario");

});

router.get("/diario", (req,res)=>{
    res.sendFile(__dirname + "/html/index.html");
});
    



module.exports = router;