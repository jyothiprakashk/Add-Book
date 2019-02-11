//book class: Represents book
class Book {
    constructor(title, author, isbn) {
       this.title = title;
       this.author = author;
       this.isbn = isbn;
    }
}

//UI class : Handle UI Tasks
class UI {
    static displayBooks(){


      const books = Store.getBooks();

      books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
       const list = document.querySelector('#book-list');

       const row = document.createElement('tr');

       row.innerHTML = `
       <td>${book.title}</td>
       <td>${book.author}</td>
       <td>${book.isbn}</td>
       <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>

       `;
       list.appendChild(row);
}
   

    static clearFields() {
       document.querySelector('#title').value = '';
       document.querySelector('#author').value = '';
       document.querySelector('#isbn').value = '';
    }

    static deleteBook(el) {
       if(el.classList.contains('delete')) {
           el.parentElement.parentElement.remove();
       }
    }

    static showAlert(msg, className) {
       const div = document.createElement('div');
       div.className = `alert alert-${className}`;
       div.appendChild(document.createTextNode(msg));
       const container = document.querySelector('.container');
       const form = document.querySelector('#book-form')
       container.insertBefore(div, form);

       //vanish in 3 sec
       setTimeout(() => document.querySelector('.alert').remove(),3000)
    }
}
//store class: Handle storage
class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books')===null) {
            books = [];

        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBook(book) {
       const books =Store.getBooks();
       books.push(book);
       localStorage.setItem('books',JSON.stringify(books));
    }
    static removeBook(isbn) {
       const books = Store.getBooks();
       books.forEach((book, index) =>{
           if(book.isbn ===isbn) {
              books.splice(index,1);
           }
       });
       localStorage.setItem('books',JSON.stringify(books));
    }
}
//Event:Display Books
document.addEventListener('DOMContentLoaded',UI.displayBooks);

//Event:add abook
document.querySelector('#book-form').addEventListener('submit',
 (e)=>{
    e.preventDefault();
   


   const title = document.querySelector('#title').value;
   const author = document.querySelector('#author').value;
   const isbn = document.querySelector('#isbn').value;

   //valiadtae
   if(title=== '' ||author ==='' || isbn === '') {
       UI.showAlert('please fill in all fields', 'success');
   }else{
       //instatiate book
   const book = new Book(title, author, isbn);
   
   //add book to ui
   UI.addBookToList(book);

   //add book to store
   Store.addBook(book);
   //show alert

   UI.showAlert('book added', 'success')
   //clear fields

   UI.clearFields();
   }

   
})

//Event:Remove a book

document.querySelector('#book-list').addEventListener('click',(e) =>{
   UI.deleteBook(e.target);

   //remove from store
   Store.removeBook(e.target.parentElement.previousElementSibling.textContent)

   //show alert

   UI.showAlert('book remove', 'success')
});
