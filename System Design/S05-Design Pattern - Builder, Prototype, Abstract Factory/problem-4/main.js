const Book = require('./Book');

function main() {
    const originalBook = new Book("1984", "George Orwell", ["Excellent", "Thought-provoking"]);
    const clonedBook = originalBook.clone();
    
    console.log("Before modification:");
    console.log("Original:", originalBook.toString());
    console.log("Cloned:", clonedBook.toString());
    
    clonedBook.reviews.push("Life-changing");
    
    console.log("\nAfter adding review to cloned book:");
    console.log("Original:", originalBook.toString());
    console.log("Cloned:", clonedBook.toString());
}

main();