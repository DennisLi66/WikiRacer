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
  else if (req.query.random === 'false' && req.query.start && req.query.end){
    console.log("Accessing WikiJS for checking...")
    var isError = false;
    var start = req.query.start;
    var end = req.query.end;
    var startList = [];
    wiki().page(start).then(
      page => {
        if (page.pageprops && 'disambiguation' in page.pageprops){
          page.links().then(links =>{
            startList = links;
          }).finally(function(){
            wiki().page(end).then(
              page => {
                if (page.pageprops && 'disambiguation' in page.pageprops){
                  page.links().then(links =>{
                    endList = links;
                    console.log("Both Start and End Were ambiguous");
                    res.render('disambiguation',{
                      banner: 'Workspace: Disambiguation',
                      startTerm: start,
                      sAmbiguous: true,
                      sList: startList,
                      endTerm: end,
                      eAmbiguous: true,
                      eList: endList
                    })
                  });
                }else{
                  console.log("Only Start Was Ambiguous");
                  res.render('disambiguation',{
                    banner: 'Workspace: Disambiguation',
                    startTerm: start,
                    sAmbiguous: true,
                    sList: startList,
                    endTerm: end,
                    eAmbiguous: false,
                    eList: []
                  })
                }
              }, error => {
                res.render("wikiracer",{
                          banner:"WikiRacer",
                          errorMsg: ''
                        });
              }
            )
          });
        }
        else{
          wiki().page(end).then(
            page => {
              if (page.pageprops && 'disambiguation' in page.pageprops){
                page.links().then(links =>{
                  endList = links;
                  console.log("Only End was ambiguous");
                  res.render('disambiguation',{
                    banner: 'Workspace: Disambiguation',
                    startTerm: start,
                    sAmbiguous: false,
                    sList: [],
                    endTerm: end,
                    eAmbiguous: true,
                    eList: endList
                  })
                });
              }else{
                //FIX THIS CHECK IF START NEEDS
                console.log("Nobody was ambiguous");
                res.render('wikiRacerStart',{
                  banner: 'WikiRacer: Game',
                  start: start,
                  end: end
                })
              }
            }, error => {
              res.render("wikiracer",{
                        banner:"WikiRacer",
                        errorMsg: ''
                      });
            }
          )
        }
      },error => {
        res.render("wikiracer",{
                  banner:"WikiRacer",
                  errorMsg: ''
                });
  })
}
else{
  res.redirect("/wikiracer");
}



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
