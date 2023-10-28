import express from 'express';
import { join } from 'path';
import exphbs from 'express-handlebars';
import session from 'express-session';
import Sequelize from 'sequelize';
import SequelizeStore from 'connect-session-sequelize';
import dbConfig from './config/dbConfig.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars.js as the default template engine.
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, 'app/public')));

// Sessions
const sessionStore = new (SequelizeStore(session.Store))({
  db: dbConfig,
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto' },
  })
);

// Import routes
import routes from './app/controllers/index.js';

app.use(routes);

// sync Sequelize models to the database, then turn on the server
dbConfig.sync({ force: false }).then(() => {
  // Sync session store after DB sync
  sessionStore.sync();
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}!`));
});
