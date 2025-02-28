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

    // Detect mobile user
    if (userAgent.includes('iphone') || userAgent.includes('android')) {
        // Send a page with a redirect to both Spotify Web and then deep link to the app
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
                    const spotifyDeepLink = "${spotifyDeepLink}";
                    const spotifyWebLink = "${spotifyWebLink}";

                    // First, redirect to the web version of Spotify
                    window.location = spotifyWebLink;

                    // After a short delay, attempt to open the app
                    setTimeout(function() {
                        window.location = spotifyDeepLink;
                    }, 1000);  // 1-second delay for better app detection
                </script>
            </body>
            </html>
        `);
    } else {
        // For desktop users, redirect directly to Spotify web version
        res.redirect(spotifyWebLink);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
