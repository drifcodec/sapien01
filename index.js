
// "bcrypt": "^5.0.0",
const express =require("express");/* 
const cron = require("node-cron"); */
const app=express()
const morgan=require('morgan')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')   
const user=require('./routes/user') 
const user_role=require('./routes/user_role') 
const user_log=require('./routes/user_log')
const page_auth=require('./routes/page-auth') 
const device=require('./routes/device')
const site=require('./routes/site_route/site')
const notification=require('./routes/notification_route/notification')
const vandalism=require('./routes/vandalism')
const roll_out=require('./routes/rollout')
const parent_menu=require('./routes/parent_menu')
const page_access=require('./routes/page_access')
const mobile_access=require('./routes/mobile_access')
const clocking=require('./routes/clocking')
const device_stats_check=require('./background_worker/device_status_cherker')
let port=process.env.PORT || 3000
var connection_string='mongodb+srv://dannynho:dannynho@ourdb-uczbc.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(connection_string,{useUnifiedTopology: true,useNewUrlParser: true,})
mongoose.set('useCreateIndex', true);
app.use(express.urlencoded({extended:true})) //this line convert complex data into json readable format ---DATATABLE SETTING
app.use(express.json()) 
app.use((req, res, next) => {
res.header("Access-Control-Allow-Origin", "*");
res.header( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
  });
  
//
// use the express-static middleware
app.use(express.static("Client_html"))
app.use('/uploads',express.static("uploads")) 
app.use('/api/user',user); 
app.use('/api/device',device);
app.use('/api/site',site); 
app.use('/api/user_role',user_role);
app.use('/api/user_log',user_log); 
app.use('/api/vandalism',vandalism);
app.use('/api/roll_out',roll_out);
app.use('/api/page_auth',page_auth);
app.use('/api/parent_menu',parent_menu); 
app.use('/api/page_access',page_access);
app.use('/api/mobile_access',mobile_access); 
app.use('/api/notification',notification); 
app.use('/api/clocking',clocking); 
//cron.schedule("*/10 * * * * *", device_stats_check);
//app.get("/devices",(req,res)=>{ 
   //  res.send(importedJson)
//})
app.listen(port,() =>{
    console.log('example listening on port '+port)
})