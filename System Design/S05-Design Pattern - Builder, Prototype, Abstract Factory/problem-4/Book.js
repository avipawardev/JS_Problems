class Book {
    constructor(title, author, reviews) {
        this.title = title;
        this.author = author;
        this.reviews = reviews;
    }

    clone() {
        return new Book(this.title, this.author, [...this.reviews]);
    }

    toString() {
        return `${this.title} by ${this.author} - Reviews: [${this.reviews.join(', ')}]`;
    }
}

module.exports = Book;