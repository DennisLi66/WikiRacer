const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const cookieParser = require('cookie-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const randomatic = require('randomatic');
const wiki = require("wikijs")
// import getPoints from '/javascript/sampleArticles.js'

const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
// var connection = mysql.createConnection({
//   host: process.env.HOST,
//   user: process.env.USER,
//   password: process.env.PASSWORD,
//   database: process.env.DATABASE,
//   multipleStatements: true
// })
// connection.connect();

//FIX THIS ADD DOTENV FILE
//FIX THIS ADD PROPER MYSQL FOR HIGH SCORES

app.get("/",function(req,res){
  res.render("front",{
    banner: "WikiRacer"
  });
})

app.get("/description",function(req,res){

  res.render("description",{
    banner: "What is WikiRacer?"
  })
})

app.get("/wikiracer",function(req,res){
  res.render("wikiracer",{
    banner:"WikiRacer"
  })
})
app.post("/wikiracer",function(req,res){
  
})

app.get("/checkit",function(req,res){
  //read to see if start and ends are valid using wikijs
  //may need to replace .replace(/ /g,"_")
  console.log(req.query.random);
  console.log(req.query.start);
  console.log(req.query.end);
  res.send("http://localhost:3000/description")
})
app.get("/wikiracer/game",function(req,res){

})

app.listen(3000, function() {
  console.log("Server Started.")
});
