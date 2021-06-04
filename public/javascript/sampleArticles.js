var articles = [
  "Abraham_Lincoln",
  "Jason Mraz",
  "Nintendo",
  "Jimi_Hendrix",
  "Cashew",
  "Javascript",
  "Ikea",
  "Nitrogen",
  'Georgia_(Country)',
  "Tornado",
  "Count_Dracula",
  "Marie Curie",
  "Napkin",
  "Raid:_Shadow_Legends",
  "M. Night Shyamalan",
  "Walt Disney",
  "Dentistry",
  "Aura_(paranormal)",
  "Artificial intelligence",
  "Emu",
  "Parkour",
  "Paradox",
  "Batman",
  "Neolithic Revolution"
]
var goodStarts = [
  "Napkin",
  "Raid:_Shadow_Legends",
  "M. Night Shyamalan",
  "Walt Disney",
  "Dentistry",
  "Aura_(paranormal)",
  "Artificial intelligence",
  "Emu",
  "Parkour",
  "Paradox",
  "Neolithic Revolution",
  "Jason Mraz",
  "Jimi_Hendrix",
  "Javascript",
  "Cashew",
  "Count_Dracula",
  "Javascript",
  "Ikea",
  "Nitrogen",
  "Batman"
]
var goodEnds = [
  "Marie Curie",
  "Abraham_Lincoln",
  "Nintendo",
  'Georgia_(Country)',
  "Tornado",
  "Halloween"
]

function getTwoArticlesChaos() {
  var start2End = {};
  var start = -1;
  var end = -1;
  start = Math.floor(Math.random() * articles.length);
  end = Math.floor(Math.random() * articles.length);
  while (start == end) {
    end = Math.floor(Math.random() * articles.length);
  }
  start2End["start"] = articles[start];
  start2End["end"] = articles[end];
  //get 2 random values that are not the same
  //get those values out of articles and map them to this function
  console.log(start2End);
  return start2End;
}
function getTwoArticlesFair(){
  var start2End = {};
  start = Math.floor(Math.random() * goodStarts.length);
  end = Math.floor(Math.random() * goodEnds.length);
  start2End["start"] = goodStarts[start];
  start2End["end"] = goodEnds[end];
  console.log(start2End);
  return start2End;
}
function getTwoTrueRandom(){
  //ADD LATER
}
