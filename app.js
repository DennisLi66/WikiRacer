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

app.get("/", function(req, res) {
  req.clearCookie('pages');
  req.clearCookie('wikiracer');
  res.render("front", {
    banner: "WikiRacer"
  });
})

app.get("/description", function(req, res) {
  req.clearCookie('pages');
  req.clearCookie('wikiracer');
  res.render("description", {
    banner: "What is WikiRacer?"
  })
})

app.get("/wikiracer", function(req, res) {
  req.clearCookie('pages');
  req.clearCookie('wikiracer');
  if (req.cookies.wikiracer){
    res.redirect("/wikiracer/game");
  }
  else{
  res.render("wikiracer", {
    banner: "WikiRacer",
    errorMsg: 'hidden'
  })
}
})
app.get("/checkit", function(req, res) {
  var random = req.query.random;
  // console.log(random);
  if (random === 'true') {
    console.log("Accessing WikiJS for randomization...");
    wiki().random(2).then(results => {
      var start = results[0].replace(/ /g, "_");
      var end = results[1].replace(/ /g, "_");
      console.log(start);
      console.log(end);
      let cookieObj = {
        start: start,
        end: end
      }
      res.cookie("wikiracer",cookieObj);
      res.redirect("/wikiracer/game");
    });
  } else if (random === 'false' && req.query.start && req.query.end) {
    console.log("Accessing WikiJS for checking...");
    var start = req.query.start;
    var end = req.query.end;
    var startList = [];
    var endList = [];
    wiki().page(start).then(
      page => {
        if (page.pageprops && 'disambiguation' in page.pageprops) {
          page.links().then(links => {
            startList = links;
          }).finally(function() {
            wiki().page(end).then(
              page => {
                if (page.pageprops && 'disambiguation' in page.pageprops) {
                  page.links().then(links => {
                    endList = links;
                    console.log("Both Start and End Were ambiguous");
                    res.render('disambiguation', {
                      banner: 'WikiRacer: Disambiguation',
                      startTerm: start,
                      sAmbiguous: true,
                      sList: startList,
                      endTerm: end,
                      eAmbiguous: true,
                      eList: endList
                    })
                  });
                } else {
                  console.log("Only Start Was Ambiguous");
                  res.render('disambiguation', {
                    banner: 'WikiRacer: Disambiguation',
                    startTerm: start,
                    sAmbiguous: true,
                    sList: startList,
                    endTerm: end,
                    eAmbiguous: false,
                    eList: []
                  })
                }
              }, error => {
                res.render("wikiracer", {
                  banner: "WikiRacer",
                  errorMsg: ''
                });
              }
            )
          });
        } else {
          wiki().page(end).then(
            page => {
              if (page.pageprops && 'disambiguation' in page.pageprops) {
                page.links().then(links => {
                  endList = links;
                  console.log("Only End was ambiguous");
                  res.render('disambiguation', {
                    banner: 'WikiRacer: Disambiguation',
                    startTerm: start,
                    sAmbiguous: false,
                    sList: [],
                    endTerm: end,
                    eAmbiguous: true,
                    eList: endList
                  })
                });
              } else {
                console.log("Nobody was ambiguous");
                let cookieObj = {
                  start: start,
                  end: end
                }
                res.cookie("wikiracer",cookieObj);
                res.redirect("/wikiracer/game");
              }
            }, error => {
              res.render("wikiracer", {
                banner: "WikiRacer",
                errorMsg: ''
              });
            }
          )
        }
      }, error => {
        res.render("wikiracer", {
          banner: "WikiRacer",
          errorMsg: ''
        });
      })
  } else {
    res.redirect("/wikiracer");
  }



})
app.get("/checkit2", function(req, res) {
  var random = req.query.random;
  // console.log(random);
  if (random === 'true') {
    console.log("Accessing WikiJS for randomization...");
    wiki().random(2).then(results => {
      var start = results[0].replace(/ /g, "_");
      var end = results[1].replace(/ /g, "_");
      console.log(start);
      console.log(end);
      let cookieObj = {
        start: start,
        end: end
      }
      res.cookie("pages",cookieObj);
      res.redirect("/2pages/game");
    });
  } else if (random === 'false' && req.query.start && req.query.end) {
    console.log("Accessing WikiJS for checking...");
    var start = req.query.start;
    var end = req.query.end;
    var startList = [];
    var endList = [];
    wiki().page(start).then(
      page => {
        if (page.pageprops && 'disambiguation' in page.pageprops) {
          page.links().then(links => {
            startList = links;
          }).finally(function() {
            wiki().page(end).then(
              page => {
                if (page.pageprops && 'disambiguation' in page.pageprops) {
                  page.links().then(links => {
                    endList = links;
                    console.log("Both 1 and 2 Were ambiguous");
                    res.render('disambiguation2', {
                      banner: 'WikiRacer: 2Pages - Disambiguation',
                      startTerm: start,
                      sAmbiguous: true,
                      sList: startList,
                      endTerm: end,
                      eAmbiguous: true,
                      eList: endList
                    })
                  });
                } else {
                  console.log("Only 1 Was Ambiguous");
                  res.render('disambiguation2', {
                    banner: 'WikiRacer: 2Pages - Disambiguation',
                    startTerm: start,
                    sAmbiguous: true,
                    sList: startList,
                    endTerm: end,
                    eAmbiguous: false,
                    eList: []
                  })
                }
              }, error => {
                res.render("2pages", {
                  banner: "2pages",
                  errorMsg: ''
                });
              }
            )
          });
        } else {
          wiki().page(end).then(
            page => {
              if (page.pageprops && 'disambiguation' in page.pageprops) {
                page.links().then(links => {
                  endList = links;
                  console.log("Only 2 was ambiguous");
                  res.render('disambiguation2', {
                    banner: 'WikiRacer: 2Pages - Disambiguation',
                    startTerm: start,
                    sAmbiguous: false,
                    sList: [],
                    endTerm: end,
                    eAmbiguous: true,
                    eList: endList
                  })
                });
              } else {
                console.log("Nobody was ambiguous");
                let cookieObj = {
                  start1: start,
                  start2: end
                }
                res.cookie("pages",cookieObj);
                res.redirect("/2pages/game");
              }
            }, error => {
              res.render("2pages", {
                banner: "WikiRacer: 2Pages",
                errorMsg: ''
              });
            }
          )
        }
      }, error => {
        res.render("2pages", {
          banner: "WikiRacer: 2Pages",
          errorMsg: ''
        });
      })
  } else {
    console.log(req.query);
    console.log("Else!")
    res.redirect("/2pages");
  }
})

app.get("/wikiracer/game", function(req, res) {
  req.clearCookie('pages');
  if (!res.cookie.wikiracer){
    console.log("Not Allowed!")
    res.redirect("/wikiracer");
  }else{
    res.render("wikiRacerGame",{
      banner: "WikiRacer: Game"
    })
  }
})
app.get("/2pages", function(req, res) {
  res.clearCookie('wikiracer');
  if (req.cookies.pages){
    res.redirect("/2pages/game");
  }
  else{
    res.render('2pages', {
      banner: "WikiRacer: 2Pages",
      errorMsg: 'hidden'
    })
  }
})
app.get("/2pages/game",function(req,res){
  res.clearCookie('wikiracer');
  if (!req.cookies.pages){
    res.redirect("/2pages")
  }else{
    res.render("2pagesGame",{
      banner: "2Pages: Game"
    })
  }
})

app.listen(3000, function() {
  console.log("Server Started.")
});
