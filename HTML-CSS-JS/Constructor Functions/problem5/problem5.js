function Book(title,author){
return {
    title,
    author,
    details:function(){
            console.log(`Book: ${this.title} and Author is : ${this.author}`)
    }
}
}

function createLibrary(){
    let arr = [];
return {
    addBook:function(book){
        arr.push(book)
    },
    removeBook:function(byTitle){
        let item = arr.indexOf(byTitle);
        arr.splice(item,1);
        console.log(arr)
    },
    listBooks:function(){
        console.log(arr);
    }
}
};

const library = createLibrary();

const book1 = Book("To Kill a Mockingbird", "Harper Lee");
const book2 = Book("1984", "George Orwell");

library.addBook(book1);
library.addBook(book2);

library.listBooks();
// Output:
// Title: To Kill a Mockingbird, Author: Harper Lee
// Title: 1984, Author: George Orwell

library.removeBook("1984");
library.listBooks();
// Output:
// Title: To Kill a Mockingbird, Author: Harper Lee

