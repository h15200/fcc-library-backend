/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');


chai.use(chaiHttp);



suite('Functional Tests', function() {

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  
  //make extra test to add a book
  
  test('janky beforeEach function to add 1 book before following tests', (done) => {
    chai.request(server)
    .post('/api/books')
    .send({title: 'test book 1'})
    .end((err, res) => {
      assert.equal(res.status, 200)
      done()
    })
  })
  
  test('#example Test GET /api/books', function(done){
     chai.request(server)
      .get('/api/books')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        done();
      });
  });
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function() {


    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', (done) => {
        chai.request(server)
        .post('/api/books')
        .send({title: 'test book 2'})
        .end( (err, res) => {
          assert.equal(res.status, 200)
          assert.property(res.body, 'title', 'book contains title')
          assert.property(res.body, '_id', 'book contains _id')
          done()
        })
        //done();
        
      });
      
      test('Test POST /api/books with no title given', (done) => {
        chai.request(server)
        .post('/api/books')
        .send()
        .end((err,res) =>{
          assert.equal(res.status, 400)
        })
      done()
      });
      
    });


    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  (done)=> {
        chai.request(server)
        .get('/api/books')
        .end((err, res) =>{
          assert.equal(res.status, 200)
          assert.isArray(res.body)
          assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        })
        done()
      });      
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  (done) => {
        chai.request(server)
        .get('api/books/5d750f3bd32883265ec6cdaG')
        .end((err, res) =>{
          assert.equal(res.status, 400)
        })
        done()
      });
      
      test('Test GET /api/books/[id] with valid id in db',  (done)=>{
          chai.request(server)
        .get('/api/books/5d750f3bd32883265ec6cdac')
        .end((err, res) =>{
          assert.equal(res.status, 200)
          assert.property(res.body, 'title', 'Book has title')
          assert.property(res.body, 'commentcount', 'book has commentcount')
          assert.equal(res.body._id, '5d750f3bd32883265ec6cdac', 'id matches')
        })
        done();
      });
      
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', (done) => {
        chai.request(server)
        .post('/api/books/5d750f3bd32883265ec6cdac')
        .send({comment: 'new comment!'})
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.property(res.body.commentcount, 1)
        })
        done()
        
        
        
      });
      
    });

  });

});
