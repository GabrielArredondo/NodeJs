import ('./theme/app.css');
import UI from './UI';
//import BooksService from ('./services/books.services');
//import BooksService from './services/books.services';
document.getElementById('book-form').addEventListener('submit', e =>{
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    const image = document.getElementById('image').files;
    
    const fromData = new FormData();
    fromData.append('image', image[0]);
    fromData.append('title', title);
    fromData.append('author', author);
    fromData.append('isbn', isbn);

  //const booksService = new BooksService();
  //booksService.postBooks(fromData);
   //booksService.postBook(fromData);
   //console.log(booksService); 
   const ui = new UI();
   if(title ==='' || author===''||isbn===''){
    ui.renderMessage('Please fill all the fields', 'error', 3000);
   }else{
    ui.addANewBook(fromData);
    ui.renderMessage('New Book Added Successfully', 'success', 2000);
    e.preventDefault();
   }
   
});
//Ejeculat una vez carge el navegador
document.addEventListener('DOMContentLoaded', ()=>{
  const ui = new UI();
  ui.renderBooks();
  
})


document.getElementById('content').addEventListener('click', e=>{
//para dar click solo cuando un elemento tenga x clase
if(e.target.classList.contains('delete')){
 const id = e.target.getAttribute('id');
 const name = e.target.getAttribute('name');
  const ui = new UI();
  ui.deleteBook(id, name);
  e.preventDefault();
  ui.renderMessage('Book Deleted Successfully', 'success', 3000);
}
});

