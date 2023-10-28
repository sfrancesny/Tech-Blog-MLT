import express from 'express';
import { join } from 'path';
import exphbs from 'express-handlebars';
import session from 'express-session';
import Sequelize from 'sequelize'; 
import dbConfig from './config/dbConfig.js'; 

const SequelizeStore = require('connect-session-sequelize')(session.Store);

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
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: new SequelizeStore({ db: dbConfig }),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto' },
  })
);

// Import routes
import userRoutes from './app/routes/userRoutes';
import postRoutes from './app/routes/postRoutes';
import commentRoutes from './app/routes/commentRoutes';

app.use(userRoutes);
app.use(postRoutes);
app.use(commentRoutes);

// sync Sequelize models to the database, then turn on the server
dbConfig.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}!`));
});
