const express = require('express');

const app = express();
const port = 3000;
app.use(express.static('public'));
// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/form.html');
});
// Handle form submission
app.post('/submit', (req, res) => {
  // Get the data from the request body
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  });
  // When the request has ended,
  // parse the data and send a response
  req.on('end', () => {
    console.log('Form data:', data);
    res.send('Form submitted!');
  });
});
// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
