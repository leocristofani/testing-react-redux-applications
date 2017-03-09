const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cuid = require('cuid');

const app = express();

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/json' }))

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

let users = [
  { id: cuid(), name: 'Leo', email: 'leo@gmail.com' },
  { id: cuid(), name: 'Raissa', email: 'raissa@gmail.com' },
  { id: cuid(), name: 'Melissa', email: 'melissa@gmail.com' }
];

app.get('/api/users', (req, res) => {
  setTimeout(() => {
    res.json(users);
  }, 1000);
});

app.delete('/api/users/:userId', (req, res) => {
  setTimeout(() => {
    const userToDelete = users.filter(user => user.id === req.params.userId)[0];
    users = users.filter(user => user.id !== req.params.userId);
    res.json(userToDelete);
  }, 1000);
});

app.post('/api/users', (req, res) => {
  setTimeout(() => {
    const newUser = Object.assign({}, req.body, { id: cuid() });
  
    if (!newUser.name) {
      return res.status(500).json({ message: 'Name is required.' });
    }

    if (!newUser.email) {
      return res.status(500).json({ message: 'Email is required.' });
    }

    users.unshift(newUser);
    res.json(newUser);
  }, 1000);
});

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;