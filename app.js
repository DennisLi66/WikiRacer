require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const cookieParser = require('cookie-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const randomatic = require('randomatic');
const wiki = require('wikijs').default;
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
    banner:"WikiRacer",
    errorMsg: 'hidden'
  })
})
app.post("/wikiracer",function(req,res){

})

app.get("/checkit",function(req,res){
  //read to see if start and ends are valid using wikijs
  //may need to replace .replace(/ /g,"_")
  var random = req.query.random;
  console.log(random);
  if (req.query.random === 'true'){
    console.log("Accessing WikiJS for randomization...");
    wiki().random(2).then(results => {
      var start = results[0].replace(/ /g,"_");
      var end = results[1].replace(/ /g,"_");
      console.log(start);
      console.log(end);
      res.redirect("/wikiracer/game?start=" + start + "&end=" + end);
    }
    );
  }
  else{
    console.log("Accessing WikiJS for checking...")
    var start = req.query.start;
    var end = req.query.end;
    console.log(start);
    console.log(end);
    wiki().page(start).then(page => {
      console.log("The start was valid.");
      wiki().page(end).then(page1 => {
        console.log("The end was valid.");
        console.log(page1)
        //FIX THIS: Redirect off a disambiguation page, possibly use the first hyperlink
        //FIX THIS, Proper Redirecting
      })
      .catch(function(error){
          console.log("Failure");
          res.render("wikiracer",{
            banner:"WikiRacer",
            errorMsg: ''
          })
      })
    })
    .catch(function(error){
        console.log("Failure");
        res.render("wikiracer",{
          banner:"WikiRacer",
          errorMsg: ''
        })
    })
  }
  //if bad send to error page on render
  //res.send("http://localhost:3000/description")
})
app.get("/wikiracer/game",function(req,res){
  console.log(req.query.start);
  console.log(req.query.end);
})

app.listen(3000, function() {
  console.log("Server Started.")
});
