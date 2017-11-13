const express = require('express');
const morgan = require('morgan');

const app = express();

const blogRouter = require('./blogRouter');

app.use(morgan('common'));

app.use(express.static('public'));

app.get('/', function(req, res){
	res.sendFile( __dirname + '/views/index.html');
});

app.use('/blog', blogRouter);

app.listen(process.env.PORT || 8080, function(){
	console.log(`Your app is bumpin on port 
		${process.env.PORT ||8080}. Neato, huh?`);
})