const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ashishbundela123:vCM4r6Noe4eeKnfV@cluster0.htozyd1.mongodb.net/codeial');
const db = mongoose.connection;
db.on('error',console.error.bind(console,'error coneecting to db'));

db.once('open',function(){
    
    console.log('Successfully connected to the database');
});