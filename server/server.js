const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the "client/dist" directory
app.use('/dist', express.static(path.join(__dirname, '../client/dist')));

// If you're using a single page app routing
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(3000);
