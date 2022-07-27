const express = require('express');
const path = require('path');
const sequelize = require('./config/connection');
const routes = require('./routes');

// handlebars config
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });

// session config
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
  secret: 'Super secret secret of secrets',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

const app = express();
const PORT = process.env.PORT || 3001;

// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// use path
app.use(express.static(path.join(__dirname, 'public')));
// use sessions
app.use(session(sess));

// add handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}`));
});
