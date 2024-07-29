const API_ENDPOINT = 'https://h0g8ck27xf.execute-api.us-west-1.amazonaws.com/prod';

const userId = localStorage.getItem('userId') || Math.random().toString(36).substr(2, 9);
localStorage.setItem('userId', userId);

const clickArea = document.getElementById('click-area');

clickArea.addEventListener('click', async (event) => {
    const x = event.clientX;
    const y = event.clientY;

    await fetch(`${API_ENDPOINT}/click`, {
        method: 'POST',
        body: JSON.stringify({ id: userId, x, y }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
});
