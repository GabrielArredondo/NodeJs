import BooksService from './services/books.services';
const booksService = new BooksService();
import {format} from 'timeago.js';
class UI{
 async renderBooks(){
  const result =  await booksService.getBooks();
  console.log(result);
 const div = document.getElementById('content');
  if(result.length <=0){
     div.innerHTML ='<div class="card" style="width: 18rem;">'+
     '<img src="..." class="card-img-top" alt="...">'+
    ' <div class="card-body">'+
       '<h5 class="card-title">Card title</h5>'+
      ' <p class="card-text">Sin resultados</p>'+
     '  <a href="#" class="btn btn-primary">Go somewhere</a>'+
    ' </div> </div>'; 
  }else{
    const mutar = [];
      result.forEach(element => {
         let obj ={
             _id: element._id,
             author:element.author,
             title: element.title,
             isbn: element.isbn,
             created_at: element.created_at,
             imagePath: element.imagePath
         } 
       //  mutar.push(obj);
 
       const content =
       ' <div class="col" id="card">'+
       '<div class="card h-100">'+
      '   <img src="http://localhost:4000/'+obj.imagePath+'" class="card-img-top" alt="...">'+
      '   <div class="card-body">'+
          ' <h5 class="card-title">'+obj.author+'</h5>'+
          ' <p class="card-text">'+obj.title+'</p>'+
          '<button type="button" id="'+obj._id+'"   class="btn btn-link delete">Leer Libro</button>'+
          '<div class="card-footer">'+
          '<small class="text-muted">'+format(obj.created_at)+'</small>'+
        '</div>'+
         '</div></div></div>';
     mutar.push(content);
      });

 return  div.innerHTML = mutar;
      
  }
 }
 async addANewBook(book){
   await booksService.postBooks(book);
   this.clearBookForm();
   this.renderBooks();
 }
 clearBookForm(){
     document.getElementById('book-form').reset();

 }
 renderMessage(message, colorMessage, secondsToRemove) {
  // Creating a div
  const div = document.createElement('div');
  // Styling the div
  div.className = `message ${colorMessage}`;
  // Adding Text to the div
  div.appendChild(document.createTextNode(message));
  // Puting in the documnet
  const container = document.querySelector('.col-md-4');
  const bookForm = document.querySelector('#book-form');
  container.insertBefore(div, bookForm);
  // Removing the div after some secconds
  setTimeout(() => {
    document.querySelector('.message').remove();
  }, secondsToRemove);
}
async deleteBook(book){
  await booksService.deleteBooks(book);
 return this.renderBooks();
 }
}

export default UI;