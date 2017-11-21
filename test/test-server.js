const chai = require('chai');
const chaiHttp = require('chai-http');
const {app, runServer, closeServer} = require('../server');

const should = chai.should();

chai.use(chaiHttp);

describe('Blog Machine', function(){
before(function(){
	return runServer();
});
after(function(){
	return closeServer();
});

	it('should list blog posts on GET', function(){
		return chai.request(app)
		.get('/blog')
		.then(function(res){
			res.should.have.status(200);
			res.should.be.json;
			res.body.should.be.a('array');
			// res.body.should.include.keys('id', 'content','title');
			res.body.length.should.be.at.least(1);
			const expectedKeys = ['id', 'content', 'author'];
			res.body.forEach(function(post){
				post.should.be.a('object');
				post.should.include.keys(expectedKeys);
			});
		});

	});
	
	it('should add blog post objects on POST', function(){
		const nuevoPost = {
			title: "The Real Slim Shady",
			content: "chicka chicka SLIM SHADY", 
			author: "Eminem"
		};
		return chai.request(app)
		.post('/blog')
		.send(nuevoPost)
		.then(function(res){
			res.should.have.status(201);
			res.should.be.json;
			res.body.should.be.a('object');
			res.body.should.include.keys('id', 'title', 'content', 'author', 'publishDate');
			res.body.id.should.not.be.null;
		});	
	});

	it('should update blogPosts on PUT', function(){
        const updateBlogData = {
        	title: "Mary Had a Little Lamb",
        	content: "...whose fleece was white as snow",
        	author: "mother hubbard"
        };
        return chai.request(app)
        .get('/blog')
        .then(function(res){
            updateBlogData.id= res.body[0].id;
            return chai.request(app)
            .put(`/blog/${updateBlogData.id}`)
            .send(updateBlogData);
        })
        .then(function(res){
        	res.should.have.status(204);
        });
    });

    it('should delete a blog post on DELETE', function(){
    	return chai.request(app)
    	.get('/blog')
    	.then(function(res){
    		return chai.request(app)
    		.delete(`/blog/${res.body[0].id}`);
    	})
    	.then(function(res){
    		res.should.have.status(204);
    	});
    });

});