# WikiRacer
 Wiki Racing!

# Node Modules Used:
Axios and Cheerio: Used to web scrape the hyperlinks off of Wikipedia
bodyParser, ejs, and Express: Used to rend
cookieParser: Used to remember what Wikipedia article the user started on and wants to end on
wikijs: Used to check if a wikipedia article actually exists and if it's ambiguous

# Page Descriptions:

Homepage:
The homepage is a simple homepage, meant to redirect you to other pages.

Description:
The description page briefly describes how the games on this site are meant to be played.

WikiRacer Pages:
  Decisions Page:
    On the first page, users will be able to input an article to start on and an article to end on. If the article titles aren't correct or don't exist, the user will be told that. The user can also choose randomly selected articles from the wikijs module or from my personal choices.
  Checking Page:
    If one or both of the inputted article titles were too ambiguous, they will be cleared up here.
  Game-In-Action Page:
    Players will be able to choose a link to make progress. Users can also click the destination on the stats bar to see what it is
    if they are unfamiliar with it.
  Victory Page:
    On victory, users will be shown the stats and link history of their game.

2Pages Pages:
  Decisions Page:
      On the first page, users will be able to input two articles to start on. If the article titles aren't correct or don't exist, the user will be told that. The user can also choose randomly selected articles from the wikijs module or from my personal choices.
  Checking Page:
    If one or both of the inputted article titles were too ambiguous, they will be cleared up here.
  Game-In-Action Page:
    Players will be able to choose a link on either half of the site to make progress.
  Victory Page:
    On victory, users will be shown the stats and link history of their game, associated with which links on which side were clicked.
