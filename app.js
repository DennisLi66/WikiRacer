require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const cookieParser = require('cookie-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const randomatic = require('randomatic');
const wiki = require('wikijs').default;

const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());

//FIX THIS: Track pages and display them on finishing screen

app.get("/", function(req, res) {
  res.clearCookie('pages');
  res.clearCookie('wikiracer');
  res.render("front", {
    banner: "WikiRacer"
  });
})

app.get("/description", function(req, res) {
  res.clearCookie('pages');
  res.clearCookie('wikiracer');
  res.render("description", {
    banner: "What is WikiRacer?"
  })
})

app.get("/wikiracer", function(req, res) {
  res.clearCookie('pages');
  res.clearCookie('wikiracer');
  if (req.cookies.wikiracer) {
    res.redirect("/wikiracer/game");
  } else {
    res.render("wikiracer", {
      banner: "WikiRacer",
      errorMsg: 'hidden'
    })
  }
})
app.get("/2pages", function(req, res) {
  res.clearCookie('wikiracer');
  if (req.cookies.pages) {
    res.redirect("/2pages/game");
  } else {
    res.render('2pages', {
      banner: "WikiRacer: 2Pages",
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
      //console.log(start);
      //console.log(end);
      let cookieObj = {
        start: start,
        current: start,
        end: end,
        steps: 0,
        history: ''
      }
      res.cookie("wikiracer", cookieObj);
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
                  current: start,
                  end: end,
                  steps: 0,
                  history: ''
                }
                res.cookie("wikiracer", cookieObj);
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
        lStart: start,
        rStart: end,
        cLeft: start,
        cRight: end,
        steps: 0,
        history: '',
        orientation: ''
      }
      res.cookie("pages", cookieObj);
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
                  lStart: start,
                  rStart: end,
                  cLeft: start,
                  cRight: end,
                  steps: 0,
                  history: '',
                  orientation: ''
                }
                res.cookie("pages", cookieObj);
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

app.get("/restart",function(req,res){
  res.clearCookie("wikiracer");
  res.clearCookie("pages");
  res.redirect("/wikiracer");

})
app.get("/restart2",function(req,res){
  res.clearCookie("wikiracer");
  res.clearCookie("pages");
  res.redirect("/2pages");
})

app.route("/wikiracer/game")
  .get(function(req, res) {
  if (!req.cookies.wikiracer) {
    console.log("Not Allowed!")
    res.redirect("/wikiracer");}
  else {
    var current = req.cookies.wikiracer.current;
    var end = req.cookies.wikiracer.end;
    if (current.toUpperCase().replace(/ /g,"_") === end.toUpperCase().replace(/ /g,"_")) {
      var splList = req.cookies.wikiracer.history.split('^');
      res.render("wikiRacerVictory", {
        banner: "WikiRacer: Game - Victory!",
        start: req.cookies.wikiracer.start,
        end: req.cookies.wikiracer.end,
        steps: req.cookies.wikiracer.steps,
        history: splList
      })
    } else {
      var url = encodeURI('https://en.wikipedia.org/wiki/' + current);
      // console.log(url);
      axios(url)
        .then(response =>
          {
          const html = response.data;
          const $ = cheerio.load(html);
          var links = $('a');
          const linkSet = new Set();
          for (let i = 0; i < links.length; i++) {
            var regex = '^\/wiki\/[\-.,%"\'#_\(\)A-Za-z0-9]+$';
            if (links[i].attribs && links[i].attribs.title && links[i].attribs.href
              && links[i].attribs.href.match(regex) && links[i].attribs.href !== '/wiki/Main_Page'
                 && links[i].attribs.href !== '/wiki/' + current.replace(/ /g,"_") ) {
              linkSet.add(links[i].attribs.title);
              //console.log(links[i].attribs.href);
            }
          }
          //console.log(linkSet);
          res.render('wikiRacerGame',{
            current: req.cookies.wikiracer.current,
            end: req.cookies.wikiracer.end,
            banner: 'WikiRacer: Game',
            links: linkSet,
            steps: req.cookies.wikiracer.steps
          })
        })
    }}
})
  .post(function(req,res){
    // console.log(req.body.link);
    var newCookie = {
      start: req.cookies.wikiracer.start,
      current: req.body.link,
      end: req.cookies.wikiracer.end,
      steps: req.cookies.wikiracer.steps + 1,
      history: req.cookies.wikiracer.history + '^' + req.body.link
    };
    res.cookie("wikiracer",newCookie);
    res.redirect("back")
  })
app.route("/2pages/game")
  .get(function(req, res) {
    if (!req.cookies.pages) {
      res.redirect("/2pages")
    } else {
      var cLeft = req.cookies.pages.cLeft;
      var cRight = req.cookies.pages.cRight;
      if (cLeft.toUpperCase().replace(/ /g,"_") === cRight.toUpperCase().replace(/ /g,"_")) {
        //Convert History and Orientation into lists
        res.render("2pagesVictory", {
          banner: "2pages: Victory!",
          lStart: req.cookies.pages.lStart,
          rStart: req.cookies.pages.rStart,
          current: req.cookies.pages.cLeft,
          steps: req.cookies.pages.steps,
          history: req.cookies.pages.history.split('^'),
          orientation: req.cookies.pages.orientation
        })
      } else {
        var url1 = encodeURI('https://en.wikipedia.org/wiki/' + cLeft);
        var url2 = encodeURI('https://en.wikipedia.org/wiki/' + cRight);
        axios(url1)
          .then(response1 => {
            const html1 = response1.data;
            const $ = cheerio.load(html1);
            var links = $('a');
            const linkSet1 = new Set();
            for (let i = 0; i < links.length; i++){
              var regex = '^\/wiki\/[\-.,%"\'#_\(\)A-Za-z0-9]+$';
              if (links[i].attribs && links[i].attribs.title && links[i].attribs.href
                && links[i].attribs.href.match(regex) && links[i].attribs.href !== '/wiki/Main_Page'
                   && links[i].attribs.href !== '/wiki/' + cLeft.replace(/ /g,"_") ) {
                linkSet1.add(links[i].attribs.title);
                //console.log(links[i].attribs.href);
              }
            }
            //move on to url2
            axios(url2)
              .then(response2 => {
                const html2 = response2.data;
                const $ = cheerio.load(html2);
                var links = $('a');
                const linkSet2 = new Set();
                for (let i = 0; i < links.length; i++){
                  var regex = '^\/wiki\/[\-.,%"\'#_\(\)A-Za-z0-9]+$';
                  if (links[i].attribs && links[i].attribs.title && links[i].attribs.href
                    && links[i].attribs.href.match(regex) && links[i].attribs.href !== '/wiki/Main_Page'
                       && links[i].attribs.href !== '/wiki/' + cRight.replace(/ /g,"_") ) {
                    linkSet2.add(links[i].attribs.title);
                    //console.log(links[i].attribs.href);
                  }
                }
                // console.log(linkSet1);
                // console.log(linkSet2);
                res.render('2pagesGame',{
                  banner: "WikiRacer: 2Pages Game",
                  cLeft: req.cookies.pages.cLeft,
                  cRight: req.cookies.pages.cRight,
                  linksLeft: linkSet1,
                  linksRight: linkSet2,
                  steps: req.cookies.pages.steps
                })


              })
          })
      }
    }
  })
  .post(function(req,res){
    var orientation = req.body.orientation;
    var link = req.body.link;
    var newCookie;
    if (orientation === 'L'){
      var newCookie = {
        lStart: req.cookies.pages.lStart,
        rStart: req.cookies.pages.rStart,
        cLeft: req.body.link,
        cRight: req.cookies.pages.cRight,
        steps: req.cookies.pages.steps + 1,
        history: req.cookies.pages.history + '^' + req.body.link,
        orientation: req.cookies.pages.orientation + req.body.orientation
      };
    }
    else if (orientation === 'R'){
      var newCookie = {
        lStart: req.cookies.pages.lStart,
        rStart: req.cookies.pages.rStart,
        cLeft: req.cookies.pages.cLeft,
        cRight: req.body.link,
        steps: req.cookies.pages.steps + 1,
        history: req.cookies.pages.history + '^' + req.body.link,
        orientation: req.cookies.pages.orientation + req.body.orientation
      };
    }
    res.cookie("pages",newCookie);
    res.redirect('back');
  })

app.get("/test",function(req,res){
  axios("https://en.wikipedia.org/wiki/Abraham_Lincoln")
    .then(response => {
      const html = response.data;
      // console.log(html);
      const $ = cheerio.load(html);
      var links = $('a');
      //Create a set and push all the elements in there
      //Remove Image Links
      const linkSet = new Set();
      for (let i = 0 ; i < links.length; i++){
        var regex = '^\/wiki\/[\-.,%"\'#_\(\)A-Za-z0-9]+$';
        if (links[i].attribs && links[i].attribs.title && links[i].attribs.href && links[i].attribs.href.match(regex)){
          // console.log(links[i].attribs.href);
          linkSet.add(links[i].attribs.title);
        }
      }
      res.render("testFiles/test",{
        banner: "WikiRacer: Test Page",
        html: linkSet
      })
    })

})

app.listen(3000, function() {
  console.log("Server Started.")
});
