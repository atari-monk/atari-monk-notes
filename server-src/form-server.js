const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;
app.use(express.static('public'));

// Serve the form.html file
app.get('/', (req, res) => {
  // Load the HTML template
  fs.readFile(__dirname + '/public/form.html', 'utf8', (err, template) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error loading template');
      return;
    }
    // Load the JSON data
    fs.readFile(__dirname + '/public/data.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error loading data');
        return;
      }
      // Parse the JSON data
      let jsonData;
      try {
        jsonData = JSON.parse(data);
      } catch (err) {
        console.error(err);
        res.status(500).send('Error parsing data');
        return;
      }
      // Fill the template with data
      const filledTemplate = template
        .replace('{{if isKey}}checked{{/if}}', jsonData.isKey ? 'checked' : '')
        .replace(
          '{{if isScrollToBottom}}checked{{/if}}',
          jsonData.isScrollToBottom ? 'checked' : ''
        )
        .replace('{{title}}', jsonData.title);
      // Send the filled template
      res.send(filledTemplate);
    });
  });
});

// Handle form submission
app.post('/submit', (req, res) => {
  // Get the data from the request body
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  });
  // When the request has ended,
  // update the JSON data and send a response
  req.on('end', () => {
    // Parse the form data
    const formData = new URLSearchParams(data);
    // Update the JSON data
    const updatedData = {
      isKey: formData.get('isKey') === 'on',
      isScrollToBottom: formData.get('isScrollToBottom') === 'on',
      title: formData.get('title'),
    };
    fs.writeFile(
      __dirname + '/public/data.json',
      JSON.stringify(updatedData),
      (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error saving data');
          return;
        }
        res.send('Form submitted!');
      }
    );
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
