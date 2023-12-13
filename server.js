const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  const users = JSON.parse(fs.readFileSync('users.json'));

  if (users.some(user => user.username === username)) {
    return res.status(400).json({ message: 'Username already exists.' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  users.push({ username, password: hashedPassword });

  fs.writeFileSync('users.json', JSON.stringify(users));

  res.json({ message: 'Signup successful!' });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const users = JSON.parse(fs.readFileSync('users.json'));

  const user = users.find(user => user.username === username);

  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password.' });
  }

  const passwordMatch = bcrypt.compareSync(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid username or password.' });
  }

  res.json({ message: 'Login successful!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
