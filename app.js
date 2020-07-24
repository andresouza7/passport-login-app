require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
require('ejs');

const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.urlencoded({extended: true}));

// connect do mongo db
mongoose.connect(process.env.DB_URI, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Setup passport
const passport = require('passport');
const session = require('express-session');
app.use(session({ 
    secret: process.env.SESSION_SECRET ,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// Configure passport authentication in authController
require('./controllers/authController');

// Define routes
const auth = require('./routes/auth');
const user = require('./routes/user');

app.use('/auth', auth);
app.use('/user', user);

app.get('/', (req,res) => {
    console.log(req.user);
    res.render('home', {user: req.user});
});

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`server started on port ${port}`);
});