const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

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

router.get('/', function(req, res){
	res.json(BlogPosts.get());
});

router.post('/', jsonParser, function (req, res){
	const requiredFields = ['title', 'content', 'author'];
	for(let dmx=0; dmx<requiredFields.length; dmx++) {
		const field = requiredFields[dmx];
		if(!(field in req.body)) {
			const message = `DMX is sad about your emptiness
			you're missing \`${field}\` in those wack bars you
			wrote!`;
			console.error(message);
			return res.status(400).send(message);
		}
	}
	const item = BlogPosts.create(req.body.title, req.body.content, req.body.author);
	res.status(201).json(item);
});

router.delete('/:id', function (req, res) {
	BlogPosts.delete(req.params.id);
	console.log(`Deleted blog post \`${req.params.ID}\``);
	res.status(204).end();
});

router.put('/:id', jsonParser, function(req, res){
	const requiredFields = ['title', 'content', 'id'];
	for(let dmx=0; dmx<requiredFields.length; dmx++) {
		const field = requiredFields[dmx];
		if(!(field in req.body)) {
			const message = `Y'all gonna make me lose my mind up in here, up in Here
			cuz yo request is missing \`${field}\` in da request body, cuh`;
			console.error(message);
			res.status(400).send(message);
		}
	}
	if(req.params.id !== req.body.id) {
		const message = (
			`Request path id (${req.params.id}) and request body id
			(${req.body.id}) must match`);
		console.error(message);
		return res.status(400).send(message);
	}
	console.log(`Updating blog post entry \`${req.params.id}\``);
	const updatedPost = BlogPosts.update({
		id: req.params.id,
		title: req.body.title,
		content: req.body.content
	});
	res.status(204).end();
});



module.exports = router;
