async function fetchCyberNews() {
    const API_KEY = '920b1280fa66a7b14d8f48bf6c462ab422bda877c45c3b3c4d93886ddfa5442e';  // Replace with your actual API key
    const endpoint = 'https://otx.alienvault.com/api/v1/pulses/subscribed';

    try {
        const response = await fetch(endpoint, {
            headers: {
                'X-OTX-API-KEY': API_KEY
            }
        });

        const data = await response.json();

        const container = document.getElementById('cyber-news-container');
        container.innerHTML = ''; // Clear old content

        data.results.slice(0, 5).forEach(news => {
            const newsItem = document.createElement('div');
            newsItem.className = 'news-item';
            newsItem.innerHTML = `
                <h3>${news.name}</h3>
                <p>${news.description}</p>
                <a href="${news.reference}" target="_blank">Read More</a>
            `;
            container.appendChild(newsItem);
        });
    } catch (error) {
        console.error('Error fetching cyber news:', error);
        document.getElementById('cyber-news-container').innerHTML = 
            '<p>⚠ Failed to load live data. Please try again later.</p>';
    }
}

// Auto-fetch news on page load
window.onload = fetchCyberNews;