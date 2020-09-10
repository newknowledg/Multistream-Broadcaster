#!/usr/bin/nodejs

const  mod = require('./Filemanage/fileManage');
const  exp = require('express');
const  app = exp();
const  exec = require('child_process').exec;

app.listen(4000, function(){});
app.use(exp.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH');
  next();
});

app.post('/stream', (request, response) => {
   const command = "sudo systemctl restart nginx"
   mod.rFile();
   for (var i = 0; i < request.body.length; i+=2){
       var j = i + 1 
   mod.aFile(request.body[i], request.body[j]);
   }
   mod.eFile(); 
   console.log(request.body);
   response.json({status: 'success'})
   exec(command, function(error){}); 
})
