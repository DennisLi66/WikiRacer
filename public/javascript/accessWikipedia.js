// import wiki from '.wikijs';
//have a function for retrieving the two inputs from the inputs
function extractUserInputs(){
  document.getElementById("notices").innerHTML = '';
  var startPoint, endPoint;
  var startPoint = document.getElementById("startPoint").value;
  var endPoint = document.getElementById("endPoint").value;
  if (startPoint && endPoint){
    document.getElementById('wikiForm').submit();
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

function extractStarts(){
  //basically the same but has slightly different wording
  document.getElementById("notices").innerHTML = '';
  var startPoint, endPoint;
  var startPoint = document.getElementById("startPoint").value;
  var endPoint = document.getElementById("endPoint").value;
  if (startPoint && endPoint){
    document.getElementById('wikiForm').submit();
  }
  else if (!startPoint && !endPoint){
    console.log("Neither Starting Point");
    document.getElementById('notices').innerHTML =
    `
    <div class='errorMsg'>You need to have both starting values inputted.</div>
    `;
  }
  else if (!startPoint){
    console.log("Start Value 1 Missing");
    document.getElementById('notices').innerHTML =
    `
    <div class='errorMsg'>You need to include your first starting position.</div>
    `;
  }
  else if (!endPoint){
    console.log("No End Value");
    document.getElementById('notices').innerHTML =
    `
    <div class='errorMsg'>You need to include your second starting position.</div>
    `;
  }
}
