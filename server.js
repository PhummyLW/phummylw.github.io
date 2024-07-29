const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const db = new sqlite3.Database('./clicks.db');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS clicks (id TEXT, x INTEGER, y INTEGER)");
});

app.use(express.static(path.join(__dirname, 'public')));

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const data = JSON.parse(message);
        if (data.type === 'click') {
            db.run("REPLACE INTO clicks (id, x, y) VALUES (?, ?, ?)", [data.id, data.x, data.y], () => {
                broadcastClicks();
            });
        } else if (data.type === 'control') {
            handleControl(data.action);
        }
    });
});

function broadcastClicks() {
    db.all("SELECT x, y FROM clicks", [], (err, rows) => {
        if (err) throw err;

        const clicks = rows.map(row => ({ x: row.x, y: row.y }));
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ type: 'update', clicks }));
            }
        });
    });
}

function handleControl(action) {
    if (action === 'reset') {
        db.run("DELETE FROM clicks", () => {
            broadcastClicks();
        });
    }
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
