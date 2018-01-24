function displayResults(players) {
  /*players = [{"username":"uname1","result":"x:x"},{"username":"uname2","result":"x:x"},....]*/
  for(var i in players){
    var username = players[i].username;
    var result = players[i].result;
    var table = document.getElementById('result_table');
    table.innerHTML.append('<tr><td>'username'</td><td>'result'</td></tr>')
  }
}
