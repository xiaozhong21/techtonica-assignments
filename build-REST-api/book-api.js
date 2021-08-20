const express = require('express');
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.listen(port, () => console.log(`Book app listening on port ${port}!`));

//Where we will keep books, simulating a database
let books = 
[
	{
		"isbn": "9780205309023",
		"title": "The Elements of Style, Fourth Edition",
		"author": "William Strunk Jr., E. B. White",
		"published_date": "07/23/1999",
		"publisher": "Pearson",
		"numOfPages": "105"
	},
	{
		"isbn": "9781594631931",
		"title": "The Kite Runner",
		"author": "Khaled Hosseini",
		"published_date": "03/05/2013",
		"publisher": "Riverhead Books",
		"numOfPages": "400"
	},
	{
		"isbn": "393330338",
		"title": "A Random Walk Down Wall Street",
		"author": "Burton G. Malkiel",
		"published_date": "12/17/2007",
		"publisher": "W. W. Norton & Company",
		"numOfPages": "464"
	},
  {
		"isbn": "9780393634990",
		"title": "Hello World: Being Human in the Age of Algorithms",
		"author": "Hannah Fry",
		"published_date": "09/18/2018",
		"publisher": "W. W. Norton & Company",
		"numOfPages": "272"
	},
	{
		"isbn": "9780765382030",
		"title": "The Three-Body Problem",
		"author": "Cixin Liu",
		"published_date": "01/12/2016",
		"publisher": "Tor Books",
		"numOfPages": "416"
	}
];


//GET
//1. Get a list of books
app.get('/books', (req, res) => {
  res.json(books);
});

//2. Get a book by ISBN
app.get('/book/:isbn', (req, res) => {
  // Reading isbn from the URL
  const isbn = req.params.isbn;
  // Searching books for the isbn
  for (let book of books) {
      if (book.isbn === isbn) {
          res.json(book);
          return;
      }
  }
  // Sending 404 when not found something is a good practice
  res.status(404).send('Book not found');
});

//POST
//1. Add new book
app.post('/book', (req, res) => {
  const book = req.body;

  console.log(book);//For debugging
  books.push(book);

  res.send('Book is added to the database');
});

//2. Edit book
app.post('/book/:isbn', (req, res) => {
  // Reading isbn from the URL
  const isbn = req.params.isbn;
  const newBook = req.body;

  // Edit item from the books array
  // books = books.map(book => {
  //   if (book.isbn === isbn) {
  //     book = newBook;
  //   } else {
  //     book = book;
  //   }
  // })
  for (let i = 0; i < books.length; i++) {
      if (books[i].isbn === isbn) {
          books[i] = newBook;
      }
  }

  res.send('Book is edited');
});

//DELETE
app.delete('/book/:isbn', (req, res) => {
  // Reading isbn from the URL
  const isbn = req.params.isbn;
  // Remove item from the books array
  books = books.filter(book => {
      if (book.isbn !== isbn) {
          return true;
      }
      return false;
  });
  // res.send('Book is deleted');
  res.send({ message: 'Book deleted' });
});