const express = require('express');
const app = express();
const port = 3000;

// Route to handle deep link redirection
app.get('/track/:track_id', (req, res) => {
    const trackId = req.params.track_id;
    const userAgent = req.headers['user-agent'].toLowerCase();

    // Spotify deep link format
    const spotifyDeepLink = `spotify:track:${trackId}`;
    const spotifyWebLink = `https://open.spotify.com/track/${trackId}`;
    const youtubeLink = `https://www.youtube.com/watch?v=${trackId}`;
    const deezerLink = `https://www.deezer.com/track/${trackId}`;
    const soundcloudLink = `https://soundcloud.com/${trackId}`;

    // Try to detect if the user is on mobile (iPhone or Android)
    if (userAgent.includes('iphone') || userAgent.includes('android')) {
        // Try redirecting to Spotify app (deep link)
        res.redirect(spotifyDeepLink);
    } else {
        // Fallback to the web version of Spotify or other platforms
        res.redirect(spotifyWebLink);
    }
});

// Default route - simple landing page (optional)
app.get('/', (req, res) => {
    res.send('Welcome to the music deep link redirect service!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
