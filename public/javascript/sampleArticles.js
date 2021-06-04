var articles = [
  "Abraham_Lincoln",
  // "Derek Yu",
  // "Jason Mraz",
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
  // "M. Night Shyamalan",
  // "Walt Disney",
  "Dentistry",
  // "Aura_(paranormal)",
  // "Artificial intelligence",
  "Emu",
  "Parkour",
  // "Paradox",
  "Neolithic Revolution"
]

var goodStarts = [

]

var goodEnds = [

]

function getTwoArticles(){
  var start2End = {};
  var start = -1;
  var end = -1;
  start = Math.floor(Math.random() * articles.length);
  end = Math.floor(Math.random() * articles.length);
  while (start == end){
    end = Math.floor(Math.random() * articles.length);
  }
  start2End["start"] = articles[start];
  start2End["end"] = articles[end];
  //get 2 random values that are not the same
  //get those values out of articles and map them to this function
  console.log(start2End);
  return start2End;
}
