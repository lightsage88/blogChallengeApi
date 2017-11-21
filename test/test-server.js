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
			// res.should.be.json;
			// res.body.should.be.a('object');
			// // res.body.should.include.keys('id', 'content','title');
			// res.body.length.should.be.at.least(1);
			// const expectedKeys = ['id', 'content', 'author'];
			// res.body.forEach(function(post){
			// 	post.should.be.a('object');
			// 	post.should.include.keys(expectedKeys);
			// });
		});

	});

});