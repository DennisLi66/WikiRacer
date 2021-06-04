// import wiki from '.wikijs';
//have a function for retrieving the two inputs from the inputs
function extractUserInputs(){
  document.getElementById("notices").innerHTML = '';
  var startPoint, endPoint;
  var startPoint = document.getElementById("startPoint").value;
  var endPoint = document.getElementById("endPoint").value;
  if (startPoint && endPoint){
    //have a dotenv for the real url
    var url = "http://localhost:3000/wikiracer";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
       if (xhr.readyState === 4) {
          console.log(xhr.status);
          console.log(xhr.responseText);
          window.location = xhr.responseText;
       }};

    var data = `{
      "start": `+ startPoint +`,
      "end": `+ endPoint +`
    }`;

    xhr.send(data);
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
