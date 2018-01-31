import * as sendJSON from './sendJSON';


window.onload = () => {
    document.getElementById('roll_die').onclick = () => {
        sendJSON.gameStartRequest('cgi-bin/request_dice_roll.py', (req) => {
            if (req.readyState === 4 && req.status === 200) {
                const p = document.createElement('P');
                const t = document.createTextNode(req.responseText);
                p.appendChild(t);
                document.body.appendChild(t);
            }
        });
    };

    // The event source receives notifications from the server
    let eventSource = new EventSource('cgi-bin/notify_turn.py');

    // Once the event source has opened successfully:
    eventSource.onopen = () => {
        console.log('opened!');

        // Add a listener to log errors
        eventSource.addEventListener('error', (error) => {
            console.log(`SSE error: ${error.type}`);
        });

        // Add a listener to log messages
        eventSource.addEventListener('message', (message) => {
            console.log(`SSE message: ${message.data}`)
        });

        let turnCounter = 0;
        // Add a listener to handle turn notifications
        eventSource.addEventListener('turn', (message) => {
            console.log(`SSE event of type turn: ${message.data}`);
            const activeTurn = JSON.parse(message.data).activeTurn;
            const username = document.querySelector('#username').value;
            // End the turn if it’s yours and you’ve been notified 5 times
            if (activeTurn == document.querySelector('#username').value && ++turnCounter == 5) {
                console.log('Ending turn');
                turnCounter = 0;
                sendJSON.sendJSON({
                    jsonObject: {},
                    serverAddress: 'cgi-bin/end_turn.py',
                    callback: () => {}
                });
            }
        });
    };

    // Add user to the turn order when they submit their username
    document.querySelector('#usernameInput').onclick = (click) => {
        click.preventDefault();
        const username = document.querySelector('#username').value;
        sendJSON.sendJSON({
            jsonObject: {'username': username},
            serverAddress: 'cgi-bin/create_user_entry.py',
            callback: () => {}
        });
        ws.send(username);
    };

    let loc = window.location, new_uri;
    if (loc.protocol === "https:") {
        new_uri = "wss:";
    } else {
        new_uri = "ws:";
    }
    new_uri += "//" + loc.host;
    new_uri += loc.pathname + "ws2/";

    let ws = new WebSocket(new_uri),
        messages = document.createElement('ul');
    ws.onopen = function() {
        ws.send('Hello!');
    }
    ws.onmessage = function (event) {
        var messages = document.getElementsByTagName('ul')[0],
            message = document.createElement('li'),
            content = document.createTextNode(event.data);
        message.appendChild(content);
        messages.appendChild(message);
    };
    document.body.appendChild(messages);
};
