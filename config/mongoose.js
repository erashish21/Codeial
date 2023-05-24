const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
mongoose.connect(
    'mongodb+srv://ashishbundela123:vCM4r6Noe4eeKnfV@cluster0.htozyd1.mongodb.net/codeial',
   () => {
  console.log("Connected to MongoDB");
});