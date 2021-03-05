class BooksService{
  //url;
    constructor(){
        this.url = "http://localhost:4000/api/booksController";
    }
    async  getBooks(){
        const result =  await  fetch(this.url);
        return await result.json();
        }
    
      async  postBooks(book){
        const result = await   fetch(this.url,{
                method:'POST',
                body: book
               
            });
            const data = await result.json();
            return  data;
        }
       async deleteBooks(bookId){
           const result = await fetch(this.url+'/'+bookId,{
                headers:{
                    'Content-Type':'application/json'
                },
                method: 'DELETE'
            });
            return await result.json();
        }
}

export default BooksService;