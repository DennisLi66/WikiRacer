function submitThisLink(data){
  document.getElementById('link').value = data;
  //console.log(data);
  document.getElementById('linkForm').submit()
}

function submitThisLinkLeft(data){
  document.getElementById('link1').value = data;
  //console.log(data);
  document.getElementById('linkFormLeft').submit()
}

function submitThisLinkRight(data){
  document.getElementById('link2').value = data;
  //console.log(data);
  document.getElementById('linkFormRight').submit()
}
