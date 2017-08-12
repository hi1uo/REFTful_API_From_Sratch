var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json());

Genre = require('./models/genre');
Book = require('./models/book');

// Connect to mongoose. Make sure mongo demond is Running
mongoose.connect('localhost/bookstore');
var db = mongoose.connection;

app.get('/', function(req, res){
  res.send('Please use /api/books or /api/genres');
});

// create Genre API
app.get('/api/genres',function(req,res){
  Genre.getGenres(function(err, genres){
    if(err){
      throw err;
    }
    res.json(genres);
  });
});

// add Genre API
app.post('/api/genres',function(req,res){
  var genre = req.body;
  Genre.addGenre(genre, function(err, genre){
    if(err){
      throw err;
    }
    res.json(genre);
  });
});

// update Genre API
app.put('/api/genres/:_id',function(req,res){
  var id = req.params._id;
  var genre = req.body;
  Genre.updateGenre(id, genre, {}, function(err, genre){
    if(err){
      throw err;
    }
    res.json(genre);
  });
});

// delete Genre API
app.delete('/api/genres/:_id',function(req,res){
  var id = req.params._id;
  Genre.removeGenre(id, function(err, genre){
    if(err){
      throw err;
    }
    res.json(genre);
  });
});

// create books API
app.get('/api/books',function(req,res){
  Book.getBooks(function(err, books){
    if(err){
      throw err;
    }
    res.json(books);
  });
});

// add Book API
app.post('/api/books',function(req,res){
  var book = req.body;
  Book.addBook(book, function(err, book){
    if(err){
      throw err;
    }
    res.json(book);
  });
});

// create book API
app.get('/api/books/:_id',function(req,res){
  Book.getBookById(req.params._id, function(err, book){
    if(err){
      throw err;
    }
    res.json(book);
  });
});


// update book API
app.put('/api/books/:_id',function(req,res){
  var id = req.params._id;
  var book = req.body;
  Book.updateBook(id, book, {}, function(err, book){
    if(err){
      throw err;
    }
    res.json(book);
  });
});


// delete Genre API
app.delete('/api/books/:_id',function(req,res){
  var id = req.params._id;
  Book.removeBook(id, function(err, book){
    if(err){
      throw err;
    }
    res.json(book);
  });
});


app.listen(3000);
console.log('Running on port 3000...');
