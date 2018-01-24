// Generate JSON to send to server on game start.
export function generateGameStartJSON() {
    return JSON.stringify({type: 'gameStart'});
}

// Generate JSON to send to server on game start.
export function generateDieRollJSON() {
    return JSON.stringify({type: 'dieRoll', name: document.getElementByID("username").value;});
}

// Send a POST request to the server for the game start.
export function gameStartRequest(serverAddress, callback) {
    const ajaxRequest = new XMLHttpRequest();
    ajaxRequest.open('POST', serverAddress, true);
    ajaxRequest.onreadystatechange = () => callback(ajaxRequest);
    ajaxRequest.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    ajaxRequest.send(generateGameStartJSON());
}

// Send a POST request to the server for a die roll.
export function dieRollRequest(serverAddress, callback) {
    const ajaxRequest = new XMLHttpRequest();
    ajaxRequest.open('POST', serverAddress, true);
    ajaxRequest.onreadystatechange = () => callback(ajaxRequest);
    ajaxRequest.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    ajaxRequest.send(generateDieRollJSON());
}