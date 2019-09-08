/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
const dbUrl = process.env.DB;
//Example connection: MongoClient.connect(MONGODB_CONNECTION_STRING, function(err, db) {});
const mongoose = require('mongoose')

mongoose.connect(dbUrl, {useNewUrlParser: true});

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  commentcount: {
    type: Number,
    required: true,
    default: 0
  },
  comments: {
    type: [String],
    default: []
  }
})

const Book = mongoose.model('Book', bookSchema)

module.exports = function (app) {

  app.route('/api/books', async (req, res) =>{
    
  })
    .get(async function (req, res){
    const allBooks = await Book.find()
    res.send(allBooks)
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })
    
    .post(async function (req, res){
    const book = new Book(req.body)
    console.log(book)
    try{
    await book.save()
    res.send(book)
    } catch(e) {
      res.status(400).send(e)
    }
      //response will contain new book object including atleast _id and title
    })
    
    .delete(async function(req, res){
      try{  
    await Book.deleteMany()
      res.send('complete delete successful')
      }catch(e){
        res.status(400).send(e)
      }
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
  
    .get(async function (req, res){
    const bookid = req.params.id
    if (!mongoose.Types.ObjectId.isValid(bookid)){
      return res.status(400).send('no book exists')
    }
      
      const book = await Book.findById(bookid)
      
    if (!book) {
      return res.status (400).send('no book exists')
    }
    res.send(book)
//json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(async function(req, res){
      const bookid = req.params.id;
      const comment = req.body.comment;
    try{
      const book = Book.findById(req.params.id)
      if (!book){
        return res.status(400)
      }
      book.comments.push(req.body.comment)
      await book.save()
      res.send(book)
      
    } catch(e){
      res.status(400).send(e)
    }
      //json res format same as .get
    })
    
    .delete(async function(req, res){
      const bookid = req.params.id
      try{
        const book = await Book.findByIdAndRemove(req.params.id)
        res.send(book)
      }catch(e){
        res.status(400).send('invalid id')
      }
      //if successful response will be 'delete successful'
    });
  
};
