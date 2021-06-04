//have a function for retrieving the two inputs from the inputs
function extractUserInputs(){
  document.getElementById("notices").innerHTML = '';
  var startPoint, endPoint;
  var startPoint = document.getElementById("startPoint").value;
  var endPoint = document.getElementById("endPoint").value;
  if (startPoint && endPoint){
    //create 2 hyperlinks from the endpoints
    toUrl(startPoint);
    toUrl(endPoint);
  }
  else if (!startPoint && !endPoint){
    console.log("No Start or End Value");
    document.getElementById('notices').innerHTML =
    `
    <div class='errorMsg'>You need to have both a start and end value inputted.</div>
    `;
  }
  else if (!startPoint){
    console.log("No Start Value");
    document.getElementById('notices').innerHTML =
    `
    <div class='errorMsg'>You need to include a starting position.</div>
    `;
  }
  else if (!endPoint){
    console.log("No End Value");
    document.getElementById('notices').innerHTML =
    `
    <div class='errorMsg'>You need to include an ending position.</div>
    `;
  }
}
//have a function for retrieving any input
function grabWikipediaSimple(){

}

function grabWikipediaEverything(){

}

function isUrl(){

}
function toUrl(term){
  // Regex with https:   ^((https:\/\/)?(en.)?wikipedia.org\/wiki\/).+$
  // Regex without https: ^((en.)?wikipedia.org\/wiki\/).+$
  //if doesnt match regex add the valid content to it
  var httpsReg = '^((https:\/\/)?(en.)?wikipedia.org\/wiki\/).+$';
  var nohttpsReg = '^((en.)?wikipedia.org\/wiki\/).+$';
  if (term.match(httpsReg)){
    //convert spaces to underscores
    //add https:// and stuff to the beginning
    console.log("Good Url");
    return term;
  }else if (term.match(nohttpsReg)){
    console.log("Needs Https");
    return "https://" + term;
  }
  else{
    //convert to full url
    console.log("Only Terms");
    return "https://en.wikipedia.org/wiki/" + term.replace(/ /g,"_");
  }
}
