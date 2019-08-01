var express=require('express');
var path=require('path');

var app=express();

app.use(express.static('build'));

app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'build','index.html'));
})


var port=process.env.PORT||5000;
app.listen(port,console.log('App live on '+port));