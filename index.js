const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cors());
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
//used for session cokkies
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

//setup the chat server to used socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');

//use middleware
app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));
app.use('/uploads',express.static(__dirname + '/uploads'));
app.use(expressLayouts);
//extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//use express router 
const { use } = require('./routes');
const { Mongoose } = require('mongoose');

app.set('view engine','ejs');
app.set('views','./views');
//mongo store is used to store the session cookie in db
app.use(session({
    name: 'codeial',
    //TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    cookie:{
        maxAge:(1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            mongoUrl:'mongodb://127.0.0.1:27017/codeial_db',
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb strup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);
//use express router 

app.use('/',require('./routes'));
app.listen(port,function(err){
    if(err){
        console.log('Error in running the server:',port);
    }
    console.log('Server is running on port:',port);
});