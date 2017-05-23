//Modules
const express=require('express');
const path=require('path');
const bodyParser=require('body-parser')
const cors=require('cors');
const passport=require('passport');
const mongoose=require('mongoose');
const users=require('./routes/users');
const config=require('./config/database');

//Database Connection
mongoose.connect(config.database);
mongoose.connection.on('connected',function(){
  console.log('Connected to db----'+config.database);
});
mongoose.connection.on('error',function(err){
  console.log(err);
});


//App Setup
const app=express();
const port=3000;
//Middlewares
app.use(cors());
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

//Static Files
app.use(express.static(path.join(__dirname,'public')));

//routes
app.use('/users',users);

app.get('/',function(req,res){
    res.send("Hey");
});

//Server Start
app.listen(port,function(){
  console.log('Server started on port '+port);
});
