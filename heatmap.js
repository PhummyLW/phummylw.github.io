// Include D3.js or another visualization library
const ws = new WebSocket('ws://localhost:3000');

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'update') {
        renderHeatmap(data.clicks);
    }
};

function renderHeatmap(clicks) {
    const heatmap = document.getElementById('heatmap');
    heatmap.innerHTML = ''; // Clear existing heatmap

    clicks.forEach(click => {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.style.left = `${click.x}px`;
        dot.style.top = `${click.y}px`;
        heatmap.appendChild(dot);
    });
}
