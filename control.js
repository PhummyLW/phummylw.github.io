const API_ENDPOINT = 'https://h0g8ck27xf.execute-api.us-west-1.amazonaws.com/prod';

document.getElementById('start').addEventListener('click', async () => {
    await fetch(`${API_ENDPOINT}/control`, {
        method: 'POST',
        body: JSON.stringify({ action: 'start' }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
});

document.getElementById('pause').addEventListener('click', async () => {
    await fetch(`${API_ENDPOINT}/control`, {
        method: 'POST',
        body: JSON.stringify({ action: 'pause' }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
});

document.getElementById('reset').addEventListener('click', async () => {
    await fetch(`${API_ENDPOINT}/control`, {
        method: 'POST',
        body: JSON.stringify({ action: 'reset' }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
});
