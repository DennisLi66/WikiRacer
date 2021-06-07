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
  var random = req.query.random;
  // console.log(random);
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
    var isError = false;
    var start = req.query.start;
    var end = req.query.end;
    var sDisambiguation = false;
    var eDisambiguation = false;
    var startList = [];
    //1: Access Start Page
    wiki().page(start).then(
      page => {
        console.log("Start Worked, so testing end");
        if (page.pageprops && 'disambiguation' in page.pageprops){
          console.log("Start Needs Disambiguation");
          page.links().then(links =>{
            sDisambiguation = true;
            startList = links;
          }).finally(function(){
            console.log("Moving on to End");
            wiki().page(end).then(
              page => {
                console.log("End Worked");
                if (page.pageprops && 'disambiguation' in page.pageprops){
                  console.log("End Needs Disambiguation");
                  page.links().then(links =>{
                    sDisambiguation = true;
                    startList = links;
                    console.log("Both Start and End Were ambiguous");
                  });
                }else{
                  console.log("Only Start Was Ambiguous")
                }
              }, error => {
                console.log("End Failed");
                res.render("wikiracer",{
                          banner:"WikiRacer",
                          errorMsg: ''
                        });
              }
            )
          });
        }
        else{
          console.log("Start was not ambiguous");
          wiki().page(end).then(
            page => {
              console.log("End Worked");

              if (page.pageprops && 'disambiguation' in page.pageprops){
                console.log("End Needs Disambiguation");
                page.links().then(links =>{
                  sDisambiguation = true;
                  startList = links;
                  console.log("Only End was ambiguous");
                });
              }else{
                //FIX THIS CHECK IF START NEEDS
                console.log("Nobody was ambiguous")
              }
            }, error => {
              console.log("End Failed");
              res.render("wikiracer",{
                        banner:"WikiRacer",
                        errorMsg: ''
                      });
            }
          )
        }
      },error => {
        console.log('Start Failed');
        res.render("wikiracer",{
                  banner:"WikiRacer",
                  errorMsg: ''
                });
  })
}
    // .finally(function(){
    //   if (!isError){
    //     wiki().page(end).then(function(){
    //       console.log("End Worked")
    //     },function(error){
    //       console.log("End Failed");
    //       isError = true;
    //     })
    //     // .then(function(){
    //     //   if (!isError && (sDisambiguation || eDisambiguation)){
    //     //     console.log("Still Ambiguous");
    //     //   }
    //     //   else if (!isError && !sDisambiguation && !eDisambiguation){
    //     //     console.log("Not Ambiguous");
    //     //   }
    //     // })
    //   }
    // })


})
app.get("/wikiracer/game",function(req,res){
  console.log(req.query.start);
  console.log(req.query.end);
})

app.route("wikiracer/start")
  .get(function(req,res){
    // if COOKIES
    res.render("wikiRacerStart",{
      banner: 'WikiRacer: Game'
    })
  })

app.listen(3000, function() {
  console.log("Server Started.")
});
