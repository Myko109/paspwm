var mysql=require('mysql');
 var connection=mysql.createConnection({
   host:'localhost',
   user:'root',
   password:'',
   database:'db_prpas'
 });
connection.connect(function(error){
  if(!!err) {
    console.log("Error connecting to Db");
   }else{
     console.log('Connected!:)');
   }
 });  
module.exports = connection;