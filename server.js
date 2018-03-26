const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentDate', () => new Date().toLocaleDateString());
hbs.registerHelper('screamIt', text => text.toUpperCase());
app.use((req, res, next) => {
  res.render('maintenance.hbs', {message: 'Be right back everyone'});
});
// app.set('view engine', 'hbs');

// app.use((req, res, next) => {
//   let now = new Date().toString();
//   let request = `${now} ${req.method} ${req.url}\n`;
//   fs.appendFile('./logger/requests.json', request);
//   next();
// });

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
.get('*', (req, res) => {
  res.status(404).json({error: 'The page could not be found.'});
});

let showMessage = (message) => console.log(message);

app.listen(3000, showMessage('Server up on port 3000'));
