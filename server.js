const express = require('express');
const morgan = require('morgan');

const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const blogRouter = require('./blogRouter');

const {BlogPosts} = require('./models');


BlogPosts.create('What\'s my Name?', `This is the fuckin' shit I be talkin' about
Half rappin' ass mothafuckers
You think it's a game? You think it's a fuckin' game?
Come on, uh, uh, uh
Come on, uh, uh
Whatcha really want
Whatcha really want, what
D-M-X, uh, uh
Come on, ryde or die

Ay yo, ay yo, ay yo
What's my name?
DMX and I be the best
You see the rest, they lookin' like they need a rest
One more time
I'mma spit at you some shit
That's gon' get at you be fuckin' with your mind
Stop talkin' shit
'Cause you out there runnin' your mouth
And really don't know who you fuckin' with
Here we go again
How many times do I have to tell you rap niggas?
I have no friends
You still actin' up
Runnin' around here like some brand new pussy that's about to get fucked
The game don't stop
I'm still gettin' down for whatever, whenever that's why my shit is hot
Can't keep it real
Now, some of us do but most of us don't, that's just how a nigga feel
I shed blood
For my people that'll keep you lookin' see-through
Whenever you try to creep through`, 'DMX');


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