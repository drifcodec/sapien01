// "bcrypt": "^5.0.0",
const dotenv = require("dotenv")
dotenv.config();
const express = require("express");/* 
const cron = require("node-cron"); */
const app = express()
//const morgan=require('morgan')
const mongoose = require('mongoose')
//const device_stats_check=require('./background_worker/device_status_cherker')
let port = process.env.PORT || 3000
var connection_string = 'mongodb+srv://dannynho:dannynho@ourdb-uczbc.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(connection_string, { useUnifiedTopology: true, useNewUrlParser: true })
mongoose.set('useCreateIndex', true);
app.use(express.urlencoded({ extended: true })) //this line convert complex data into json readable format ---DATATABLE SETTING
app.use(express.json())
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.use(express.static("Client_html"))
app.use('/uploads', express.static("uploads"))
app.use('/api/user', require('./appsServer/user_management/routes/user'));
app.use('/api/site', require('./routes/sites/site'));
app.use('/api/sys_role', require('./appsServer/user_management/routes/sys_role'));
app.use('/api/user_log', require('./appsServer/user_management/routes/user_log'));
app.use('/api/vandalism', require('./routes/vandalism'));
app.use('/api/roll_out', require('./routes/rollout'));
app.use('/api/page_auth', require('./routes/page-auth'));
app.use('/api/parent_menu', require('./routes/parent_menu'));
app.use('/api/page_access', require('./routes/page_access'));
app.use('/api/mobile_access', require('./routes/mobile_access'));
app.use('/api/notification', require('./routes/notification_route/notification'));
app.use('/api/clocking', require('./routes/clocking'));
app.use('/api/device', require('./routes/devices/device'));
app.use('/api/device_activity', require('./routes/devices/device_activities'));

//cron.schedule("*/10 * * * * *", device_stats_check);
//app.get("/devices",(req,res)=>{ 
//  res.send(importedJson)
//})

app.listen(port, () => {
  console.log('example listening on port ' + port)
})