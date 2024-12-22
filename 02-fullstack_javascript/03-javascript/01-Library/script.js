
// Declare my library and ensure counter starts at one.
const myLibrary = []
let nextId = 1;

function Book(id, title, author, page_numbers, read_or_not) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.page_numbers = page_numbers;
    this.read_or_not = read_or_not;

    this.info = function() {
        return `${title} by ${author}, ${page_numbers} pages, ${read_or_not}`
    }
}

function addBookToLibrary(title, author, page_numbers, read_or_not) {
    // The current value of nextId is 1 and this is used before incrementing
    // Think of it as Book() === nextId => nextId++ === 2 => Book() === nextID(now 2)
    const newBook = new Book(nextId++, title, author, page_numbers, read_or_not);
    myLibrary.push(newBook);
}







