//UPDATE books
const setEditModal = async (isbn) => {
  // *** XMLHttpRequest version ***
  // const xhttp = new XMLHttpRequest();

  //  xhttp.open("GET", `http://localhost:3000/book/${isbn}`, false);
  //  xhttp.send();

  // const book = JSON.parse(xhttp.responseText);

  // Get information about the book using isbn
  const response = await fetch(`http://localhost:3000/book/${isbn}`);
  const book = await response.json();
  console.log(book)

  const {
    title,
    author,
    publisher,
    published_date,
    numOfPages
  } = book;

   // Filling information about the book in the form inside the modal
   document.getElementById('isbn').value = isbn;
   document.getElementById('title').value = title;
   document.getElementById('author').value = author;
   document.getElementById('publisher').value = publisher;
   document.getElementById('published_date').value = published_date;
   document.getElementById('numOfPages').value = numOfPages;

   // Setting up the action url for the book
   document.getElementById('editForm').action = `http://localhost:3000/book/${isbn}`;
}

// **** Fetch version *** 
// const setEditModal = (isbn) => {
//   fetch(`http://localhost:3000/book/${isbn}`,{method: 'GET'})
//     .then(response => response.json())
//     .then(book => {
//       const {
//           title, 
//           author, 
//           publisher, 
//           published_date,
//           numOfPages
//       } = book;
//       document.getElementById('isbn').value = isbn;
//       document.getElementById('title').value = title;
//       document.getElementById('author').value = author;
//       document.getElementById('publisher').value = publisher;
//       document.getElementById('published_date').value = published_date;
//       document.getElementById('numOfPages').value = numOfPages;
//       // setting up the action url for the book
//       document.getElementById('editForm').action = `http://localhost:3000/book/${isbn}`;      
//     })
//       .catch(error => console.error('error:', error));
// }

// DELETE books
// **** Fetch version *** 
// const deleteBook = (isbn) => {
//   fetch(`http://localhost:3000/book/${isbn}`,{method: 'DELETE'})
//           .then(response => response.json())
//          //  .then(json => console.log(json))
//      location.reload();
//  }

//**** Asyn/await version ****
const deleteBook = async (isbn) => {
  const result = await fetch(`http://localhost:3000/book/${isbn}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json'
    },
    body: null
  })

  // const json = await result.json();//Resolve the promise of result.json()
  // console.log(json);

  location.reload();
}

// *** XMLHttpRequest version ***
// const deleteBook = (isbn) => {
//   const xhttp = new XMLHttpRequest();

//   xhttp.open("DELETE", `http://localhost:3000/book/${isbn}`, false);
//   xhttp.send();
//   location.reload();
// }

//GET list of books
const loadBooks = () => {
  fetch("http://localhost:3000/books")
  .then(readResponseAsJSON)
  .then(showBooks)
  .catch(logError)
}

//Helper functions for loadBooks
//Convert response from JSON to object literal
const readResponseAsJSON = (response) => {
  return response.json();
}

//Display books to HTML
const showBooks = (books) => {
  for (let book of books) {
    const x = `
      <div class="col-4">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title">${book.title}</h3>
            <h4 class="card-subtitle mb-2 text-muted">ISBN: ${book.isbn}</h4>

            <div class="left">Author: ${book.author}</div>
            <div class="left">Published Date: ${book.published_date}</div>
            <div class="left">Publisher: ${book.publisher}</div>
            <div class="left">Number Of Pages: ${book.numOfPages}</div>

            <hr>

            <button type="button" class="btn btn-danger" onClick="deleteBook(${book.isbn})">Delete</button>
            <button types="button" class="btn btn-primary" data-toggle="modal"
                data-target="#editBookModal" onClick="setEditModal(${book.isbn})">
                Edit
            </button>
          </div>
        </div>
      </div>
    `
    document.getElementById('books').innerHTML = document.getElementById('books').innerHTML + x;
  }
}

//Error handling
const logError = (error) => {
  console.log('Something went wrong: ', error);
}


loadBooks();