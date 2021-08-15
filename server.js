const path = require('path');
var morgan = require('morgan');
var logger = morgan('dev');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const hbs = exphbs.create({
  helpers: {
    format_date: (date) => {
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      // return date.toUTCString();
    },
  },
});
//const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(logger);

app.use(require('./controller/'));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
