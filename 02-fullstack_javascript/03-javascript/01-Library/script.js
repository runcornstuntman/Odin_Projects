
const myLibrary = []

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

function addBookToLibrary() {
    // Do things here
}

/*
All of your book objects are going to be stored in an array, so add a function to the script (not the constructor) that can take some arguments, 
create a book from those arguments, and store the new book object into an array. Your code should look something like above.

Write a function that loops through the array and displays each book on the page. You can display them in some sort of table, or each on 
their own “card”. It might help for now to manually add a few books to your array so you can see the display.



const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 'not yet read')



theHobbit.info(); // "The Hobbit by J.R.R. Tolkien, 295 pages, not read yet"
// If not changed to return, and left at console.log() in function will not return correctly
console.log(theHobbit.info());


*/







