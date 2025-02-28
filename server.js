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

    // Define a fallback strategy if the user doesn't have Spotify installed
    const fallbackLinks = {
        youtube: youtubeLink,
        deezer: deezerLink,
        soundcloud: soundcloudLink,
    };

    // Try to detect if the user is on mobile (iPhone or Android)
    if (userAgent.includes('iphone') || userAgent.includes('android')) {
        // Attempt to open the Spotify app directly (deep link)
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Redirecting to Spotify...</title>
            </head>
            <body>
                <p>If Spotify doesn't open automatically, please click <a href="${spotifyWebLink}">here</a>.</p>
                <script>
                    // Redirect to Spotify after a short delay (500ms)
                    setTimeout(function() {
                        window.location = "${spotifyDeepLink}";
                    }, 500); // 500ms delay before trying to open the Spotify app

                    // If Spotify doesn't open after 2 seconds, redirect to the web version
                    setTimeout(function() {
                        window.location = "${spotifyWebLink}";
                    }, 2000); // 2000ms delay before fallback
                </script>
            </body>
            </html>
        `);
    } else {
        // For desktop users, redirect to the web version of Spotify or other platforms
        const platformLinks = [spotifyWebLink, youtubeLink, deezerLink, soundcloudLink];

        // Pick the first available platform (you can enhance this by checking user preferences)
        res.redirect(platformLinks[0]);
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
