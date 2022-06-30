const express = require('express');
const cookieParser =require('cookie-parser');
const app = express();
const port =8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie 
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy') 
const MongoStore = require('connect-mongo');
const { default: mongoose } = require('mongoose');
const sassMiddleware =require('node-sass-middleware');


app.use(sassMiddleware({
    /* Options */
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix:  '/css'  // Where prefix is at
}));
app.use(express.urlencoded());

app.use(cookieParser());
 
// to add assets liked css and js files 
app.use(express.static('./assets'));

 app.use(expressLayouts);


// ejs layouts documentation mentioned
// extrat style and scripts from sub pages to layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// setup the view engine
app.set('view engine' ,'ejs');
app.set('views' , './views');

// mongo store uses to store the session cookie in the db
app.use(session({
    name: 'codial',
    // TODO change the secret before deployment in production mode
    secret:'blahsomthing',
    saveUninitilized: false,
    resave: false,
    cookie: {
        maxAge:(1000*60*100)
    },
    store: MongoStore.create(
        {
        mongoUrl: 'mongodb://localhost/codial_development',
        autoRemove: 'disabled'
    },
    function(err){
        console.log(err || "connect-mongodb setup ok");
    }
    )
})); 
app.use(passport.initialize());
app.use(passport.session());



app.use(passport.setAuthenticatedUser);


  


// use express router
app.use('/',require('./routers'));



app.listen(port, function(err) {
    if(err){
        console.log(`error in running the server ${err}`);
        return;
    }
    console.log(`server is running on port: ${port}`);
    
});
