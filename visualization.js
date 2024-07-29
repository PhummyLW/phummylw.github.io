const API_ENDPOINT = 'https://h0g8ck27xf.execute-api.us-west-1.amazonaws.com/prod';

async function fetchClicks() {
    const response = await fetch(`${API_ENDPOINT}/clicks`);
    const data = await response.json();
    renderVisualization(data.clicks);
}

function renderVisualization(clicks) {
    const visualization = document.getElementById('visualization');
    visualization.innerHTML = ''; // Clear existing visualization

    const width = visualization.offsetWidth;
    const height = visualization.offsetHeight;
    const totalClicks = clicks.length;

    const groupedClicks = groupClicks(clicks);
    const sortedKeys = Object.keys(groupedClicks).sort((a, b) => groupedClicks[b].count - groupedClicks[a].count);
    const topClusters = sortedKeys.slice(0, 5);

    topClusters.forEach(key => {
        const { x, y, count } = groupedClicks[key];
        const percentage = ((count / totalClicks) * 100).toFixed(1);
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.style.left = `${x - 50}px`;
        bubble.style.top = `${y - 50}px`;
        bubble.innerHTML = `<span>${percentage}%</span>`;
        visualization.appendChild(bubble);
    });
}

function groupClicks(clicks) {
    const grouped = {};
    clicks.forEach(click => {
        const key = `${Math.floor(click.x / 50) * 50},${Math.floor(click.y / 50) * 50}`;
        if (!grouped[key]) {
            grouped[key] = { x: Math.floor(click.x / 50) * 50 + 25, y: Math.floor(click.y / 50) * 50 + 25, count: 0 };
        }
        grouped[key].count++;
    });
    return grouped;
}

setInterval(fetchClicks, 5000); // Fetch clicks every 5 seconds
