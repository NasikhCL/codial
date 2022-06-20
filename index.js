const express = require('express');
const app = express();
const port =8000;


const expressLayouts = require('express-ejs-layouts');

const db = require('./config/mongoose')

 app.use(expressLayouts);

// to add assets liked css and js files 
app.use(express.static('./assets'));

// ejs layouts documentation mentioned
// extrat style and scripts from sub pages to layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// use express router
app.use('/',require('./routers'));



// setup the view engine
app.set('view engine' ,'ejs');
app.set('views' , './views');




app.listen(port, function(err) {
    if(err){
        console.log(`error in running the server ${err}`);
        return;
    }
    console.log(`server is running on port: ${port}`);
    
});
