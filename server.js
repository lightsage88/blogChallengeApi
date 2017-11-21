const express = require('express');
const morgan = require('morgan');

const app = express();

const blogRouter = require('./blogRouter');


app.use(morgan('common'));

app.use(express.static('public'));

app.get('/', function(req, res){
	res.sendFile( __dirname + '/views/index.html');
});


//app.listen(process.env.PORT || 8080, function(){
//	console.log(`Your app is bumpin on port 
//		${process.env.PORT ||8080}. Neato, huh?`);
//});


app.use('/blog', blogRouter);

let server;

// this function starts our server and returns a Promise.
// In our test code, we need a way of asynchronously starting
// our server, since we'll be dealing with promises there.
function runServer() {
  const port = process.env.PORT || 8080;
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      console.log(`Your app is listening on port ${port}`);
      resolve(server);
    }).on('error', err => {
      reject(err)
    });
  });
}

// like `runServer`, this function also needs to return a promise.
// `server.close` does not return a promise on its own, so we manually
// create one.
function closeServer() {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {
      if (err) {
        reject(err);
        // so we don't also call `resolve()`
        return;
      }
      resolve();
    });
  });
}


if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};

