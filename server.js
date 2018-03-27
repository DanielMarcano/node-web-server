const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentDate', () => new Date().toLocaleDateString());
hbs.registerHelper('screamIt', text => text.toUpperCase());
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('home.hbs', {
    name: 'Daniel',
    likes: [
      {name: 'writing'},
      {name: 'singing'},
      {name: 'watching movies'}
    ]
  });
})
.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
})
.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    projects: [
      'The DM',
      'cometosayhi',
      'leaves in the wind'
    ]
  });
})
.get('*', (req, res) => {
  res.status(404).json({error: 'The page could not be found.'});
});

let showMessage = (message) => console.log(message);

app.listen(port, showMessage(`Server is up on port ${port}`));
